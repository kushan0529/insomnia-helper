const TriggerLog = require('../models/TriggerLog');

exports.getTriggerLogs = async (req, res) => {
  try {
    const logs = await TriggerLog.find({ user: req.user._id }).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTriggerLog = async (req, res) => {
  try {
    const { date, caffeine, screenTime, stressLevel, exercise, alcohol, naps } = req.body;
    const log = new TriggerLog({
      user: req.user._id,
      date,
      caffeine,
      screenTime,
      stressLevel,
      exercise,
      alcohol,
      naps
    });
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
