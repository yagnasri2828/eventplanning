const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:eventId', authMiddleware, queryController.askQuery);
router.get('/:eventId', queryController.getEventQueries);
router.put('/answer/:queryId', authMiddleware, queryController.answerQuery);

module.exports = router;
