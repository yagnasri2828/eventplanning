const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const event = await Event.create({ ...req.body, creator: req.user.id });
  res.status(201).json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find().populate('creator', 'name');
  res.json(events);
};

exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate('creator', 'name');
  res.json(event);
};

exports.updateEvent = async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
};
