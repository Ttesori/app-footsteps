const asyncHandler = require('express-async-handler');
const Hike = require('../models/hikeModel');

// GET hikes
const getHikes = asyncHandler(async (req, res) => {
  const hikes = await Hike.find();

  res.json(hikes);
});

// POST hike
const createHike = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Title required');
  }
  const hike = await Hike.create({
    title: req.body.title
  });

  res.status(200).json(hike)
});

// PUT hike
const updateHike = asyncHandler(async (req, res) => {
  const hike = await Hike.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!hike) {
    res.status(400);
    throw new Error('Hike not found');
  }

  res.status(200).json(hike)
});

// DELETE hike
const deleteHike = asyncHandler(async (req, res) => {
  const hike = await Hike.findById(req.params.id);

  if (!hike) {
    res.status(400);
    throw new Error('Hike not found');
  }
  await hike.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getHikes, createHike, updateHike, deleteHike }