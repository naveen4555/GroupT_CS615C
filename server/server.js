// ─── Module Imports ────────────────────────────────────────────────
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

// ─── Route Imports ─────────────────────────────────────────────────
const authRoutes = require('./routes/auth');
const storiesRoutes = require('./routes/stories');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

// ─── Load Env Variables ────────────────────────────────────────────
dotenv.config();

// ─── Configure Cloudinary ──────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ─── Initialize Express App ────────────────────────────────────────
const app = express();

// ─── Middleware ────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── MongoDB Connection Setup ──────────────────────────────────────
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority'
};

console.log('\n🔗 Attempting MongoDB connection...');
console.log('URI:', process.env.MONGODB_URI.replace(/\/\/[^@]+@/, '//****:****@')); // Hide credentials

mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('✅ MongoDB Connected');
    console.log(`🗄️  Database: ${mongoose.connection.name}`);
    console.log(`📍 Host: ${mongoose.connection.host}`);
    console.log(`🔒 User: ${mongoose.connection.user}`);
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    console.error('📜 Stack:', err.stack);
    console.error('🔐 URI (masked):', process.env.MONGODB_URI.replace(/\/\/[^@]+@/, '//****:****@'));
    console.error('📌 Check your internet, MongoDB cluster, IP whitelist, and credentials');
    process.exit(1);
  });

// ─── Routes ────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the StoryCollab API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// ─── Error Handler ─────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ─── Start Server ──────────────────────────────────────────────────
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
