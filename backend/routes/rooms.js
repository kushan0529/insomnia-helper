const express = require('express');
const router = express.Router();
const { getRooms, getRoom, joinRoom, leaveRoom } = require('../controllers/roomController');
const auth = require('../middleware/auth');
const nightMode = require('../middleware/nightMode');

router.get('/', getRooms);
router.get('/:id', getRoom);
router.post('/:id/join', auth, nightMode, joinRoom);
router.post('/:id/leave', auth, leaveRoom);

module.exports = router;
