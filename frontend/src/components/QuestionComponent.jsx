import { Box, VStack, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Text, Stat, StatLabel, StatNumber, StatGroup, StatHelpText, HStack } from '@chakra-ui/react';

const QuestionComponent = ({ question }) => {
    return (
        <Flex direction="column" height="100vh" bg="brand.200">
            <Tabs variant="enclosed" isFitted>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Submissions</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <VStack align="stretch" p={4} spacing={4} overflowY="auto">
                            <Text fontSize="2xl" fontWeight="bold">{question.Title}</Text>
                            <Text mt={2}>{question.Description}</Text>
                            <Box mt={4}>
                                <Text fontSize="xl" fontWeight="bold">Example 1</Text>
                                <Text>Input: {question.TestCases.TestCase1.Input}</Text>
                                <Text>Output: {question.TestCases.TestCase1.Output}</Text>
                            </Box>
                            <Box mt={4}>
                                <Text fontSize="xl" fontWeight="bold">Example 2</Text>
                                <Text>Input: {question.TestCases.TestCase2.Input}</Text>
                                <Text>Output: {question.TestCases.TestCase2.Output}</Text>
                            </Box>
                            <Box mt={4}>
                                <Text fontWeight="bold">Constraints:</Text>
                                <Text>{question.Constraints}</Text>
                                <Text>Time limit: {question.Time_Limit} seconds</Text>
                                <Text>Memory limit: {question.Memory_Limit} MBs</Text>
                            </Box>
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <VStack p={4} spacing={4}>
                            <Text>Total Submissions: {question.Total_Submissions}</Text>
                            <Text>Correct Submissions: {question.Correct_Submissions}</Text>
                            <Text>Accuracy: {((question.Correct_Submissions / question.Total_Submissions) * 100).toFixed(2)}%</Text>
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            
        </Flex>
    );
};

export default QuestionComponent;
