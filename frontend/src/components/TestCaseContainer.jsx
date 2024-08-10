import React from 'react'
import { Box, VStack, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Text, Stat, StatLabel, StatNumber, StatGroup, StatHelpText, HStack } from '@chakra-ui/react';

function TestCaseContainer({question}) {
  return (
    <Flex direction="column" height="100vh" bg="brand.200">
            <Tabs variant="enclosed" isFitted>
                <TabList>
                    <Tab>Test Cases</Tab>
                    <Tab>Test Cases Result</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <VStack align="stretch" p={4} spacing={4} overflowY="auto">
                            Test case area
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <VStack p={4} spacing={4}>
                            Test case result area
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            
        </Flex>
  )
}

export default TestCaseContainer