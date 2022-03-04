const express = require('express');
const router = express.Router();
const { getHikes, createHike, updateHike, deleteHike } = require('../controllers/hikeController');

router.get('/', getHikes);
router.post('/', createHike);
router.put('/:id', updateHike);
router.delete('/:id', deleteHike);

module.exports = router;