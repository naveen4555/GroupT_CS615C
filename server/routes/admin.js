const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const ActivityLog = require('../models/ActivityLog');
const User = require('../models/User');
const Story = require('../models/Story');
const jwt = require('jsonwebtoken');

// Admin Registration
router.post('/register', async (req, res) => {
  console.log('Received registration request:', {
    ...req.body,
    password: '[HIDDEN]'
  });

  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }]
    });

    if (existingAdmin) {
      console.log('Admin already exists with email or username');
      return res.status(400).json({
        message: 'Admin with this email or username already exists'
      });
    }

    // Create new admin
    const admin = new Admin({
      username,
      email,
      password
    });

    await admin.save();
    console.log('New admin created successfully');

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Admin registered successfully',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Error in admin registration:', error);
    res.status(500).json({
      message: 'Error registering admin',
      error: error.message
    });
  }
});
// Middleware to verify admin token
const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(401).json({
        message: 'Invalid token'
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('Error verifying admin token:', error);
    res.status(401).json({
      message: 'Invalid token',
      error: error.message
    });
  }
};
// Admin Login
router.post('/login', async (req, res) => {
  console.log('Received login request for email:', req.body.email);
  
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('No admin found with email:', email);
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      console.log('Invalid password for admin:', email);
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Admin logged in successfully:', email);
    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Error in admin login:', error);
    res.status(500).json({
      message: 'Error logging in',
      error: error.message
    });
  }
});

// Protected Routes
router.get('/check-auth', verifyAdminToken, (req, res) => {
  res.json({
    isAuthenticated: true,
    admin: {
      id: req.admin._id,
      username: req.admin.username,
      email: req.admin.email
    }
  });
});

router.get('/stats', verifyAdminToken, async (req, res) => {
  try {
    const [totalUsers, totalStories, totalEdits] = await Promise.all([
      User.countDocuments(),
      Story.countDocuments(),
      ActivityLog.countDocuments({ action: 'EDIT' })
    ]);

    res.json({
      totalUsers,
      totalStories,
      totalEdits
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      message: 'Error fetching stats',
      error: error.message
    });
  }
});

router.get('/users', verifyAdminToken, async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'stories',
          localField: '_id',
          foreignField: 'author',
          as: 'stories'
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          storiesCount: { $size: '$stories' }
        }
      }
    ]);

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message
    });
  }
});

router.get('/activities', verifyAdminToken, async (req, res) => {
  try {
    const activities = await ActivityLog.find()
      .populate('userId', 'name')
      .populate('storyId', 'title')
      .sort({ timestamp: -1 })
      .limit(10);

    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({
      message: 'Error fetching activities',
      error: error.message
    });
  }
});

router.delete('/users/:userId', verifyAdminToken, async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    await Story.deleteMany({ author: userId });
    await ActivityLog.deleteMany({ userId });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message
    });
  }
});

module.exports = router; 
