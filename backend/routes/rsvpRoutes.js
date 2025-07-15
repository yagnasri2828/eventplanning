const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addRSVP, getRSVPs } = require('../controllers/rsvpController');

router.post('/:eventId', auth, addRSVP);
router.get('/:eventId', auth, getRSVPs);

module.exports = router;
