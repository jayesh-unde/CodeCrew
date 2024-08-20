import { ChakraProvider, Box, Button, VStack, HStack, Select, IconButton, useDisclosure, useToast } from '@chakra-ui/react';
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
import { saveLeaderboard } from '../../http';
import io from 'socket.io-client';

// Generate or retrieve a persistent identifier
const getPersistentId = () => {
  let id = localStorage.getItem('persistent_id');
  
  if (!id) {
    id = `user_${Math.floor(Math.random() * 10000)}`;
    localStorage.setItem('persistent_id', id);
    console.log('New persistentId generated and stored:', id);
  } else {
    console.log('Existing persistentId retrieved from localStorage:', id);
  }
  return id;
};

// Initialize the socket connection outside of the component lifecycle
const persistentId = getPersistentId();
console.log('persistentId before socket initialization:', persistentId); 
const socket = io('http://localhost:5500', {
  query: { persistentId: persistentId }
});

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
  const [leaderboard, setLeaderboard] = useState([]); // State for leaderboard data
  const [timeLeft, setTimeLeft] = useState(''); // State for timer

  const { state } = useLocation();
  const { contestQuestions, endTime } = state || {};
  const { contestId, questionIndex } = useParams();
 
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // State to track whether a question has been answered correctly
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(() => {
    const savedState = localStorage.getItem(`answeredCorrectly_${contestId}_${questionIndex}`);
    return savedState === 'true';
  });

  useEffect(() => {
    console.log('Establishing socket connection with persistentId:', persistentId);

    socket.on('update_leaderboard', (data) => {
      console.log(data.users);
      setLeaderboard(data.users); // Update leaderboard state
    });

    return () => {
      socket.off('update_leaderboard'); // Clean up on unmount
    };
  }, []);
  

  useEffect(() => {
    if (contestQuestions && questionIndex) {
      const currentQuestion = contestQuestions[parseInt(questionIndex)];
      setQuestion(currentQuestion);
      setIsLoading(false);
      // Reset the correct answer state for new questions
      setValue('');
      const savedCode = localStorage.getItem(`code_${contestId}_${questionIndex}`);
    if (savedCode) {
      setValue(savedCode);
    }
    
    // Reset the correct answer state for new questions
    const savedState = localStorage.getItem(`answeredCorrectly_${contestId}_${questionIndex}`);
      setHasAnsweredCorrectly(savedState === 'true');
    }
  }, [contestQuestions, questionIndex]);

  // Timer Logic
  useEffect(() => {
    if (endTime) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = new Date(endTime).getTime() - now;
  
        if (distance <= 0) {
          clearInterval(interval);
          setTimeLeft('Contest Ended');
  
          // Call handleContestEnd when the contest ends
          handleContestEnd();
        } else {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [endTime]);
  
  const handleContestEnd = async () => {
    try {
      // Call the API to save the leaderboard
      await saveLeaderboard({
        contestId: contestId,
        leaderboard: leaderboard, // Pass the current leaderboard state
      });
  
      // Display a toast notification for contest end
      toast({
        title: "Contest Ended",
        description: "The contest has ended. Redirecting to the Battleground.",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
  
      // Redirect to the Battleground after a short delay
      setTimeout(() => {
        navigate('/battleground');
      }, 4000); // Adjust the delay as needed
    } catch (error) {
      console.error("Failed to save leaderboard:", error);
  
      // Display a toast notification if there's an error
      toast({
        title: "Error",
        description: "Failed to save the leaderboard. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  

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

    if (question ) { // Only proceed if the question hasn't been answered correctly yet
      const testcases = question.TestCases;
      try {
        const result = await judgeContest(language, code, testcases);
        console.log("hello", result.data);
        setSubmitOutput(result.data);
        
        // Check if the answer is correct (assuming `result.data.status` is a boolean)
        if (result.data.status === true) {
          setHasAnsweredCorrectly(true); // Mark the question as correctly answered
          localStorage.setItem(`answeredCorrectly_${contestId}_${questionIndex}`, 'true'); // Persist the correct answer state
         
          // Emit the score submission to the server using the existing socket connection
          socket.emit('submit_score', { points: question.Points });
        }
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
      setIsLoading(false);
      setIndex(1);
      toast({
        title: "Already Answered",
        description: "You have already answered this question correctly.",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      navigate(`/contest/${contestId}/question/${parseInt(questionIndex) - 1}`, { state: { contestQuestions, endTime } });
    }
  };

  const handleNext = () => {
    if (contestQuestions && parseInt(questionIndex) < contestQuestions.length - 1) {
      navigate(`/contest/${contestId}/question/${parseInt(questionIndex) + 1}`, { state: { contestQuestions, endTime } });
    }
  };

  const handleLeaderboard = () => {
    navigate(`/contest/${contestId}/leaderboard`, { state: { leaderboard,persistentId } }); // Pass the leaderboard data
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
                  <Box mr={4}>
                    <HStack>
                      <Box as="span" mr={2} role="img" aria-label="clock">
                        ⏰
                      </Box>
                      <Box>{timeLeft}</Box>
                    </HStack>
                  </Box>
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
                            const code = newValue || "";
                            setValue(code);
                            localStorage.setItem(`code_${contestId}_${questionIndex}`, code); // Save the code to localStorage
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
            
          </ChakraProvider>
        </div>
      )}
    </>
  );
};

export default ContestQuestion;
