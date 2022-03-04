const mongoose = require('mongoose');

const hikeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Hike must have a title']
  },
}, { timestamps: true })

module.exports = mongoose.model('Hike', hikeSchema);