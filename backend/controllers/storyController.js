const Story = require('../models/Story');

exports.getStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const stories = await Story.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('author', 'username replies.author');
    if (!story) return res.status(404).json({ message: 'Story not found' });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStory = async (req, res) => {
  try {
    const { title, content, mood, tags, isTriggerWarning, isAnonymous } = req.body;
    const story = new Story({
      author: req.user._id,
      title,
      content,
      mood,
      tags,
      isTriggerWarning,
      isAnonymous
    });
    await story.save();
    await story.populate('author', 'username');
    
    // Real-time broadcast
    req.io.emit('newStory', story);
    
    res.status(201).json(story);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.reactToStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { $inc: { beenThereCount: 1 } },
      { new: true }
    );
    
    // Real-time update
    req.io.emit('reactionUpdate', story);
    
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.replyToStory = async (req, res) => {
  try {
    const { content, isAnonymous } = req.body;
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found' });

    story.replies.push({
      author: req.user._id,
      content,
      isAnonymous
    });
    await story.save();
    
    // Real-time update
    req.io.emit('reactionUpdate', story);
    
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const story = await Story.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!story) return res.status(404).json({ message: 'Story not found or unauthorized' });
    res.json({ message: 'Story deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const { title, content, mood, tags, isTriggerWarning, isAnonymous } = req.body;
    const story = await Story.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      { title, content, mood, tags, isTriggerWarning, isAnonymous },
      { new: true }
    );
    if (!story) return res.status(404).json({ message: 'Story not found or unauthorized' });
    res.json(story);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
