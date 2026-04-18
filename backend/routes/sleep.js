const express = require('express');
const router = express.Router();
const { getSleepLogs, createSleepLog, deleteSleepLog, getSleepStats } = require('../controllers/sleepController');
const auth = require('../middleware/auth');

router.get('/', auth, getSleepLogs);
router.get('/stats', auth, getSleepStats);
router.post('/', auth, createSleepLog);
router.delete('/:id', auth, deleteSleepLog);

module.exports = router;
