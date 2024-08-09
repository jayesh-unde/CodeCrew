const router = require('express').Router();
const CodeController = require('./controllers/CodeController');


router.post('/api/run', CodeController.executeAnswer);

module.exports = router;