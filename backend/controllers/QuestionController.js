const Question  = require("../models/question-model");

class QuestionController{
    async addQuestion(req, res) {
        try {
            const {
                title,
                topics,
                difficulty,
                description,
                constraints,
                timeLimit,
                memoryLimit,
                solution,
                testCases
            } = req.body;

            // Prepare test cases for the database
            // Convert the testCases object to a Map
            const testCaseMap = new Map(Object.entries(testCases).map(([key, { Input, Output }]) => {
                return [key, { Input, Output }];
            }));

            const newQuestion = new Question({
                Title: title,
                Topics: topics,
                Difficulty: difficulty,
                Description: description,
                Constraints: constraints,
                Time_Limit: timeLimit,
                Memory_Limit: memoryLimit,
                Solution: solution,
                TestCases: testCaseMap
            });

            await newQuestion.save();

            res.status(201).json({
                success: true,
                message: "Question added successfully",
                data: newQuestion
            });
        } catch (error) {
            console.error('Failed to add question:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    async getAllQuestion(req, res) {
        try {
            const questions = await Question.find({}); // Fetch all documents from the 'questions' collection
            if (!questions.length) {
                return res.status(404).json({
                    success: false,
                    message: 'No questions found'
                });
            }
            res.status(200).json({
                success: true,
                data: questions
            });
        } catch (error) {
            console.error('Error retrieving questions:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
    async getQuestion(req,res){
        const {qid} = req.body;
        try{
            const question = await Question.findById(qid);
            if(!question){
                return res.status(404).json({message:"Question not found"});
            }else{
                return res.status(200).json(question);
            }
            // console.log(question);
            // res.json(question);
        }catch(err){
            console.log(err);
            res.status(500).json({ success: false, error: err || 'Failed to execute code in backend' });
        }
    }
}

module.exports = new QuestionController();