const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the solution schema
const solutionSchema = new Schema({
    Language: { type: String, required: true },
    Code: { type: String, required: true },
    File: Buffer // File type could be stored as a Buffer for binary data
}, {
    _id: false // Optionally prevent _id in subdocument
});
const testCaseSchema = new Schema({
    Input: { type: String, required: true },
    Output: { type: String, required: true }
}, {
    _id: false // Prevents the creation of an _id field for sub-documents
});
// Define the main schema for a Question
const questionSchema = new Schema({
    Title: { type: String, required: true },
    Topics: [{ type: String, required: true }],
    Difficulty: { type: String, required: true },
    Description: { type: String, required: true },
    Points: { type: Number, required: true },
    Solution: solutionSchema,
    TestCases: [testCaseSchema], // Using an array for test cases
    isContestQuestion: { type: Boolean, default: false } // Indicates if the question is part of a contest
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});


const contestSchema = new Schema({
    Title: { type: String, required: true },
    Description: { type: String },
    StartTime: { type: Date, required: true },
    EndTime: { type: Date, required: true },
    Questions: [questionSchema] // Embedding the question schema directly into the contest schema
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Contest', contestSchema);