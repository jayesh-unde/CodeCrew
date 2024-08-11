import { Box, VStack, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Text, Stat, StatLabel, StatNumber, StatGroup, StatHelpText, HStack } from '@chakra-ui/react';

const QuestionComponent = ({ question }) => {
    console.log(question);
    return (
        <Flex direction="column" height="100vh" bg="brand.200">
            <Tabs variant="enclosed" isFitted>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Submissions</Tab>
                </TabList>
                <TabPanels bg="brand.200">
                    <TabPanel>
                        <VStack align="stretch" p={4} spacing={4} overflowY="auto">
                            <Text fontSize="2xl" fontWeight="bold">{question.Title}</Text>
                            <Text mt={2} color="white" >
                                <span  dangerouslySetInnerHTML={{ __html: question.Description }} />
                            </Text>
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
