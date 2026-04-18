const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isAnonymous: { type: Boolean, default: false },
  title: { type: String, required: true },
  content: { type: String, required: true },
  mood: {
    type: String,
    enum: ['Hopeless', 'Surviving', 'Angry', 'Numb', 'Fighting Back']
  },
  tags: [String],
  isTriggerWarning: { type: Boolean, default: false },
  beenThereCount: { type: Number, default: 0 },
  replies: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isAnonymous: { type: Boolean, default: false },
    content: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storySchema);
