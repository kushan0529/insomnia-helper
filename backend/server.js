const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

// Attach socket.io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.io logic
require('./socket/chat')(io);

// Night Owl Room Cron Job (Broadcast at 10PM)
cron.schedule('0 22 * * *', () => {
  io.emit('nightRoomOpen', { message: 'The night shift is now open. Welcome to the underground.' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/sleep', require('./routes/sleep'));
app.use('/api/triggers', require('./routes/triggers'));
app.use('/api/stories', require('./routes/stories'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/journal', require('./routes/journal'));
app.use('/api/cbt', require('./routes/cbt'));
app.use('/api/payment', require('./routes/payment'));
// Serve frontend in production
// Serve frontend in production
if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
  const distPath = path.resolve(__dirname, '../frontend/dist');

  // Serve static files
  app.use(express.static(distPath));

  // 404 handler for API routes (prevent falling through to index.html)
  app.all('/api/*splat', (req, res) => {
    res.status(404).json({ message: `API route ${req.originalUrl} not found` });
  });

  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  console.log('Serving production build from:', distPath);
} else {
  app.get('/', (req, res) => {
    res.send('API is running in development mode...');
  });
}

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
