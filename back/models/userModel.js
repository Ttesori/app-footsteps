const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name']
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'User must have a password']
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);