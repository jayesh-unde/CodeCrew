const questionModel  = require("../models/question-model");

class QuestionController{
    async getQuestion(req,res){
        const {qid} = req.body;
        try{
            const question = await questionModel.findById(qid);
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