const mongoose = require('mongoose');

// define the Bike model schema
const BikeSchema = new mongoose.Schema({
    bikeid: String,
    biketype: String,
    bikename: String,
    imgurl: String,
    amount: Number
    // user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // period: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Period' }]
});

BikeSchema.pre('save', function saveHook(next) {
    next();
});

module.exports = mongoose.model('Bike', BikeSchema);