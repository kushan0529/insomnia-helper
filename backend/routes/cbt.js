const express = require('express');
const router = express.Router();
const { getCBTProgress, updateCBTProgress } = require('../controllers/cbtController');
const auth = require('../middleware/auth');

router.get('/', auth, getCBTProgress);
router.put('/', auth, updateCBTProgress);

module.exports = router;
