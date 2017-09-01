const express = require('express');
const validator = require('validator');
const passport = require('passport');
const router = new express.Router();
const Bike = require('mongoose').model('Bike');
const BikeBooking = require('mongoose').model('BikeBooking');
const Period = require('mongoose').model('Period');
const User = require('mongoose').model('User');

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
function checkIfUserHasBookedSpecificBike(req, res, bookingBikeData) {
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
      showMessages200(res, msg);
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
  db.bios.find()
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
  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username.';
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
  if (!payload || typeof payload.user !== 'string' || payload.user.trim().length === 0) {
    isFormValid = false;
    errors.user = 'User is not Authenticated!';
  }
  if (!payload || typeof payload.period !== 'string' || payload.period.trim().length === 0) {
    isFormValid = false;
    errors.period = 'Välja Period';
  }
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Välja Cykel';
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
    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });
  })(req, res, next);
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
    bikeid: req.body.bikeid,
    userid: req.body.userid,
    periodid: req.body.periodid
  };

  const newBooking = new BikeBooking(bookingBikeData);

  checkIfUserHasBookedSpecificBike(req, res, bookingBikeData);
  checkIfBikeIsAvailable(req, res, newBooking, bookingBikeData);

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
