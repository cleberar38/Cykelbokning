const mongoose = require('mongoose');

// define the Bike model schema
const PeriodSchema = new mongoose.Schema({
  periodid: {type: String, unique: true},
  periodname: String,
  datefrom: Date,
  dateto: Date
});

PeriodSchema.pre('save', function saveHook(next) {
  next();
});

//const conn = mongoose.createConnection(uri);

module.exports = mongoose.model('Period', PeriodSchema);
