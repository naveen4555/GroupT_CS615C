const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const authRoutes = require('./routes/auth');
const storiesRoutes = require('./routes/stories');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Increased timeout
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority'
};

// Connect to MongoDB with better error handling
console.log('Attempting to connect to MongoDB...');
console.log('Connection URI:', process.env.MONGODB_URI.replace(/\/\/[^@]+@/, '//****:****@')); // Hide credentials in logs

mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    console.log('Database Name:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    console.log('User:', mongoose.connection.user);
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    console.error('Error Stack:', err.stack);
    console.error('Connection URI (hidden credentials):', process.env.MONGODB_URI.replace(/\/\/[^@]+@/, '//****:****@'));
    console.error('Please check:');
    console.error('1. Your internet connection');
    console.error('2. MongoDB Atlas cluster status');
    console.error('3. IP whitelist settings in MongoDB Atlas');
    console.error('4. Username and password in the connection string');
    process.exit(1);
  });

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the StoryCollab API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});