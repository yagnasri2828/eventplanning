const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

router.post('/', auth, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);

module.exports = router;
