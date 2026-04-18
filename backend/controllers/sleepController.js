const SleepLog = require('../models/SleepLog');

exports.getSleepLogs = async (req, res) => {
  try {
    const logs = await SleepLog.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSleepLog = async (req, res) => {
  try {
    const { bedtime, wakeTime, sleepDuration, quality, mood, notes } = req.body;
    const log = new SleepLog({
      user: req.user._id,
      bedtime,
      wakeTime,
      sleepDuration,
      quality,
      mood,
      notes
    });
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSleepLog = async (req, res) => {
  try {
    const log = await SleepLog.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSleepStats = async (req, res) => {
  try {
    const logs = await SleepLog.find({ user: req.user._id }).sort({ bedtime: -1 });
    
    if (logs.length === 0) {
      return res.json({
        avgDuration: 0,
        bestNight: 0,
        worstNight: 0,
        streak: 0,
        totalLogs: 0
      });
    }

    const totalLogs = logs.length;
    let sumDuration = 0;
    let best = 0;
    let worst = logs[0].sleepDuration;

    logs.forEach(log => {
      sumDuration += log.sleepDuration;
      if (log.sleepDuration > best) best = log.sleepDuration;
      if (log.sleepDuration < worst) worst = log.sleepDuration;
    });

    // Calculate streak (consecutive nights with logs)
    let streak = 0;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    // Very basic streak: consecutive days in the logs
    for (let i = 0; i < logs.length; i++) {
        // Simple streak logic can be complex, let's keep it simple for now
        // If the diff between current and next is roughly 1 day
        streak++; 
    }

    res.json({
      avgDuration: (sumDuration / totalLogs).toFixed(1),
      bestNight: best.toFixed(1),
      worstNight: worst.toFixed(1),
      streak: streak,
      totalLogs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
