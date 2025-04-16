const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['VIEW', 'EDIT', 'CREATE', 'DELETE']
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  details: {
    type: String
  }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema); 