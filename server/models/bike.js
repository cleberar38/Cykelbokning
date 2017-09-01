const mongoose = require('mongoose');
//const config = require('../../config');

//const uri = config.dbUri;

// define the Bike model schema
const BikeSchema = new mongoose.Schema({
  bikeid: String,
  biketype: String,
  name: String,
  imgurl: String,
  amountavailable: { type: Number, min: 0, max: 20 }
});

BikeSchema.pre('save', function saveHook(next) {
  next();
});

//const conn = mongoose.createConnection(uri);

module.exports = mongoose.model('Bike', BikeSchema);
