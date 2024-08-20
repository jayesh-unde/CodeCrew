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

    // New function to get all contests
    async getAllContest(req, res) {
        try {
            const contests = await Contest.find({});
            res.status(200).json({ contests });
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve contests", error: error.message });
        }
    }
    async getContest(req, res) {
        try {
            const { _id } = req.body; // req.body should contain the JSON data
            console.log(_id); // Ensure the ID is logged correctly
            
            const contest = await Contest.findById(_id); // No need for braces around _id here
    
            if (!contest) {
                return res.status(404).json({ message: "Contest not found" });
            }
    
            res.status(200).json(contest );
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve contest", error: error.message });
        }
    }
    async saveLeaderboard(req, res) {
        const { contestId, leaderboard } = req.body;

        try {
            // Find the contest by ID
            const contest = await Contest.findById(contestId);

            if (!contest) {
                return res.status(404).json({ message: "Contest not found" });
            }

            // Update the contest's leaderboard
            contest.Leaderboard = leaderboard;

            // Save the updated contest
            await contest.save();

            res.status(200).json({ message: "Leaderboard saved successfully!" });
        } catch (error) {
            res.status(500).json({ message: "Failed to save leaderboard", error: error.message });
        }
    }
    
    
}

module.exports = new ContestController();
