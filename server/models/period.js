const mongoose = require('mongoose');

// define the Bike model schema
const PeriodSchema = new mongoose.Schema({
  periodid: {type: String, unique: true},
  periodname: String,
  datefrom: Date,
  dateto: Date,
  daysleft: { type: Number, default: 0 },
  periodisdone: { type: Boolean, default: false }
});

PeriodSchema.pre('save', function saveHook(next) {
  next();
});

module.exports = mongoose.model('Period', PeriodSchema);
