const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  isNightOwlRoom: { type: Boolean, default: false },
  emoji: { type: String },
  color: { type: String },
  tags: [{ type: String }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);
