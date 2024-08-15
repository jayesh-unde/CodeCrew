import { ChakraProvider, Box, Button, VStack, HStack, Select, IconButton, useDisclosure } from '@chakra-ui/react';
import { Resizable } from 're-resizable';
import theme from '../../theme';
import { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../../constants";
import QuestionComponent from '../../components/QuestionComponent';
import TestCaseContainer from '../../components/TestCaseContainer';
import Navbar from "../../components/Navbar";
import { judgeContest, judgeCustomTest } from "../../http";
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import LeaderBoard from '../../components/LeaderBoard/LeaderBoard';

const ContestQuestion = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("cpp");
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [output, setOutput] = useState(undefined);
  const [executionTime, setExecutionTime] = useState(Infinity);
  const [response, setResponse] = useState(undefined);
  const [memoryUsed, setMemoryUsed] = useState(0);
  const [consoleError, setConsoleError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [cases, getTestCases] = useState('');
  const [question, setQuestion] = useState(undefined);
  const [index, setIndex] = useState(0);
  const [runOutput, setRunOutput] = useState(undefined);
  const [submitOutput, setSubmitOutput] = useState(undefined);

  const { state } = useLocation();
  const { contestQuestions } = state || {};
  const { contestId,questionIndex } = useParams();
 
  const navigate = useNavigate();
 
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (contestQuestions && questionIndex) {
      const currentQuestion = contestQuestions[parseInt(questionIndex)];
      setQuestion(currentQuestion);
      setIsLoading(false);
    }
  }, [contestQuestions, questionIndex]);

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

    if (question) {
      const correctCode = question.Solution.Code;
      try {
        const result = await judgeCustomTest(language, sourceCode, correctCode, inputValue);
        console.log("find result");
        setRunOutput(result.data);
      } catch (error) {
        console.log();
        if (error) {
          let traceback = error.response.data.traceback;
          setConsoleError(traceback);
          console.log(traceback);
        }
        setOutput("");
        if (!consoleError) {
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
    } else {
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

    if (question) {
      const testcases = question.TestCases;
      try {
        const result = await judgeContest(language, code, testcases);
        console.log("hello", result.data);
        setSubmitOutput(result.data);
      } catch (error) {
        console.log();
        if (error) {
          let traceback = error.response.data.traceback;
          setConsoleError(traceback);
          console.log(traceback);
        }
        setOutput("");
        if (!consoleError) {
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
    } else {
      console.log("error");
      setIsLoading(false);
      setIndex(1);
    }
  };

  useEffect(() => {
    const savedCode = localStorage.getItem(`codeEditor_${language}`);
    if (savedCode) {
      setValue(savedCode);
    } else {
      console.log(`No saved code for ${language}. Setting default snippet.`);
      setValue(CODE_SNIPPETS[language]);
    }
  }, [language]);

  useEffect(() => {
    localStorage.setItem(`codeEditor_${language}`, value);
  }, [value]);

  const handlePrev = () => {
    if (questionIndex > 0) {
      navigate(`/contest/${contestId}/question/${parseInt(questionIndex) - 1}`, { state: { contestQuestions } });
    }
  };

  const handleNext = () => {
    if (contestQuestions && parseInt(questionIndex) < contestQuestions.length - 1) {
      navigate(`/contest/${contestId}/question/${parseInt(questionIndex) + 1}`, { state: { contestQuestions } });
    }
  };
  const handleLeaderboard = () => {
    navigate(`/contest/${contestId}/leaderboard`);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <Navbar />
          <ChakraProvider theme={theme}>
            <VStack spacing={4} m={2} h="calc(100vh - 4rem)" w="99%" overflowX="hidden">
              <HStack justify="space-between" w="full">
                <IconButton
                  icon={<ArrowBackIcon />}
                  aria-label="Previous question"
                  onClick={handlePrev}
                  isDisabled={parseInt(questionIndex) === 0}
                />
                <HStack justify="center" spacing={8}>
                  <Button mt={4} variant="outline" colorScheme="green" isLoading={isLoading} onClick={onSubmitHandler}>
                    Submit
                  </Button>
                  <Button mt={4} variant="outline" colorScheme="green" isLoading={isLoading} onClick={onRunHandler}>
                    Run
                  </Button>
                </HStack>
                <HStack justify="flex-end">
                  <Button onClick={handleLeaderboard}>Leaderboard</Button>
                  <IconButton
                    icon={<ArrowForwardIcon />}
                    aria-label="Next question"
                    onClick={handleNext}
                    isDisabled={contestQuestions && parseInt(questionIndex) >= contestQuestions.length - 1}
                  />
                </HStack>
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
                        w="auto"
                        minWidth="100px"
                        maxWidth="200px"
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
                            setValue(newValue);
                          }}
                        />
                      </Box>
                    </Resizable>
                    <div style={{ border: "1px solid white", width: "100%" }}></div>
                    <Box h="full" p={0} bg="gray.800" overflowY="auto" w="full">
                      <TestCaseContainer
                        question={question}
                        getTestCases={getTestCases}
                        index={index}
                        setIndex={setIndex}
                        runOutput={runOutput}
                        submitOutput={submitOutput}
                        consoleError={consoleError}
                      />
                    </Box>
                  </VStack>
                </Resizable>
              </HStack>
            </VStack>
            <LeaderBoard isOpen={isOpen} onClose={onClose} />
          </ChakraProvider>
        </div>
      )}
    </>
  );
};

export default ContestQuestion;
