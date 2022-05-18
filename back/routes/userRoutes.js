const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUser, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createUser);
router.put('/update', updateUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);

module.exports = router;