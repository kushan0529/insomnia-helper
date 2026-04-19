const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('./models/Room');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const rooms = await Room.find({}, '_id name');
    console.log('Available Rooms:', rooms);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
