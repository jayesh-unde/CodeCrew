const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testCaseSchema = new Schema({
    Input: { type: String, required: true },
    Output: { type: String, required: true }
}, {
    _id: false // Prevents the creation of an _id field for sub-documents
});

const solutionSchema = new Schema({
    language: { type: String, required: true },
    code: { type: String, required: true }
}, {
    _id: false
});

const questionSchema = new Schema({
    Topics: [{ type: String, required: true }],
    Total_Submissions: { type: Number, default: 0 },
    Correct_Submissions: { type: Number, default: 0 },
    Difficulty: { type: String, required: true },
    Description: { type: String, required: true },
    Title: { type: String, required: true },
    TestCases: { type: Map, of: testCaseSchema },
    Constraints: String,
    Time_Limit: { type: Number },
    Memory_Limit: { type: Number },
    Solution: solutionSchema,
    isContestQuestion: { type: Boolean, default: false } // Indicates if the question is part of a contest
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema, 'questions');