const { generateFile, executeCpp, executePy } = require('../services/codeExecutionService');

class CodeController {
    async executeAnswer(req, res) {
        const { language = "cpp", code } = req.body;

        if (!code) {
            return res.status(400).json({ success: false, error: "Empty code body!" });
        }

        try {
            const filepath = await generateFile(language, code);
            let output;
            if (language === "cpp") {
                output = await executeCpp(filepath);
            } else if (language === "py") {
                output = await executePy(filepath);
            } else {
                return res.status(400).json({ success: false, error: "Unsupported language!" });
            }

            res.json({ filepath, output });
        } catch (error) {
            console.error('Execution error:', error);
            res.status(500).json({ success: false, error: error.message || 'Failed to execute code.' });
        }
    }
}

module.exports = new CodeController();
