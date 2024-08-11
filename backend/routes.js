const router = require('express').Router();
const CodeController = require('./controllers/CodeController');
const QuestionController = require('./controllers/QuestionController');
const ContestController = require('./controllers/ContestController');

router.post('/api/run', CodeController.executeAnswer);
router.post('/api/submit-question', QuestionController.addQuestion);
router.get('/api/get-question', QuestionController.getQuestion);
router.post('/api/create-contest', ContestController.createContest);

module.exports = router;