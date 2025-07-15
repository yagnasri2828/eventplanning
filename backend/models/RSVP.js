const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Yes', 'No', 'Maybe'] }
});

module.exports = mongoose.model('RSVP', rsvpSchema);
