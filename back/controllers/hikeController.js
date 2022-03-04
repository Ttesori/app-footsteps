const asyncHandler = require('express-async-handler');

const getHikes = asyncHandler(async (req, res) => {
  res.json({
    message: 'Some hikes'
  })
});

const createHike = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Text field required');
  }
  res.json({
    message: `Created hike ${req.body.text}`
  })
});

const updateHike = asyncHandler(async (req, res) => {
  res.json({
    message: `Update hike ${req.params.id}`
  })
});

const deleteHike = asyncHandler(async (req, res) => {
  res.json({
    message: `Delete hike ${req.params.id}`
  })
});

module.exports = { getHikes, createHike, updateHike, deleteHike }