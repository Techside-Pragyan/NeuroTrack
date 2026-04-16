const mongoose = require('mongoose');

const MoodLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'stressed', 'calm', 'neutral'],
    required: true,
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  note: {
    type: String,
    maxlength: 500,
  },
  activities: {
    sleep: Number, // hours
    water: Number, // glasses
    activity: String, // e.g. 'gym', 'reading'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MoodLog', MoodLogSchema);
