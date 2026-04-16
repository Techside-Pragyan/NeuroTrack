const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const MoodLog = require('../models/MoodLog');

// @desc    Add a mood log
// @route   POST /api/moods
// @access  Private
router.post('/', protect, async (req, res) => {
  const { mood, intensity, note, activities } = req.body;

  try {
    const moodLog = await MoodLog.create({
      userId: req.user.id,
      mood,
      intensity,
      note,
      activities,
    });

    res.status(201).json(moodLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get user mood history
// @route   GET /api/moods
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const moods = await MoodLog.find({ userId: req.user.id }).sort('-createdAt');
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
