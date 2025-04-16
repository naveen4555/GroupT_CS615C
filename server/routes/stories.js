const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const Log = require('../models/Log');
const auth = require('../middleware/auth');

// Utility: Create a log entry
const logAction = async (userId, storyId, actionType, extraDetails = {}) => {
  await Log.create({
    story: storyId,
    user: userId,
    action: actionType,
    details: { storyId, ...extraDetails }
  });
};

// GET all stories
router.get('/', auth, async (req, res) => {
  try {
    const stories = await Story.find().populate('author', 'name');
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a single story by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('author', 'name');
    if (!story) return res.status(404).json({ message: 'Story not found' });

    await logAction(req.user.id, story._id, 'view');
    res.json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create a new story
router.post('/', auth, async (req, res) => {
  try {
    const { title, mainText, tags, snapshots } = req.body;
    const story = new Story({ title, mainText, tags, snapshots, author: req.user.id });
    await story.save();

    await logAction(req.user.id, story._id, 'create');
    res.json(story);
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT start editing a story
router.put('/:id/start-editing', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found' });

    if (story.isBeingEdited && story.lastEditedBy.toString() !== req.user.id) {
      return res.status(400).json({ message: 'Story is being edited by another user' });
    }

    story.isBeingEdited = true;
    story.lastEditedBy = req.user.id;
    await story.save();

    await logAction(req.user.id, story._id, 'edit', { action: 'start_editing' });
    res.json({ success: true });
  } catch (error) {
    console.error('Error starting edit:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT stop editing a story
router.put('/:id/stop-editing', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found' });

    if (story.lastEditedBy.toString() !== req.user.id) {
      return res.status(400).json({ message: 'You are not the current editor' });
    }

    story.isBeingEdited = false;
    story.lastEditedBy = null;
    await story.save();

    await logAction(req.user.id, story._id, 'edit', { action: 'stop_editing' });
    res.json({ success: true });
  } catch (error) {
    console.error('Error stopping edit:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a story
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, mainText, tags, snapshots } = req.body;
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found' });

    if (story.lastEditedBy.toString() !== req.user.id) {
      return res.status(400).json({ message: 'You are not the current editor' });
    }

    Object.assign(story, { title, mainText, tags, snapshots });
    await story.save();

    await logAction(req.user.id, story._id, 'edit', { action: 'update' });
    res.json(story);
  } catch (error) {
    console.error('Error updating story:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET logs for a story
router.get('/:id/logs', auth, async (req, res) => {
  try {
    const logs = await Log.find({ story: req.params.id })
      .populate('user', 'name email')
      .sort({ timestamp: -1 });

    res.json(logs);
  } catch (error) {
    console.error('Error fetching story logs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
