const router = require('express').Router();
const CodeController = require('./controllers/CodeController');
const JudgeController = require('./controllers/JudgeController');
const QuestionController = require("./controllers/QuestionController");
const ContestController = require('./controllers/ContestController');

router.post('/api/run', CodeController.executeAnswer);
router.post('/api/judgeCustomTest', JudgeController.judgeCustomTest);
router.post('/api/getQuestion',QuestionController.getQuestion)
router.post('/api/judge',JudgeController.judgeAllTests)
router.post('/api/submit-question', QuestionController.addQuestion);
router.get('/api/get-all-question', QuestionController.getAllQuestion);
router.post('/api/create-contest', ContestController.createContest);

module.exports = router;