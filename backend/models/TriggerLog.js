const mongoose = require('mongoose');

const triggerLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  caffeine: { type: Boolean, default: false },
  screenTime: { type: Number }, // hours
  stressLevel: { type: Number, min: 1, max: 10 },
  exercise: { type: Boolean, default: false },
  alcohol: { type: Boolean, default: false },
  naps: { type: Boolean, default: false }
});

module.exports = mongoose.model('TriggerLog', triggerLogSchema);
