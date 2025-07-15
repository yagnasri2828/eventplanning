const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://eventplanningdashboard.netlify.app/', // replace with your real Netlify domain
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ API Routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');
const resetRoutes = require('./routes/resetRoutes');
const userRoutes = require('./routes/userRoutes');
const queryRoutes = require('./routes/queryRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/auth', resetRoutes); // ✅ Good, because routes are merged
app.use('/api/user', userRoutes);
app.use('/api/queries', queryRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('<h2 style="font-family: sans-serif; color: #4F46E5">🎉 Event Planning Dashboard Backend is Running</h2>');
});

// ✅ Start Reminder Job
require('./utils/sendReminder');

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
