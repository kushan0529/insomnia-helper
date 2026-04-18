const mongoose = require('mongoose');

const cbtProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weekNumber: { type: Number, default: 1 },
  currentTask: { type: String },
  completedSteps: [String],
  sleepRestrictionWindow: { type: String },
  startDate: { type: Date, default: Date.now },
  progressNotes: { type: String }
});

module.exports = mongoose.model('CBTProgress', cbtProgressSchema);
