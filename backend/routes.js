const router = require('express').Router();
const CodeController = require('./controllers/CodeController');
const QuestionController = require('./controllers/QuestionController');

router.post('/api/run', CodeController.executeAnswer);
router.post('/api/submit-question', QuestionController.addQuestion);

module.exports = router;