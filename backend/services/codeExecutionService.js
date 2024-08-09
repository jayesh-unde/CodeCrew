const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes');
const outputPath = path.join(__dirname, 'outputs');

// Ensure directories exist
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// Generate a code file
const generateFile = async (language, content) => {
  const jobId = uuid();
  const filename = `${jobId}.${language}`;
  const filepath = path.join(dirCodes, filename);
  fs.writeFileSync(filepath, content);
  return filepath;
};

// Execute C++ code
const executeCpp = (filepath) => {
  const jobId = path.basename(filepath, '.cpp');
  const outPath = path.join(outputPath, `${jobId}.out`);
  const command = `g++ "${filepath}" -o "${outPath}" && "${outPath}"`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject({ error, stderr });
      }
      resolve(stdout);
    });
  });
};

// Execute Python code
const executePy = (filepath) => {
  const command = `python "${filepath}"`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject({ error, stderr });
      }
      resolve(stdout);
    });
  });
};

module.exports = { generateFile, executeCpp, executePy };
