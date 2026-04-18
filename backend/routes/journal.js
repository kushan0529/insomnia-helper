const express = require('express');
const router = express.Router();
const { getJournals, createJournal, deleteJournal, updateJournal } = require('../controllers/journalController');
const auth = require('../middleware/auth');

router.get('/', auth, getJournals);
router.post('/', auth, createJournal);
router.put('/:id', auth, updateJournal);
router.delete('/:id', auth, deleteJournal);

module.exports = router;
