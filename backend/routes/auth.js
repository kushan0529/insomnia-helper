const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/me', auth, getMe);

module.exports = router;
