const mongoose = require('mongoose');

const hikeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Hike must have a title']
  },
  location: {
    type: String,
    required: [true, 'Hike must have a location']
  },
  distance: {
    type: Number,
  },
  date: {
    type: Date,
    required: [true, 'Hike must have a date']
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Hike', hikeSchema);