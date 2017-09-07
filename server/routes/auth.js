const express = require('express');
const validator = require('validator');
const passport = require('passport');
const router = new express.Router();
const Bike = require('mongoose').model('Bike');
const BikeBooking = require('mongoose').model('BikeBooking');
const Period = require('mongoose').model('Period');
const User = require('mongoose').model('User');
const crypto = require('crypto');
const Token = require('mongoose').model('Token');
const config = require('../../config');


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
 * checkIfUserHasBookedSpecificBike
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function checkIfUserHasBookedSpecificBike(req, res, newBooking, bookingBikeData) {
  BikeBooking.find({
    bikeid: bookingBikeData.bikeid,
    userid: req.body.userid
  }, (err, resUserRebook) => {
    if(err){
      console.log("ERROR: ", err);
        return err;
    }
    if(resUserRebook.length !== 0){
      console.log("Sorry you cannot book this model twice!");

      return res.status(200).json({
        success: true,
        message: 'Sorry you cannot book this model twice!'
      });
    }else {
      Bike.find({
        periodid: bookingBikeData.periodid,
        bikeid: bookingBikeData.bikeid,
      }, (err, resBikeBooking) => {
        if(err){
          console.log("ERROR : ", err);
            return err;
        }
        if(resBikeBooking.length !== 0){
          /*###*/
          /*console.log("Sorry this period & cykel is already booked");*/
          /*###*/
          Bike.find({
            bikeid: resBikeBooking.bikeid,
          },(err, resBike) => {
            if(err){
              console.log("ERROR : ", err);
                return err;
            }
            //Check if still have bike available in BIKE DB
            if(resBike.amountavailable < 1){
              const msg = 'Sorry this Bike are not Available';
              showMessages200(res, msg);
            }else{
              createNewBooking(newBooking);
              const msg = 'You have successfully add your booking.';
              showMessages200(res, msg);
            }
          });
          const msg = 'Sorry this period & cykel is already booked';
          //showMessages200(res, msg);
        }else{
          createNewBooking(newBooking);
          const msg = 'You have successfully add your booking.';
          showMessages200(res, msg);
        }
      });
    }
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
    if(err){
      console.log("ERROR : ", err);
        return err;
    }
    if(resBikeBooking.length !== 0){
      /*###*/
      /*console.log("Sorry this period & cykel is already booked");*/
      /*###*/
      Bike.find({
        bikeid: resBikeBooking.bikeid,
      },(err, resBike) => {
        if(err){
          console.log("ERROR : ", err);
            return err;
        }
        //Check if still have bike available in BIKE DB
        if(resBike.amountavailable < 1){
          const msg = 'Sorry this Bike are not Available';
          showMessages200(res, msg);
        }else{
          createNewBooking(newBooking);
          const msg = 'You have successfully add your booking.';
          showMessages200(res, msg);
        }
      });
      const msg = 'Sorry this period & cykel is already booked';
      //showMessages200(res, msg);
    }else{
      createNewBooking(newBooking);
      const msg = 'You have successfully add your booking.';
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
    if(err){
      console.log("ERROR from New Booking: ", err);
      return err;
    }
    console.log("NY CYKEL BOOKING ÄR KLART!", done);
    return done;
  });
};

/**
 * removeBooking
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function removeBooking(bookingID) {

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
    dateto: req.dateto  //Date
  };

  const newPeriod = new Period(periodData);

  newPeriod.save((err, done) => {
    if(err){
      console.log("ERROR from New Booking: ", err);
      return err;
    }
    console.log("NY PERIOD ÄR KLART!", done);
    return done;
  });
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
 * showErrors
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function showErrors() {

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
 * calculateOneYearAfterToday
 *
 * @param {object}  -
 * @returns {object} -
 *
 */
function calculateOneYearAfterToday() {


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
    errors.email = 'Please provide a correct email address.';
  }
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }
  if (!isFormValid) {
    message = 'Check the form for errors.';
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
    errors.periodname = 'Please period name';
  }
  if (!payload || typeof payload.datefrom !== 'string' || payload.datefrom.trim().length < 10) {
    isFormValid = false;
    errors.datefrom = 'Date must have 10 characters! yyyy-mm-dd or yyyy/mm/dd';
  }
  if (!payload || typeof payload.dateto !== 'string' || payload.dateto.trim().length < 10) {
    isFormValid = false;
    errors.dateto = 'Date must have 10 characters! yyyy-mm-dd or yyyy/mm/dd';
  }
  if (!isFormValid) {
    message = 'Check the form for errors.';
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
    errors.email = 'Please provide your email address.';
  }
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }
  if (!isFormValid) {
    message = 'Check the form for errors.';
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
    errors.userid = 'User is not Authenticated!';
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
    message = 'Form har errors.';
  }
  return {
    success: isFormValid,
    message,
    errors
  };
};

function validateBikeForm(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please bike name';
  }
  if (!payload || typeof payload.biketype !== 'string' || payload.biketype.trim().length === 0) {
    isFormValid = false;
    errors.biketype = 'Please enter bike type';
  }
  if (!payload || typeof payload.imgurl !== 'string' || payload.imgurl.trim().length === 0) {
    isFormValid = false;
    errors.imgurl = 'Image URL start with http:// or https://';
  }
  if (!payload || typeof payload.amountavailable !== 'number' || payload.amountavailable <= 0 || payload.amountavailable > 20) {
    isFormValid = false;
    errors.amountavailable = 'Enter the amount of bike';
  }
  if (!isFormValid) {
    message = 'Check the form for errors.';
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
    name: req.name,
    imgurl: req.imgurl,
    amountavailable: req.amountavailable
  };

  const newBike = new Bike(bikeData);

  newBike.save((err, done) => {
    if(err){
      console.log("ERROR from Add new Bike: ", err);
      return err;
    }
    console.log("NY BIKE ÄR KLART!", done);
    return done;
  });

};

router.post('/confirmation/:token/:userid', (req, res, next) => {
  res.send('POST request to the homepage')
});

router.post('/resend/:token/:userid', (req, res, next) => {
  res.send('POST request to the homepage')
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
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    let msg = {};

    User.findOne({ 'email': ''+req.body.email+'' }, 'email userid', function (err, user) {
      if (err) return err;

      // Create a verification token for this user
      let token = new Token({ _userId: user.userid, token: crypto.randomBytes(16).toString('hex') });

      token.save(function (err) {
        if (err) return err;
        // saved!
      })

      const sgMail = require('@sendgrid/mail');

      sgMail.setApiKey(config.SENDGRID_APIKEY);

      msg.to = ''+req.body.email+'';
      msg.from = 'none@reply.com';
      msg.subject = 'Account verification - Confirm';
      msg.text = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/token=' + token.token + '/userid=' + user.userid + '.\n';
      msg.html = '<strong>Hello,<br /><br />Please verify your account by clicking the link: <br />http:\/\/' + req.headers.host + '\/confirmation\/token=' + token.token + '/userid=' + user.userid + '.<br /></strong>';

      sgMail.send(msg);


    })
    
    return res.status(200).json({
      success: true,
      message: 'A verification has been sent to your email: '+req.body.email+'.'
    });

  })(req, res, next);

});


router.post('/resend', (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check for validation errors    
  var errors = req.validationErrors();
  if (errors) return res.status(400).send(errors);

  User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
      if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

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
          subject: 'Account verification and confirmation!',
          text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n',
          html: '<strong>Hello, <br /><br />Please verify your account by clicking the link:<br /> <a href="http://'+req.headers.host+'"/confirmation/'+token.token+'>Click here ro verify!</a></strong>',
        };
        //console.log("sgMail : ", sgMail);
        console.log("MSG SENDGRID : ", msg);
        sgMail.send(msg, (error, result) => {
          console.log("sgMail callback error", error);
          console.log("sgMail callback result", result);

          if (error) { return res.status(500).send({ msg: error.message }); }
          res.status(200).send('A verification email has been sent to ' + user.email + '.');
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
  console.log("DONE :" , done );
  return res.status(200).json({
    success: true,
    message: 'You have successfully added new period.',
    done: done
  });
});

router.post('/addbike', (req, res, next) => {
  const validationResult = validateBikeForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  const done = addNewBike(req.body);
  console.log("DONE :" , done );
  return res.status(200).json({
    success: true,
    message: 'You have successfully added new bike.',
    done: done
  });
});

router.post('/checkbookedperiod', (req, res, next) => {

  var checkPeriod = null;

  BikeBooking.find((err, done) => {
    if(err){
      console.log("ERROR did not find period: ", err);
      return err;
    }
    console.log("All period founded!", done);
    checkPeriod = done;
    return res.status(200).json({
      success: true,
      message: 'All periods from Booking.',
      done: done
    });
  });
});

router.post('/checkperiod', (req, res, next) => {

  var checkPeriod = null;

  Period.find((err, done) => {
    if(err){
      console.log("ERROR did not find period: ", err);
      return err;
    }
    console.log("All period founded!", done);
    checkPeriod = done;
    return res.status(200).json({
      success: true,
      message: 'You retrive all periods.',
      done: done
    });
  });
});

router.post('/checkbike', (req, res, next) => {

  var checkBike = null;

  BikeBooking.find((err, done) => {
    if(err){
      console.log("ERROR did not find bikes: ", err);
      return err;
    }
    console.log("All bikes founded!", done);
    checkBike = done;
    return res.status(200).json({
      success: true,
      message: 'You retrive all bikes.',
      done: done
    });
  });
});


router.post('/period', (req, res, next) => {
  const bookingBikeData = {
    bikeid: req.body.bikeid
  };
  var arrPeriods =  [];

  Bike.find({
    bikeid: bookingBikeData.bikeid
  }, (err, resBookingPeriod) => {
    if(err){
      console.log("ERROR: ", err);
        return err;
    }
    if(resBookingPeriod.length !== 0){
      arrPeriods.push(resBookingPeriod);
      return res.status(200).json({
        success: true,
        message: 'Sorry you cannot book this model twice!',
        periods: arrPeriods
      });
    }
  });

  return res.status(200).json({
    success: true,
    message: 'Sorry you cannot book this model twice!',
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

  const newBooking = new BikeBooking(bookingBikeData);



  checkIfUserHasBookedSpecificBike(req, res, newBooking, bookingBikeData);
  //checkIfBikeIsAvailable(req, res, newBooking, bookingBikeData);

});

router.post('/login', (req, res, next) => {
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
        message: 'Could not process the form.'
      });
    }
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});

module.exports = router;
