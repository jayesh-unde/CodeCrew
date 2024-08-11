const router = require('express').Router();
const CodeController = require('./controllers/CodeController');
const JudgeController = require('./controllers/JudgeController');
const QuestionController = require("./controllers/QuestionController");

router.post('/api/run', CodeController.executeAnswer);
router.post('/api/judgeCustomTest', JudgeController.judgeCustomTest);
router.post('/api/getQuestion',QuestionController.getQuestion)
router.post('/api/judge',JudgeController.judgeAllTests)
module.exports = router;