const express = require('express');
const router = express.Router();
const { depressionCheck, storyAnalysis, sleepCoach } = require('../controllers/aiController');
const auth = require('../middleware/auth');

router.post('/depression-check', depressionCheck);
router.post('/story-analysis', auth, storyAnalysis);
router.post('/sleep-coach', auth, sleepCoach);

module.exports = router;
