const express = require('express');
const path = require('path');
const fs = require('fs');
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
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.razorpay.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      connectSrc: ["'self'", "https://api.groq.com", "wss://insomnia-helper.onrender.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));
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
const distPath = path.resolve(__dirname, '../frontend/dist');
const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER || fs.existsSync(distPath);

if (isProduction) {
  // Serve static files
  app.use(express.static(distPath));

  // Favicon fallback to prevent 404 errors in browser console
  app.get('/favicon.ico', (req, res) => {
    const faviconPath = path.join(distPath, 'favicon.svg');
    if (fs.existsSync(faviconPath)) {
      res.sendFile(faviconPath);
    } else {
      res.status(204).end();
    }
  });

  // 404 handler for API routes (prevent falling through to index.html)
  app.all('/api/*any', (req, res) => {
    res.status(404).json({ message: `API route ${req.originalUrl} not found` });
  });

  // Handle SPA routing - send all other requests to index.html
  app.get('/*any', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Frontend build not found. Please run build script.');
    }
  });
  console.log('Serving production build from:', distPath);
} else {
  app.get('/', (req, res) => {
    res.send('API is running in development mode...');
  });
}

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
