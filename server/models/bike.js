const mongoose = require('mongoose');

// define the Bike model schema
const BikeSchema = new mongoose.Schema({
  bikeid: String,
  biketype: String,
  bikeName: String,
  imgurl: String
});

BikeSchema.pre('save', function saveHook(next) {
  next();
});

module.exports = mongoose.model('Bike', BikeSchema);
