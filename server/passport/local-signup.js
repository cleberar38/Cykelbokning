const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');
const crypto = require('crypto');
const Token = require('mongoose').model('Token');

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
    userid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
    address: req.body.address.trim(),
    city:  req.body.city.trim(),
    phone:  req.body.phone.trim(),
    usertype: req.body.usertype !== undefined ? req.body.usertype : '',
    removed: req.body.removed !== undefined ? req.body.removed : false,
    isVerified: req.body.isVerified ? req.body.isVerified : false,
    passwordResetToken: req.body.passwordResetToken !== undefined ? req.body.passwordResetToken : '',
    passwordResetExpires: req.body.passwordResetExpires !== undefined ? req.body.passwordResetExpires : ''
  };

  const newUser = new User(userData);

  newUser.save((err, result) => {
    if (err) { return done(err); }

    return done(null);
  });
});
