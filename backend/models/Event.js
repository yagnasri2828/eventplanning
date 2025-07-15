const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    trim: true
  },
  maxCapacity: {
    type: Number
  },
  imageUrl: {
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringType: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'none'],
    default: 'none'
  },
  recurringDay: {
    type: String, // e.g., 'Wednesday'
    default: ''
  },
  recurringDate: {
    type: Number, // e.g., 25
    default: null
  },
  // ✅ Reminder flags
  dayBeforeReminderSent: {
    type: Boolean,
    default: false
  },
  oneHourBeforeReminderSent: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
}
);

module.exports = mongoose.model('Event', EventSchema);
