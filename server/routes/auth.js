const express = require('express');
const validator = require('validator');
const passport = require('passport');
const router = new express.Router();
const crypto = require('crypto');
const config = require('../../config');

const Bike = require('mongoose').model('Bike');
const BikeBooking = require('mongoose').model('BikeBooking');
const Period = require('mongoose').model('Period');
const User = require('mongoose').model('User');
const Token = require('mongoose').model('Token');
const BikePeriodView = require('mongoose').model('BikePeriodView');

router.post('/profile', (req, res, next) => {

    //This function with callback is used to get the response from the server
    //outside of the instance of BikeBooking model
    function retrieveBooking(email, callback) {


        BikeBooking.find({ userid: email }, (err, resUserRebook) => {
            if (err) {
                callback(err, null);
            } else {

                //console.log("BikeBooking getting resUserRebook : ", resUserRebook);

                Bike.find({
                    bikeid: resUserRebook.bikeid,
                }, (err, resBike) => {
                    if (err) {
                        console.log("ERROR : ", err);
                        return err;
                    }
                    //console.log("PROFILE getting BIKE NAME : ", resBike);
                    //console.log("PROFILE getting BIKE TYPE : ", resBike)
                });

                callback(null, resUserRebook);
            }

        });
    };

    //Call the function above to get the response from the server
    //In this case it verify if the user is verified
    retrieveBooking(req.body.userid, function (err, resUserRebook) {
        if (err) {
            console.log(err);
        }

        //console.log("CALLBACK BikeBooking & retrieveBooking : ", resUserRebook);

        return res.status(200).json({
            success: true,
            result: resUserRebook
            //message: 'Sorry you have not book any bike!'
        });

    });
});

router.post('/adminprofile', (req, res, next) => {

    //This function with callback is used to get the response from the server
    //outside of the instance of BikeBooking model
    function retrieveBooking(email, callback) {
        let allBookning = [];

        BikeBooking.find((err, resUserRebook) => {
            if (err) {
                callback(err, null);
            } else {

                //console.log("BikeBooking getting resUserRebook : ", resUserRebook);

                User.find((err, resUser) => {
                    if (err) {
                        console.log("ERROR : ", err);
                        return err;
                    }
                    //console.log("resUser[i]", resUser);

                    //console.log("resUserRebook[i]", resUserRebook);
                    callback(null, { booking: resUserRebook, user: resUser });

                });


            }

        });
    };

    //Call the function above to get the response from the server
    //In this case it verify if the user is verified
    retrieveBooking({}, function (err, resUserRebook) {
        if (err) {
            console.log(err);
        }

        //console.log("CALLBACK BikeBooking & retrieveBooking : ", resUserRebook);

        return res.status(200).json({
            success: true,
            result: resUserRebook
            //message: 'Sorry you have not book any bike!'
        });

    });
});

router.post('/confirmation', (req, res, next) => {

    verifyUserConfirmation(req, res, next);

});

router.post('/signup', (req, res, next) => {

    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('local-signup', (err) => {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                return res.status(409).json({
                    success: false,
                    message: 'Kontrollera formuläret för fel.',
                    errors: {
                        email: 'Den här e-mailadressen är redan tagen.'
                    }
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Kunde inte bearbeta formuläret.'
            });
        }

        let msg = {};
        let tempToken = {};

        User.findOne({ 'email': req.body.email }, 'email userid', function (err, user) {
            if (err) return err;

            // Create a verification token for this user
            let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

            token.save((err) => {
                // if(err) throw new Error(err); //This line was used to just GET the right Error info!
                if (err) return new Error(err);
            })

            const sgMail = require('@sendgrid/mail');

            sgMail.setApiKey(config.SENDGRID_APIKEY);

            msg.to = req.body.email;
            msg.from = 'none@reply.com';
            msg.subject = 'Cykelbiblioteket i Helsingborg';
            //The line above was used just to demostrate that we can send the token and userId within the URL link
            // msg.text = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/?token=' + token.token + '/userid=' + user.userid + '.\n';
            msg.text = 'Hej,\n\n' + 'Vad roligt att du vill använda stadens cykelbibliotek – här kommer en bekräftelse på att ditt konto har registrerats.  \n\n Klicka på länken för att bekräfta registreringen: \n\nhttp:\/\/' + config.emailHost + '\/#\/confirmation\/?token=' + token.token + '\n\nNär du har bokat en cykel kan du se din bookning och avboka under ”Mina bokningar”.\nHar du frågor? Kontakta[Mattias Alfredsson] på stadsbyggnadsförvaltningen i Helsingborg.\nMed vänlig hälsning,\nCykelbiblioteket i Helsingborg';
            msg.html = '<strong>Hej,<br /><br />Vad roligt att du vill använda stadens cykelbibliotek – här kommer en bekräftelse på att ditt konto har registrerats. <br /><br /> Klicka på länken för att bekräfta registreringen:  <br /><br /> <a href="http:\/\/' + config.emailHost + '\/#\/confirmation\/?token=' + token.token + '">http:\/\/' + config.emailHost + '\/#\/confirmation\/?token=' + token.token + '</a><br /><br />När du har bokat en cykel kan du se din bookning och avboka under ”Mina bokningar”.<br /> Har du frågor? Kontakta[Mattias Alfredsson] på stadsbyggnadsförvaltningen i Helsingborg.<br /> Med vänlig hälsning,<br /> Cykelbiblioteket i Helsingborg</strong>';

            //console.log("TOKEN : ", token);

            tempToken = token;

            //Uncomment this line to send EMAIL to the user
            sgMail.send(msg);

            return res.status(200).json({
                success: true,
                message: 'Ditt konto är registrerat ett bekräftelsemejl har skickats till din epost : ' + req.body.email + '',
                email: req.body.email,
                token: tempToken.token
            });

        })

    })(req, res, next);

});

router.post('/resend', (req, res, next) => {

    req.assert('email', 'E-post är inte giltig').isEmail();
    req.assert('email', 'E-post kan inte vara tomt').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    // Check for validation errors
    var errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);

    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'Vi kunde inte hitta en användare med det mailet.' });
        if (user.isVerified) return res.status(400).send({ msg: 'Detta konto har redan verifierats. Vänligen logga in.' });

        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            // using SendGrid's v3 Node.js Library
            // https://github.com/sendgrid/sendgrid-nodejs
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(config.SENDGRID_APIKEY);
            const msg = {
                to: 'cleber.arruda@helsingborg.se',
                from: 'c_leverdo@hotmail.com',
                subject: 'Kontoverifiering och bekräftelse!',
                text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n',
                html: '<strong>Hello, <br /><br />Please verify your account by clicking the link:<br /> <a href="http://' + req.headers.host + '"/confirmation/' + token.token + '>Click here ro verify!</a></strong>',
            };
            //console.log("sgMail : ", sgMail);
            //console.log("MSG SENDGRID : ", msg);
            sgMail.send(msg, (error, result) => {
                //console.log("sgMail callback error", error);
                //console.log("sgMail callback result", result);

                if (error) { return res.status(500).send({ msg: error.message }); }
                res.status(200).send('Ett bekräftelsemejl har skickats till ' + user.email + '.');
            });
        });

    });

});

router.post('/addperiod', (req, res, next) => {

    const validationResult = validatePeriodForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    const done = createNewPeriod(req.body);

    //console.log("DONE :", done);

    return res.status(200).json({
        success: true,
        message: 'Du har lagt till en ny period.',
        done: done
    });

});

router.post('/addbike', (req, res, next) => {

    const validationResult = validateAddBikeForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    const done = addNewBike(req.body);

    //console.log("DONE :", done);

    return res.status(200).json({
        success: true,
        message: 'Du har lagt till en ny cykel.',
        done: done
    });

});

router.post('/checkbookedperiod', (req, res, next) => {

    var checkPeriod = null;

    BikeBooking.find((err, done) => {
        if (err) {
            console.log("ERROR did not find period: ", err);
            return err;
        }
        //console.log("All period founded!", done);
        checkPeriod = done;
        return res.status(200).json({
            success: true,
            message: 'Alla period från bokning.',
            done: done
        });
    });

});

router.post('/checkperiod', (req, res, next) => {

    var checkPeriod = null;
    var disabledPeriod = null;

    Period.find((err, period) => {
        if (err) {
            console.log("ERROR did not find period: ", err);
            return err;
        }
        //console.log("All period founded!", done);
        checkPeriod = period;

        BikeBooking.find({
            bikeid: req.body.bikeid
        }, (err, bikebookning) => {
            if (err) {
                console.log("ERROR did not find period: ", err);
                return err;
            }


            Bike.find({ bikename: req.body.bikeid }, (err, bikesAmount) => {

                if (err) {
                    console.log("ERROR: ", err);
                    return err;
                }

                return res.status(200).json({
                    success: true,
                    message: 'Alla period.',
                    period: period,
                    bikeAmount: bikesAmount,
                    bikebookning: bikebookning
                });

            });

            

        });


    });

});

router.post('/getbikes', (req, res, next) => {

    var checkPeriod = null;

    Bike.find((err, done) => {
        if (err) {
            console.log("ERROR did not find period: ", err);
            return err;
        }
        //console.log("All BIKES founded!", done);
        checkPeriod = done;
        return res.status(200).json({
            success: true,
            message: 'Alla Bikes.',
            done: done
        });
    });

});

router.post('/checkbike', (req, res, next) => {

    BikeBooking.find((err, done) => {

        if (err) {
            console.log("ERROR did not find bikes: ", err);
            return err;
        }

        //console.log("Alla cykel founded!", done);


        return res.status(200).json({
            success: true,
            message: 'Du hämtar alla cyklar.',
            done: done
        });

    });

});

router.post('/period', (req, res, next) => {

    const bookingBikeData = {
        bikeid: req.body.bikeid
    };
    var arrPeriods = [];

    Bike.find({
        bikeid: bookingBikeData.bikeid
    }, (err, resBookingPeriod) => {
        if (err) {
            console.log("ERROR: ", err);
            return err;
        }
        if (resBookingPeriod.length !== 0) {
            arrPeriods.push(resBookingPeriod);
            return res.status(200).json({
                success: true,
                message: 'Tyvärr kan du inte boka den här modellen!',
                periods: arrPeriods
            });
        }
    });

    return res.status(200).json({
        success: true,
        message: 'Tyvärr kan du inte boka den här modellen!',
        periods: arrPeriods
    });

});

router.post('/bikebooking', (req, res, next) => {

    const getPlatsResults = getAllPlats(req.body);
    if (!getPlatsResults.success) {
        return res.status(400).json({
            success: false,
            message: getPlatsResults.message,
            errors: getPlatsResults.errors
        });
    }

    const bookingBikeData = {
        bikebookingid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), //{type: String, unique: true},,
        bikeid: req.body.bikeid,
        userid: req.body.userid,
        periodid: req.body.periodid,
        bookeddate: new Date(),
        nextbookingdate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    };

    //console.log("bookingBikeData: ", bookingBikeData);

    const newBooking = new BikeBooking(bookingBikeData);

    checkIfUserHasBookedSpecificBike(req, res, newBooking, bookingBikeData);
    //checkIfBikeIsAvailable(req, res, newBooking, bookingBikeData);

});

router.post('/unbookbike', (req, res, next) => {

    const unbookingBikeData = {
        bikebookingid: req.body.bikebookingid, //{type: String, unique: true},,
    };

    BikeBooking.find(unbookingBikeData).remove().exec();

    return res.status(200).json({
        success: true,
        messages: "Cykeln har avbokats"
    });

});

router.post('/login', (req, res, next) => {

    var isUserVerified = false;

    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    return passport.authenticate('local-login', (err, token, userData) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Kunde inte bearbeta formuläret.'
            });
        }

        //This function with callback is used to get the response from the server
        //outside of the instance of User model
        function retrieveUser(uname, callback) {
            // If we found a token, find a matching user
            User.findOne({ email: uname }, function (err, user) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, user);
                }

            });

        };

        //Call the function above to get the response from the server
        //In this case it verify if the user is verified
        retrieveUser(req.body.email, function (err, user) {
            if (err) {
                console.log(err);
            }

            //console.log("CALLBACK  user.isVerified : ", user.isVerified);

            if (user.isVerified) {
                return res.json({
                    success: true,
                    message: 'Du har loggat in!',
                    token,
                    userdata: userData,
                    isVerified: user.isVerified
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Kontrollera ditt bekräftelse i din email'
                });
            }

        });

    })(req, res, next);

});

/**
 * checkIfUserHasBookedSpecificBike
 *
 * @param {object}  -
 * @returns {object} -
 *
 */ 
function checkIfUserHasBookedSpecificBike(req, res, newBooking, bookingBikeData) {

   BikeBooking.find({
        bikeid: bookingBikeData.bikeid,
        periodid: bookingBikeData.periodid
    }, (err, amountBikeInBooking) => {
         
    
        Bike.find({ bikename: bookingBikeData.bikeid }, (err, bikeAmount) => {

            if (err) { console.log("ERROR : ", err); return err; }

            Period.find((err, availablePeriod) => {

                if (amountBikeInBooking.length === bikeAmount[0].amount * availablePeriod.length) {

                    const msg = 'Denna period och cykel är redan bokad';
                    showMessages200(res, msg);

                } else {


                    BikeBooking.find({
                        bikeid: bookingBikeData.bikeid,
                        userid: req.body.userid
                    }, (err, resUserRebook) => {
                        if (err) {
                            console.log("ERROR: ", err);
                            return err;
                        }

                        if (resUserRebook.length !== 0) {

                            return res.status(200).json({
                                success: true,
                                message: 'Tyvärr kan du inte boka den här modellen'
                            });
                        } else {


                            createNewBooking(newBooking);
                            const msg = 'Tack för din bokning';
                            showMessages200(res, msg);


                        }
                    });

                }

            });

            
        });
    });

};

/**
 * checkIfBikeIsAvailable
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function checkIfBikeIsAvailable(req, res, newBooking, bookingBikeData) {

    Bike.find({
        periodid: bookingBikeData.periodid,
        bikeid: bookingBikeData.bikeid,
    }, (err, resBikeBooking) => {
        if (err) {
            console.log("ERROR : ", err);
            return err;
        }
        if (resBikeBooking.length !== 0) {

            Bike.find({
                bikeid: resBikeBooking.bikeid,
            }, (err, resBike) => {
                if (err) {
                    console.log("ERROR : ", err);
                    return err;
                }
                //Check if still have bike available in BIKE DB
                if (resBike.amountavailable < 1) {
                    const msg = 'Tyvärr, denna cykel är inte tillgänglig';
                    showMessages200(res, msg);
                } else {
                    createNewBooking(newBooking);
                    const msg = 'Tack för din bokning';
                    showMessages200(res, msg);
                }
            });
            const msg = 'Denna period och cykel är redan bokad.';
            //showMessages200(res, msg);
        } else {
            createNewBooking(newBooking);
            const msg = 'Tack för din bokning';
            showMessages200(res, msg);
        }
    });

};

/**
 * createNewBooking
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function createNewBooking(newBooking) {

    //This save the new bikebooking to the DB
    newBooking.save((err, done) => {
        if (err) {
            //console.log("ERROR from New Booking: ", err);
            return err;
        }
        //console.log("NY CYKEL BOOKING ÄR KLART!", done);
        return done;
    });

};

/**
 * createNewPeriod
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function createNewPeriod(req) {

    const periodData = {
        periodid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), //{type: String, unique: true},
        periodname: req.periodname, //String,
        datefrom: req.datefrom, //Date,
        dateto: req.dateto,  //Date
        bikedescurl: req.bikedescurl,
        bikeimgurl: req.bikeimgurl,
        bikename: req.bikename,
        bikeid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), //{type: String, unique: true},,
        isbooked: false //{ type: Boolean, default: false }
    };

    const newPeriod = new Period(periodData);

    newPeriod.save((err, done) => {
        if (err) {
            console.log("ERROR from New Booking: ", err);
            return err;
        }
        //console.log("NY PERIOD ÄR KLART!", done);
        return done;
    });

};

/**
 * showMessages200
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function showMessages200(res, msg) {

    return res.status(200).json({
        success: true,
        message: msg
    });

};

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {

    const errors = {};
    let isFormValid = true;
    let message = '';
    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Ange en korrekt e-postadress.';
    }
    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Lösenordet måste ha minst 8 tecken.';
    }
    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Vänligen ange ditt namn.';
    }
    if (!isFormValid) {
        message = 'Kontrollera formuläret för fel.';
    }
    return {
        success: isFormValid,
        message,
        errors
    };

};

/**
 * validatePeriodForm
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validatePeriodForm(payload) {

    const errors = {};
    let isFormValid = true;
    let message = '';
    if (!payload || typeof payload.periodname !== 'string' || payload.periodname.trim().length === 0) {
        isFormValid = false;
        errors.periodname = 'Periodens namn saknas!';
    }
    if (!payload || typeof payload.datefrom !== 'string' || payload.datefrom.trim().length < 10) {
        isFormValid = false;
        errors.datefrom = 'Datumet måste ha 10 tecken! åååå-mm-dd eller åååå / mm / dd';
    }
    if (!payload || typeof payload.dateto !== 'string' || payload.dateto.trim().length < 10) {
        isFormValid = false;
        errors.dateto = 'Datumet måste ha 10 tecken! åååå-mm-dd eller åååå / mm / dd';
    }
    if (!payload || typeof payload.bikedescurl !== 'string' || payload.bikedescurl.trim().length === 0) {
        isFormValid = false;
        errors.bikedescurl = 'URL existerar inte!';
    }
    if (!payload || typeof payload.bikeimgurl !== 'string' || payload.bikeimgurl.trim().length === 0) {
        isFormValid = false;
        errors.bikeimgurl = 'URL existerar inte!';
    }
    if (!payload || typeof payload.bikeimgurl !== 'string' || payload.bikeimgurl.trim().length === 0) {
        isFormValid = false;
        errors.bikeimgurl = 'URL existerar inte!';
    }
    if (!payload || typeof payload.bikename !== 'string' || payload.bikename.trim().length === 0) {
        isFormValid = false;
        errors.bikename = 'Cykels namn saknas';
    }
    if (!isFormValid) {
        message = 'Kontrollera formuläret för fel.';
    }
    return {
        success: isFormValid,
        message,
        errors
    };

};

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {

    const errors = {};
    let isFormValid = true;
    let message = '';
    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Vänligen ange din e-postadress.';
    }
    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Vänligen ange ditt lösenord.';
    }
    if (!isFormValid) {
        message = 'Kontrollera formuläret för fel.';
    }
    return {
        success: isFormValid,
        message,
        errors
    };

};

function getAllPlats(payload) {

    const errors = {};
    let isFormValid = true;
    let message = '';
    if (!payload || typeof payload.userid !== 'string' || payload.userid.trim().length === 0) {
        isFormValid = false;
        errors.userid = 'Användaren är inte autentiserad!';
    }
    if (!payload || typeof payload.periodid !== 'string' || payload.periodid.trim().length === 0) {
        isFormValid = false;
        errors.periodid = 'Välja Period';
    }
    if (!payload || typeof payload.bikeid !== 'string' || payload.bikeid.trim().length === 0) {
        isFormValid = false;
        errors.bikeid = 'Välja Cykel';
    }
    if (!isFormValid) {
        message = 'Form har fel.';
    }
    return {
        success: isFormValid,
        message,
        errors
    };

};

function validateAddBikeForm(payload) {

    const errors = {};
    let isFormValid = true;
    let message = '';
    if (!payload || typeof payload.bikename !== 'string' || payload.bikename.trim().length === 0) {
        isFormValid = false;
        errors.bikename = 'Vänligen ange cykelnamn';
    }
    if (!payload || typeof payload.biketype !== 'string' || payload.biketype.trim().length === 0) {
        isFormValid = false;
        errors.biketype = 'Vänligen ange cykeltyp';
    }
    if (!payload || typeof payload.imgurl !== 'string' || payload.imgurl.trim().length === 0) {
        isFormValid = false;
        errors.imgurl = 'Bildadressen börjar med http:// or https://';
    }
    if (!payload || typeof payload.amount !== 'string' || payload.amount.trim().length === 0) {
        isFormValid = false;
        errors.imgurl = 'Vänligen ange mängden cyklar';
    }
    if (!isFormValid) {
        message = 'Kontrollera formuläret för fel.';
    }
    return {
        success: isFormValid,
        message,
        errors
    };

};

function addNewBike(req) {

    const bikeData = {
        bikeid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), //{type: String, unique: true},,
        biketype: req.biketype,
        bikename: req.bikename,
        imgurl: req.imgurl,
        amount: req.amount
    };

    const newBike = new Bike(bikeData);

    newBike.save((err, done) => {
        if (err) {
            console.log("ERROR from Add new Bike: ", err);
            return err;
        }
        //console.log("NY BIKE ÄR KLART!", done);
        return done;
    });
};

function verifyUserConfirmation(req, res, next) {

    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).json({ type: 'not-verified', message: 'Vi kunde inte hitta ett giltigt token. Din token min har gått ut.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).json({ message: 'Vi kunde inte hitta en användare för denna token.' });
            if (user.isVerified) return res.status(400).json({ type: 'already-verified', message: 'Den här användaren har redan verifierats.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).json({ message: err.message }); }
                res.status(200).json({
                    success: true,
                    message: 'Kontot har verifierats!',
                    token,
                    user: user
                    //". You have successfully logged in The account has been verified. Please log in."
                });
            });
        });
    });

};

/**
 * calculateTotalAmountPeriodsAvailable
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function calculateTotalAmountPeriodsAvailable() {

};

/**
 * checkIfPeriodIsAvailable
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function checkIfPeriodIsAvailable() {

};

/**
 * removePeriod
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function removePeriod() {

};

/**
 * removeUserPartially
 * update User Table but do not remove the user
 * @param {object}  -
 * @returns {object} -
 *
 */
function removeUserPartially() {

};

/**
 * removeUserCompletly
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function removeUserCompletly() {

};

/**
 * updateBikeAmount
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function updateBikeAmount() {

};

/**
 * createNewBike
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function createNewBike() {

};

/**
 * removeBike
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function removeBike() {

};

/**
 * calculateOneYearAfterToday
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function calculateOneYearAfterToday() {


};

/**
 * showErrors
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function showErrors() {

};

module.exports = router;