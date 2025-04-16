const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['view', 'edit', 'create', 'delete'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  }
});

module.exports = mongoose.model('Log', LogSchema); 