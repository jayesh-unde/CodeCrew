import { ChakraProvider, Box, Button, VStack, HStack, Select } from '@chakra-ui/react';
import { Resizable } from 're-resizable';
import theme from '../../theme';
import { useRef, useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../../constants";
import QuestionComponent from '../../components/QuestionComponent';
import TestCaseContainer from '../../components/TestCaseContainer';
import Navbar from "../../components/Navbar";
import { judge,judgeCustomTest,getQuestion } from "../../http";
import ExecutionCard from '../../components/ExecutionCard';

const questionData = {
  "Title": "Reverse Integer",
  "Description": "Given a 32-bit signed integer, reverse digits of an integer. Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows. Given a 32-bit signed integer, reverse digits of an integer. Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.",
  "Difficulty": "Medium",
  "Total_Submissions": 1000,
  "Correct_Submissions": 650,
  "Topic": "Math",
  "Constraints": "Input is within the 32-bit signed integer range: [−2^31,  2^31 − 1].",
  "Time_Limit": 2,
  "Memory_Limit": 64,
  "language":"cpp",
  "TestCases": {
    "TestCase1": {
      "Input": "123",
      "Output": "321"
    },
    "TestCase2": {
      "Input": "-123",
      "Output": "-321"
    }
  },
  "solution": ""
};


const QuestionPage = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("cpp");
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [output, setOutput] = useState(undefined);
  const [executionTime, setExecutionTime] = useState (Infinity);
  const [response, setResponse] = useState (undefined);
  const [memoryUsed, setMemoryUsed] = useState (0);
  const [consoleError,setConsoleError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [cases, getTestCases] = useState('');
  const [question,setQuestion] = useState(undefined);
  const [index, setIndex] = useState(0);
  const [runOutput,setRunOutput] = useState(undefined);
  const [submitOutput,setSubmitOutput] = useState(undefined);

  const {_id} = useParams();
  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      try {
        const res = await getQuestion(_id);
        console.log(res.data);
        setQuestion(res.data);
      } catch (error) {
        console.error("Failed to fetch question:", error);
      }
      setIsLoading(false);
    };

    fetchQuestion();
  }, [_id]);

  // console.log(cases)
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onRunHandler = async () => {
    setSubmitOutput(undefined);
    setConsoleError(undefined);
    const sourceCode = value;
    const inputValue = cases;
    setIsLoading(true);
    try{
      const response = await getQuestion(qid);
      console.log(response.data);
      setQuestion(response.data);
    }catch(err){
      console.log(err)
      setConsoleError(err);
    }
    // console.log("Question",question);
    if(question){
      const correctCode = question.Solution.code;
      try {
        const result = await judgeCustomTest(language, sourceCode, correctCode, inputValue); // Use the executeCode function from http module
        console.log("find result",result.data);
        setRunOutput(result.data);
      } catch (error) {
        console.log();
        if(error){
          let traceback = error.response.data.traceback;
          setConsoleError(traceback);
          console.log(traceback);
        }
        setOutput("");
        if(!consoleError){
          toast({
            title: "An error occurred.",
            description: error.message || "Unable to run code",
            status: "error",
            duration: 6000,
          });
        }
      } finally {
        setIsLoading(false);
        setIndex(1);
      }
    }else{
      console.log("error");
      setIsLoading(false);
      setIndex(1);
    }
    
  };
  const onSubmitHandler = async () => {
    setRunOutput(undefined);
    setConsoleError(undefined);
    const code = value;
    setIsLoading(true);
    try{
      const response = await getQuestion(qid);
      console.log(response.data);
      setQuestion(response.data);
    }catch(err){
      console.log(err)
    }
    if(question){
      const testcases = question.TestCases;
        try {
        const result = await judge(language, code, testcases);
        console.log("hello",result.data); // Use the executeCode function from http module
        setSubmitOutput(result.data);
      } catch (error) {
        console.log();
        if(error){
          let traceback = error.response.data.traceback;
          setConsoleError(traceback);
          console.log(traceback);
        }
        setOutput("");
        if(!consoleError){
          toast({
            title: "An error occurred.",
            description: error.message || "Unable to run code",
            status: "error",
            duration: 6000,
          });
        }
      } finally {
        setIsLoading(false);
        setIndex(1);

      }
    }else{
      console.log("error");
      setIsLoading(false);
      setIndex(1);

    }
  };

  useEffect(() => {
    // Retrieve code from localStorage if available
    const savedCode = localStorage.getItem(`codeEditor_${language}`);
    if (savedCode) {
      // console.log(`Loaded code for ${language}:`, savedCode);
      setValue(savedCode);
    } else {
      console.log(`No saved code for ${language}. Setting default snippet.`);
      setValue(CODE_SNIPPETS[language]);
    }
  }, [language]);

  useEffect(() => {
    // Save code to localStorage whenever it changes
    // console.log(`Saving code for ${language}:`, value);
    localStorage.setItem(`codeEditor_${language}`, value);
  }, [value]);

  console.log(consoleError);
  return (
    <>
      {isLoading? <div>Loading</div>: <div>
      <Navbar />
      <ChakraProvider theme={theme}>
        <VStack spacing={4} m={2} h="calc(100vh - 4rem)" w="99%" overflowX="hidden">
          <HStack justify="center" spacing={8} w="full">
            <Button mt={4} variant="outline" colorScheme="green" isLoading={isLoading} onClick={onSubmitHandler}>Submit</Button>
            <Button mt={4} variant="outline" colorScheme="green" isLoading={isLoading} onClick={onRunHandler}>Run</Button>
          </HStack>
          <HStack spacing={4} h="full" w="full" flexGrow={1}>
            <Resizable
              defaultSize={{ width: '50%', height: '100%' }}
              minWidth="300px"
              handleStyles={{ left: { width: '10px', cursor: 'ew-resize', backgroundColor: 'transparent' } }}
              enable={{ right: true }}
              style={{ height: 'auto', flexGrow: 1 }}
            >
              <Box p={0} bg="gray.700" overflowY="auto" h="full">
                <QuestionComponent question={question} />
              </Box>
            </Resizable>
            <Resizable
              defaultSize={{ width: '50%', height: '100%' }}
              minWidth="300px"
              handleStyles={{ left: { width: '10px', cursor: 'ew-resize', backgroundColor: 'transparent' } }}
              enable={{ left: true }}
              style={{ height: 'auto', flexGrow: 1 }}
            >
              <VStack spacing={0} h="full" w="full">
                <Box w="full" bg="brand.800" p={2} mb={0}>
                  <Select 
                    placeholder="Select language" 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)} 
                    w="auto" minWidth="100px" maxWidth="200px"
                  >
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                  </Select>
                </Box>
                <Resizable
                  defaultSize={{ width: "100%", height: "calc(50% - 20px)" }}
                  handleStyles={{ bottom: { height: '10px', cursor: 'ns-resize', backgroundColor: 'transparent' } }}
                  enable={{ bottom: true }}
                  style={{ height: 'auto', flexGrow: 1 }}
                  minHeight="200px"
                >
                  <Box h="full" p={0} bg="gray.600" overflowY="auto" w="full">
                    <Editor
                      height="100%"
                      theme="vs-dark"
                      language={language}
                      value={value}
                      options={{
                        minimap: {
                          enabled: false
                        },
                        automaticLayout: true
                      }}
                      onMount={onMount}
                      onChange={(newValue) => {
                        // console.log(`Editor changed for ${language}:`, newValue);
                        setValue(newValue);
                      }}
                    />
                  </Box>
                </Resizable>
                <div style={{ border: "1px solid white", width: "100%" }}></div>
                <Box h="full" p={0} bg="gray.800" overflowY="auto" w="full">
                  {index==0 && 
                  <TestCaseContainer question={questionData} getTestCases={getTestCases} index={0} setIndex={setIndex} runOutput={runOutput} submitOutput={submitOutput} consoleError={consoleError} />}
                  {index==1 && 
                  <TestCaseContainer question={questionData} getTestCases={getTestCases} index={1} setIndex={setIndex} runOutput={runOutput} submitOutput={submitOutput} consoleError={consoleError} />}
                </Box>
              </VStack>
            </Resizable>
          </HStack>
        </VStack>
      </ChakraProvider>
      </div>}
    </>
  );
};

export default QuestionPage;
