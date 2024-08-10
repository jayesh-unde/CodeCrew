const fs = require('fs');
const path = require('path');
const { exec,spawn } = require('child_process');
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
  if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
  }
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  const jobId = uuid();
  const filename = `${jobId}.${language}`;
  const filepath = path.join(dirCodes, filename);
  fs.writeFileSync(filepath, content);
  return filepath;
};

// Execute C++ code
// const executeCpp = async (filepath,inputs) => {
//   const jobId = path.basename(filepath, '.cpp');
//   const outPath = path.join(outputPath, `${jobId}.out`);
//   const command = `g++ "${filepath}" -o "${outPath}" && echo "${inputs}" | "${outPath}"`;

//   return new Promise((resolve, reject) => {
//     exec(command, (error, stdout, stderr) => {
//       if (error || stderr) {
//         reject({ error, stderr });
//       }
//       resolve(stdout);
//     });
//   });
// };

const executeCpp = async (codePath, inputs) => {
  return new Promise((resolve, reject) => {
  const jobId = uuid();
  const exePath = path.join(dirCodes, `${jobId}.exe`);

  const compileProcess = spawn('g++', [codePath, '-o', exePath]);

  compileProcess.stderr.on('data', (data) => {
    reject({ code: 1, error: `Compilation Error: ${data.toString()}` });
  });

  compileProcess.on('close', (code) => {
    if (code !== 0) {
      return reject({ code: code, error: `Compilation failed with exit code ${code}` });
    }

    const runProcess = spawn(exePath);

    runProcess.stdin.write(inputs);
    runProcess.stdin.end();

    let output = '';
    let error = '';

    runProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    runProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    runProcess.on('close', (code) => {
      if (code !== 0) {
        reject({ code: code, error: error });
      } else {
        resolve(output);
      }
    });

    runProcess.on('error', (err) => {
      reject({ code: 1, error: err.message });
    });
  });
});
};

// Execute Python code
const executePy = (filepath,inputs) => {
  const filename = path.basename(filepath);

    return new Promise((resolve, reject) => {
      const program = spawn(`python`, [filename], { cwd: dirCodes })
      let output = '';
      let error = '';
      program.stdin.write(inputs);
      program.stdin.end();

      program.stdout.on('data', (data) => {
          output += data.toString();
      });

      program.stderr.on('data', (data) => {
          error += data.toString();
      });

      program.on('error', (err) => {
          console.log(err);
          reject(err)
      });

      program.on('close', (code) => {
          if (code !== 0) {
              reject({code:code,error:error});
          } else {
            console.log(output);
            resolve(output);
          }
      });
    })
  }
module.exports = { generateFile, executeCpp, executePy };
