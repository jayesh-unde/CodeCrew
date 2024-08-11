const axios = require('axios');
const {formatInput, compareOutputs} = require("../services/codeExecutionService");
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
        // console.log(formattedInput.wholeinput);
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
}

module.exports = new JudgeController();