const router = require('express').Router();
const CodeController = require('./controllers/CodeController');
const JudgeController = require('./controllers/JudgeController');
const QuestionController = require("./controllers/QuestionController");
const ContestController = require('./controllers/ContestController');

router.post('/api/run', CodeController.executeAnswer);
router.post('/api/judgeCustomTest', JudgeController.judgeCustomTest);
router.post('/api/getQuestion',QuestionController.getQuestion)
router.post('/api/judge',JudgeController.judgeAllTests)
router.post('/api/judge-contest',JudgeController.judgeContest);
router.post('/api/submit-question', QuestionController.addQuestion);
router.get('/api/get-all-question', QuestionController.getAllQuestion);
router.post('/api/create-contest', ContestController.createContest);
router.get('/api/get-all-contest', ContestController.getAllContest);
router.post('/api/get-contest', ContestController.getContest);
router.post('/api/saveLeaderboard', ContestController.saveLeaderboard);

module.exports = router;