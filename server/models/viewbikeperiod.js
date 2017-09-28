const mongoose = require('mongoose');

// define the Bike model schema
const BikePeriodSchema = new mongoose.Schema({
  periodid: {type: String, unique: true},
  periodname: String,
  datefrom: Date,
  dateto: Date,
  bikename: String,
  bikeid: String,
  isbooked: { type: Boolean, default: false }
});

BikePeriodSchema.pre('save', function saveHook(next) {
  next();
});

module.exports = mongoose.model('BikePeriodView', BikePeriodSchema);
