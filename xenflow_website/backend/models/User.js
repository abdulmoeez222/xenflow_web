const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['admin', 'customer'], required: true },
  admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema); 