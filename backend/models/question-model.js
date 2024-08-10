const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for individual test cases
const testCaseSchema = new Schema({
    Input: { type: String, required: true },
    Output: { type: String, required: true }
}, {
    _id: false // Prevents the creation of an _id field for sub-documents
});

// Define the schema for the Solution
const solutionSchema = new Schema({
    language: { type: String, required: true },
    code: { type: String, required: true }, // Assuming code is always require // Optional field to store file data if needed
}, {
    _id: false // Prevents the creation of an _id field for sub-documents
});

// Define the main schema for a Question
const questionSchema = new Schema({
    Topics: [{ type: String, required: true }],
    Total_Submissions: { type: Number, default: 0 },
    Correct_Submissions: { type: Number, default: 0 },
    Difficulty: { type: String, required: true },
    Description: { type: String, required: true },
    Title: { type: String, required: true },
    TestCases: {
        type: Map,
        of: testCaseSchema
    },
    Constraints: String,
    Time_Limit: { type: Number }, // Assuming this is in seconds
    Memory_Limit: { type: Number }, // Assuming this is in megabytes
    Solution: solutionSchema // Using the solution schema here
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: { getters: true } // Ensures getters apply when converting document to JSON
});

// Compiling our schema into a Model.
module.exports = mongoose.model('Question', questionSchema, 'questions');
