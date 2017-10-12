const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };

    // find a user by email address
    return User.findOne({ email: userData.email }, (err, user) => {
        //if (!user) return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

        if (err) { return done(err); }

        if (!user) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';

            return done(error);
        }

        // check if a hashed user's password is equal to a value saved in the database
        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
            if (err) { return done(err); }

            if (!isMatch) {
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            }

            // Make sure the user has been verified
            //if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' });

            const payload = {
                sub: user._id
            };

            // create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const tokenA = jwt.sign(payload, config.tokenA);

            //console.log("Config Access", config.access);
            //console.log("usertype ", user.usertype);

            const data = {
                userid: user.email,
                name: user.name,
                usertype: user.usertype !== config.access ? "user" : "admin",
                tokenA: tokenA
            };

            // Login successful, write token, and send back user
            //res.send({ token: generateToken(user), user: user.toJSON() });

            return done(null, token, data);
        });
    });
});