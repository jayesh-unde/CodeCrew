const { generateFile, executeCpp, executePy, runCppWithInputs} = require('../services/codeExecutionService');

class CodeController {
    async executeAnswer(req, res) {
        let { language = "cpp", code, inputValue } = req.body;
        if(language==='python'){
            language='py'
        }

        if (!code) {
            return res.status(400).json({ success: false, error: "Empty code body!" });
        }

        try {
            const filepath = await generateFile(language, code);
            let output;
            if (language === "cpp") {
                output = await executeCpp(filepath,inputValue);
            } else if (language === "py") {
                output = await executePy(filepath,inputValue);
            } else {
                return res.status(400).json({ success: false, error: "Unsupported language!" });
            }

            res.json({ filepath, output });
        } catch (error) {
            console.error('Execution error:', error);
            res.status(500).json({ success: false, error: error.error || 'Failed to execute code in backend' });
        }
    }
}

module.exports = new CodeController();
