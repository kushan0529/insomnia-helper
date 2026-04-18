const mongoose = require('mongoose');

const sleepLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bedtime: { type: Date, required: true },
  wakeTime: { type: Date, required: true },
  sleepDuration: { type: Number }, // in hours
  quality: { type: Number, min: 1, max: 5 },
  mood: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SleepLog', sleepLogSchema);
