const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  mainText: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  snapshots: [{
    text: {
      type: String,
      required: true
    },
    links: [{
      url: {
        type: String,
        required: true
      },
      description: String
    }],
    pictures: [{
      url: {
        type: String,
        required: true
      },
      caption: String
    }],
    order: {
      type: Number,
      required: true
    }
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isBeingEdited: {
    type: Boolean,
    default: false
  },
  lastEditedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Story', StorySchema);