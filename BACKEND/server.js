const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// =========================
// Middleware
// =========================
const { logger } = require('./middleware/loggerMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');

// Parse JSON bodies
app.use(express.json());
// Enable CORS
app.use(cors());
// Log requests
app.use(logger);

// =========================
// Health check
// =========================
app.get('/health', (req, res) => {
  res.json({ status: 'ok', ts: Date.now() });
});

// =========================
// Routes
// =========================
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');
const forumRoutes = require('./routes/forum');
const emergencyRoutes = require('./routes/emergency');
const hotspotRoutes = require('./routes/hotspots');
const analyticsRoutes = require('./routes/analytics');
const moderationRoutes = require('./routes/moderation');

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/hotspots', hotspotRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/moderation', moderationRoutes);

// =========================
// Temporary Chatbot Route (inline)
// =========================
app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  if (message && message.toLowerCase().includes('kenya')) {
    return res.json({ reply: 'Dial 1195 — GBV Hotline Kenya' });
  }
  res.json({ reply: 'Please tell me your country so I can share resources.' });
});

// =========================
// Socket.io for real-time alerts + chatbot
// =========================
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Example: broadcast new reports
  socket.on('new-report', (data) => {
    io.emit('alert', data);
  });

  // Chatbot integration (real-time)
  socket.on('chatbot-message', (msg) => {
    if (msg.toLowerCase().includes('kenya')) {
      socket.emit('chatbot-reply', 'Dial 1195 — GBV Hotline Kenya');
    } else {
      socket.emit('chatbot-reply', 'Please tell me your country so I can share resources.');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// =========================
// Error handler (last middleware)
// =========================
app.use(errorHandler);

// =========================
// Start server
// =========================
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`SafeSpace backend running on port ${PORT}`);
});