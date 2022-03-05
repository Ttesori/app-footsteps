const asyncHandler = require('express-async-handler');
const Hike = require('../models/hikeModel');
const User = require('../models/userModel');

/*
GET hikes
*/
const getHikes = asyncHandler(async (req, res) => {
  const hikes = await Hike.find({ user: req.user.id });

  res.json(hikes);
});

/*
POST hike
*/
const createHike = asyncHandler(async (req, res) => {
  const { title, location, distance, date, notes } = req.body;
  if (!title || !location || !date) {
    res.status(400);
    throw new Error('Title, location, and date required');
  }
  const hike = await Hike.create({
    title, location, distance, date, notes,
    user: req.user.id
  });
  console.log(hike);
  if (hike._id) {
    res.status(201).json(hike);
  } else {
    res.status(400).json(hike.error);
  }

});

/*
PUT hike
*/
const updateHike = asyncHandler(async (req, res) => {
  const hike = await Hike.findById(req.params.id);
  const user = await User.findById(req.user.id);

  // Check that user exists
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check that hike belongs to user
  if (hike.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // update Hike
  const updatedHike = await Hike.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedHike);
});

/*
DELETE hike
*/
const deleteHike = asyncHandler(async (req, res) => {
  const hike = await Hike.findById(req.params.id);
  const user = await User.findById(req.user.id);

  // Hike not found
  if (!hike) {
    res.status(400);
    throw new Error('Hike not found');
  }

  // Check that user exists
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check that hike belongs to user
  if (hike.user.toString() !== user.id) {
    res.status(403);
    throw new Error('User not authorized');
  }

  // Remove hike
  await hike.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getHikes, createHike, updateHike, deleteHike };