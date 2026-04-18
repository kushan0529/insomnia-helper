const express = require('express');
const router = express.Router();
const { getStories, getStory, createStory, reactToStory, replyToStory, deleteStory, updateStory } = require('../controllers/storyController');
const auth = require('../middleware/auth');

router.get('/', getStories);
router.get('/:id', getStory);
router.post('/', auth, createStory);
router.put('/:id', auth, updateStory);
router.post('/:id/react', auth, reactToStory);
router.post('/:id/reply', auth, replyToStory);
router.delete('/:id', auth, deleteStory);

module.exports = router;
