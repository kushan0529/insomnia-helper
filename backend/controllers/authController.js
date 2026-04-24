const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password, city, sleepIssueCategory, isDepressed, isAnonymous } = req.body;
    const user = new User({ username, email, password, city, sleepIssueCategory, isDepressed, isAnonymous });
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration Error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: `User with this ${Object.keys(error.keyValue)[0]} already exists.` 
      });
    }
    res.status(400).json({ message: error.message, error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user, token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  res.json(req.user);
};
