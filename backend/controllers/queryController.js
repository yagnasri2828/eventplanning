const EventQuery = require('../models/EventQuery');
const Event = require('../models/Event');

exports.askQuery = async (req, res) => {
  const { eventId } = req.params;
  const { question } = req.body;

  try {
    const newQuery = await EventQuery.create({
      eventId,
      askedBy: req.user.id,
      question
    });
    await newQuery.populate('askedBy', 'name');
    res.status(201).json(newQuery);
  } catch (err) {
    res.status(500).json({ message: 'Failed to ask query', error: err.message });
  }
};

exports.answerQuery = async (req, res) => {
  const { queryId } = req.params;
  const { answer } = req.body;

  try {
    const query = await EventQuery.findById(queryId).populate('eventId');
    if (!query) return res.status(404).json({ message: 'Query not found' });

    const event = query.eventId;

    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only event creator can answer' });
    }

    query.answer = answer;
    query.answeredBy = req.user.id;
    await query.save();
    await query.populate('answeredBy', 'name');

    res.json(query);
  } catch (err) {
    res.status(500).json({ message: 'Failed to answer query', error: err.message });
  }
};

exports.getEventQueries = async (req, res) => {
  const { eventId } = req.params;

  try {
    const queries = await EventQuery.find({ eventId })
      .populate('askedBy', 'name')
      .populate('answeredBy', 'name')
      .sort({ createdAt: -1 });

    res.json(queries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch queries' });
  }
};
