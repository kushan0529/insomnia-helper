const express = require('express');
const router = express.Router();
const { getRooms, getRoom, joinRoom } = require('../controllers/roomController');
const auth = require('../middleware/auth');
const nightMode = require('../middleware/nightMode');

router.get('/', getRooms);
router.get('/:id', getRoom);
router.post('/:id/join', auth, nightMode, joinRoom);

module.exports = router;
