const Room = require('../models/Room');

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('posts').populate('members', 'username');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    if (!room.members.includes(req.user._id)) {
      room.members.push(req.user._id);
      await room.save();
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.leaveRoom = async (req, res) => {
  console.log('Leaving room:', req.params.id);
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.members = room.members.filter(m => m.toString() !== req.user._id.toString());
    await room.save();
    
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
