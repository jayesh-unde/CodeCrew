const fs = require('fs');
const path = require('path');
const { exec,spawn } = require('child_process');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes');
const outputPath = path.join(__dirname, 'outputs');


if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}


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

    // Compile the C++ code
    const compileProcess = spawn('g++', [codePath, '-o', exePath]);

    compileProcess.stderr.on('data', (data) => {
      reject({ code: 1, error: `Compilation Error: ${data.toString()}` });
    });

    compileProcess.on('close', (code) => {
      if (code !== 0) {
        return reject({ code: code, error: `Compilation failed with exit code ${code}` });
      }

      // Execute the compiled binary
      const runProcess = spawn(exePath);


       if (Array.isArray(inputs)) {
        inputs = inputs.join('\n');
      } else if (typeof inputs === 'object') {
        inputs = JSON.stringify(inputs);
      } else if (typeof inputs !== 'string') {
        inputs = String(inputs);
      }

      runProcess.stdin.write(inputs);
      runProcess.stdin.end();

      let output = '';
      let error = '';

      // Start timing and memory usage tracking
      const startTime = performance.now();
      const memoryBefore = process.memoryUsage();

      runProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      runProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      runProcess.on('close', (code) => {
        // End timing and memory usage tracking
        const endTime = performance.now();
        const executionTime = (endTime - startTime);

        const memoryAfter = process.memoryUsage();
        const memoryUsed = memoryAfter.heapUsed - memoryBefore.heapUsed; // in bytes
        const memoryUsedMB = memoryUsed / 1024;

        if (code !== 0) {
          reject({ code: code, error: error || `Execution failed with exit code ${code}` });
        } else {
          resolve({ output, time_taken: executionTime, memory_used: memoryUsedMB });
        }
      });

      runProcess.on('error', (err) => {
        reject({ code: 1, error: err.message });
      });
    });
  });
};

// Execute Python code
const executePy = (filepath, inputs) => {
  const filename = path.basename(filepath);

  return new Promise((resolve, reject) => {
    const program = spawn('python', [filename], { cwd: dirCodes });
    let output = '';
    let error = '';

    // Start timing and memory usage tracking
    const startTime = performance.now();
    const memoryBefore = process.memoryUsage();

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
      reject({ code: 1, error: err.message });
    });

    program.on('close', (code) => {
      // End timing and memory usage tracking
      const endTime = performance.now();
      const executionTime = (endTime - startTime);

      const memoryAfter = process.memoryUsage();
      const memoryUsed = memoryAfter.heapUsed - memoryBefore.heapUsed; // in bytes
      const memoryUsedKB = memoryUsed / 1024;

      if (code !== 0) {
        reject({ code: code, error: error || `Execution failed with exit code ${code}` });
      } else {
        resolve({ output, time_taken: executionTime, memory_used: memoryUsedKB });
      }
    });
  });
};


const formatInput = (testcases)=>{
  const numberOfTestCases = Object.keys(testcases).length;

  let wholeinput = `${numberOfTestCases}\n`;

  let wholeoutputs="";


  Object.values(testcases).forEach(testCase => {
    const inputLines = testCase.Input.split("\n");
    wholeinput += `${inputLines[0]}\n`;
    wholeinput += `${inputLines[1]}\n`;
    wholeoutputs += `${testCase.Output}\n`;
  });
  return {wholeinput,wholeoutputs};

}


const compareOutputs = (expected, userOutput, numberOfTestCases) => {
  const normalizedStr1 = expected.replace(/\r\n/g, '\n').trim();
  const normalizedStr2 = userOutput.replace(/\r\n/g, '\n').trim();
  return normalizedStr1 === normalizedStr2;
};

module.exports = { generateFile, executeCpp, executePy, formatInput, compareOutputs };
