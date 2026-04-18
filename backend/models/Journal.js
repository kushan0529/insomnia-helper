const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  content: { type: String, required: true }, // Encrypted with crypto-js
  mood: { type: Number, min: 1, max: 6 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Journal', journalSchema);
