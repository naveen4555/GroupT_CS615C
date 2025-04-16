const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const Log = require('../models/Log');
const auth = require('../middleware/auth');

// Get all stories
router.get('/', auth, async (req, res) => {
  try {
    const stories = await Story.find().populate('author', 'name');
    res.json(stories);
  } catch (err) {
    console.error('Error fetching stories:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single story
router.get('/:id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('author', 'name');
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    
    // Create a log entry for viewing this specific story
    await Log.create({
      story: story._id,
      user: req.user.id,
      action: 'view',
      details: { storyId: story._id }
    });
    
    res.json(story);
  } catch (err) {
    console.error('Error fetching story:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new story
router.post('/', auth, async (req, res) => {
  try {
    const { title, mainText, tags, snapshots } = req.body;
    const story = new Story({
      title,
      mainText,
      tags,
      snapshots,
      author: req.user.id
    });
    await story.save();
    await Log.create({
      story: story._id,
      user: req.user.id,
      action: 'create',
      details: { storyId: story._id }
    });
    res.json(story);
  } catch (err) {
    console.error('Error creating story:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start editing a story
router.put('/:id/start-editing', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    if (story.isBeingEdited && story.lastEditedBy.toString() !== req.user.id) {
      return res.status(400).json({ message: 'Story is being edited by another user' });
    }
    story.isBeingEdited = true;
    story.lastEditedBy = req.user.id;
    await story.save();
    await Log.create({
      story: story._id,
      user: req.user.id,
      action: 'edit',
      details: { action: 'start_editing', storyId: story._id }
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Error starting edit:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Stop editing a story
router.put('/:id/stop-editing', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    if (story.lastEditedBy.toString() !== req.user.id) {
      return res.status(400).json({ message: 'You are not the current editor' });
    }
    story.isBeingEdited = false;
    story.lastEditedBy = null;
    await story.save();
    await Log.create({
      story: story._id,
      user: req.user.id,
      action: 'edit',
      details: { action: 'stop_editing', storyId: story._id }
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Error stopping edit:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a story
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, mainText, tags, snapshots } = req.body;
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    if (story.lastEditedBy.toString() !== req.user.id) {
      return res.status(400).json({ message: 'You are not the current editor' });
    }
    story.title = title;
    story.mainText = mainText;
    story.tags = tags;
    story.snapshots = snapshots;
    await story.save();
    await Log.create({
      story: story._id,
      user: req.user.id,
      action: 'edit',
      details: { action: 'update', storyId: story._id }
    });
    res.json(story);
  } catch (err) {
    console.error('Error updating story:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get story logs (protected)
router.get('/:id/logs', auth, async (req, res) => {
  try {
    const logs = await Log.find({ story: req.params.id })
      .populate('user', 'name email')
      .sort({ timestamp: -1 });
    
    res.json(logs);
  } catch (err) {
    console.error('Error fetching story logs:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;