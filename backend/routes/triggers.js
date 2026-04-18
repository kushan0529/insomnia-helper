const express = require('express');
const router = express.Router();
const { getTriggerLogs, createTriggerLog } = require('../controllers/triggerController');
const auth = require('../middleware/auth');

router.get('/', auth, getTriggerLogs);
router.post('/', auth, createTriggerLog);

module.exports = router;
