const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('mongoose').model('User');

// define the User model schema
const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

tokenSchema.pre('save', function saveHook(next) {
  next();
});

module.exports = mongoose.model('Token', tokenSchema);
