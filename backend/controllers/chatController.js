const Message = require('../models/Message');

exports.getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).sort({ sentAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
