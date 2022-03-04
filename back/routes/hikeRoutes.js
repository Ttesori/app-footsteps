const express = require('express');
const router = express.Router();
const { getHikes, createHike, updateHike, deleteHike } = require('../controllers/hikeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getHikes);
router.post('/', protect, createHike);
router.put('/:id', protect, updateHike);
router.delete('/:id', protect, deleteHike);

module.exports = router;