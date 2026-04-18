const express = require('express');
const router = express.Router();
const { getChatHistory } = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.get('/:userId', auth, getChatHistory);

module.exports = router;
