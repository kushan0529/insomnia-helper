const CBTProgress = require('../models/CBTProgress');

exports.getCBTProgress = async (req, res) => {
  try {
    let progress = await CBTProgress.findOne({ user: req.user._id });
    if (!progress) {
      progress = new CBTProgress({ user: req.user._id });
      await progress.save();
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCBTProgress = async (req, res) => {
  try {
    const { weekNumber, currentTask, completedSteps, sleepRestrictionWindow, progressNotes } = req.body;
    const progress = await CBTProgress.findOneAndUpdate(
      { user: req.user._id },
      { weekNumber, currentTask, completedSteps, sleepRestrictionWindow, progressNotes },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
