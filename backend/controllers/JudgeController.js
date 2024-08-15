const axios = require('axios');
const {formatInput, compareOutputs} = require("../services/codeExecutionService");


const formatContestInput = (testcases) => {
    let wholeinput = '';
    let wholeoutputs = '';

    // Iterate through each test case, considering it's stored as an array of objects
    testcases.forEach(testCase => {
        // Concatenate the input for the test case
        wholeinput += `${testCase.Input.trim()}\n`; 
        // Concatenate the output for the test case
        wholeoutputs += `${testCase.Output.trim()}\n`;
    });

    return { 
        wholeinput: wholeinput.trim(), 
        wholeoutputs: wholeoutputs.trim() 
    };
}



class JudgeController{
    async judgeCustomTest(req,res){
        const {language, code, correctCode, testcases} = req.body;
        try{
            const result = await axios.post('http://localhost:5500/api/run', {
                language: language,
                code: code,
                inputValue: testcases
            });
            console.log("firstResult",result.data)
            const correctResult = await axios.post('http://localhost:5500/api/run', {
                language: "cpp",
                code: correctCode,
                inputValue: testcases
            });
            console.log("secondResult",correctResult.data)
            if(result.data.output === correctResult.data.output){
                res.json({status: true, correctOutput:correctResult.data, output:result.data });
            }
            else{
                res.json({status: false, correctOutput:correctResult.data, output:result.data });
            }
        }catch(err){
            const traceback= err.response.data.error
            res.status(500).json({message: "failed", traceback:traceback });
        }
    }
    async judgeAllTests(req,res){
        const {language, code, testcases} = req.body;
        // console.log(language,code,testcases);
        const formattedInput = formatInput(testcases);
        const numberOfTestCases = Object.keys(testcases).length;
        
        // console.log(formattedInput.wholeoutputs);
        try{
            const result = await axios.post('http://localhost:5500/api/run', {
                language: language,
                code: code,
                inputValue: formattedInput.wholeinput
            });
            if(compareOutputs(formattedInput.wholeoutputs,result.data.output,numberOfTestCases)){
                res.json({status: true, output:result.data });
            }
            else{
                res.json({status: false, output:result.data });
            }
        }catch(err){
            res.status(500).json({message: "failed", traceback:err });
        }


        
    }
    async judgeContest(req, res) {
        const { language, code, testcases } = req.body;
    
        // Format the input and output for contest judging
        const formattedInput = formatContestInput(testcases);
        const expectedOutputs = formattedInput.wholeoutputs.split('\n');
    
        // Split the input into separate test cases
        const inputLines = formattedInput.wholeinput.split('\n');
    
        try {
            const actualOutputs = [];
    
            // Loop through the input lines in chunks of two (assuming two lines per test case)
            for (let i = 0; i < inputLines.length; i += 2) {
                // Create the input for a single test case
                const input = `${inputLines[i]}\n${inputLines[i + 1]}`;
                console.log("Test Case Input:", input);  // Debugging line
    
                // Send this single test case input to the code execution service
                const result = await axios.post('http://localhost:5500/api/run', {
                    language: language,
                    code: code,
                    inputValue: input.trim()
                });
    
                // Add the entire response structure to the actualOutputs array
                actualOutputs.push({
                    filepath: result.data.filepath,
                    output: result.data.output.trim(),
                    time_taken: result.data.time_taken,
                    memory_used: result.data.memory_used
                });
                console.log("Actual Outputs So Far:", actualOutputs);  // Debugging line
            }
    
            // Compare each actual output with the expected output
            const allTestsPassed = actualOutputs.every((output, index) => output.output === expectedOutputs[index].trim());
    
            res.json({ status: allTestsPassed, output: actualOutputs[0]  });
        } catch (err) {
            res.status(500).json({ message: "failed", traceback: err });
        }
    }
    
    
    

}

module.exports = new JudgeController();