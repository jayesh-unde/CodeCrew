import React, { useState, useEffect } from 'react';
import { Box, VStack, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Text, Textarea } from '@chakra-ui/react';
import ExecutionCard from './ExecutionCard';
function TestCaseContainer({ question,getTestCases,index, setIndex, submitOutput, runOutput, consoleError}) {
  // Initialize state to store test cases
  const [testCases, setTestCases] = useState('');
  const [tabIndex, setTabIndex] = useState(index);
  const switchTab = (index) => {
    setTabIndex(index);
  };

  useEffect(() => {
    // Fetch test cases from the question object and format them
    if (question && question.TestCases) {
      const testCaseEntries = Object.entries(question.TestCases).slice(0, 2); // Get first two test cases
      const formattedTestCases = testCaseEntries.map(([key, testCase], index) => {
        return `${testCase.Input}`; // Format each test case input
      }).join('\n');
      // Set the test cases state
      setTestCases(`2\n${formattedTestCases}`);
    }
  }, [question]);
  useEffect(()=>{
    getTestCases(testCases)
  },[testCases])

  let errors;
  if(consoleError){
    errors = Object.entries(consoleError).map(([key, value]) => `${key}:${value}`).join(", ");
  }

  return (
    <Flex direction="column" height="100vh" bg="brand.200">
      <Tabs variant="enclosed" isFitted index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Test Cases</Tab>
          <Tab>Test Cases Result</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack align="stretch" p={4} spacing={4} overflowY="auto">
              <Textarea
                value={testCases} // Display test cases in textarea
                onChange={(e) => setTestCases(e.target.value)} // Allow editing
                size="sm"
                minHeight="200px"
              />
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack p={4} spacing={4}>
              {consoleError? <div>
                <div><Text fontSize="sm" color="red.500" >Error: </Text> </div>
                <div><Text fontSize="sm" color="red.500" >{errors}</Text></div>
              </div> : runOutput? <div>
                <ExecutionCard status={runOutput.status} output={runOutput.output} info={1} />
              </div>: submitOutput? <div>
                <ExecutionCard status={submitOutput.status} output={submitOutput.output} info={2} />
                </div>: "span" }
              {/* <ExecutionCard consoleError={consoleError} runOutput={runOutput} submitOutput={submitOutput} /> */}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default TestCaseContainer;
