const RSVP = require('../models/RSVP');

exports.addRSVP = async (req, res) => {
  const { eventId } = req.params;
  const { status } = req.body;

  const existing = await RSVP.findOne({ event: eventId, user: req.user.id });
  if (existing) {
    existing.status = status;
    await existing.save();
    return res.json(existing);
  }

  const rsvp = await RSVP.create({ event: eventId, user: req.user.id, status });
  res.status(201).json(rsvp);
};

exports.getRSVPs = async (req, res) => {
  const rsvps = await RSVP.find({ event: req.params.eventId }).populate('user', 'name');
  res.json(rsvps);
};
