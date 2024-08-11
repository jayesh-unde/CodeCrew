const Contest = require('../models/contest-model');
const Question = require('../models/question-model');

class ContestController {
    async createContest(req, res) {
        const { title, description, startTime, endTime, questions } = req.body;

        try {
            // Assuming each question object in `questions` array contains a `testCases` object
            const formattedQuestions = questions.map(q => ({
                Title: q.title,
                Topics: q.topics,
                Difficulty: q.difficulty,
                Description: q.description,
                Points: q.points,
                Solution: {
                    Language: q.solution.language,
                    Code: q.solution.code,
                },
                TestCases: Object.keys(q.testCases).map(key => ({
                    Input: q.testCases[key].Input,
                    Output: q.testCases[key].Output
                }))
            }));

            // Update the 'isContestQuestion' flag for each question involved in the contest
            const questionIds = questions.map(question => question._id); // Assuming _id is part of the questions data
            await Question.updateMany(
                { _id: { $in: questionIds } },
                { $set: { isContestQuestion: true } }
            );

            const newContest = new Contest({
                Title: title,
                Description: description,
                StartTime: new Date(startTime),
                EndTime: new Date(endTime),
                Questions: formattedQuestions
            });

            await newContest.save();

            res.status(201).json({ message: "Contest created successfully!", contest: newContest });
        } catch (error) {
            res.status(500).json({ message: "Failed to create contest", error: error.message });
        }
    }
}

module.exports = new ContestController();