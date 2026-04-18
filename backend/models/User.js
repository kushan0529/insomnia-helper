const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAnonymous: { type: Boolean, default: false },
  city: { type: String },
  sleepIssueCategory: {
    type: String,
    enum: ['Chronic Insomnia', 'Anxiety Sleep', 'Shift Worker', 'Post-Trauma', 'General']
  },
  isDepressed: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'listener', 'admin'], default: 'user' },
  isPremium: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
