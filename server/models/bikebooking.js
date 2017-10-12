const mongoose = require('mongoose');

// define the Bike model schema
const BikeBookingSchema = new mongoose.Schema({
    bikebookingid: String,
    userid: String,
    bikeid: String,
    periodid: String,
    bookeddate: Date,
    nextbookingdate: Date,
    admincomment: String
    // user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // bike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bike' }],
    // period: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Period' }],
});

BikeBookingSchema.pre('save', function saveHook(next) {
    next();
});

module.exports = mongoose.model('BikeBooking', BikeBookingSchema);