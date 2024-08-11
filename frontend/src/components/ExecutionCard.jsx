import React from 'react';
import { Box, Text, VStack, HStack, Divider, Code, useColorModeValue } from '@chakra-ui/react';

const ExecutionCard = ({status,output}) => {
  // console.log("execution Card ", consoleError, runOutput, submitOutput)
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const time_taken = output.time_taken;
  const memory = output.memory_used;
  console.log(output);

  return (
    <Box 
      bg={bgColor} 
      color={textColor}
      p={4} 
      rounded="md" 
      boxShadow="md" 
      width="100%" 
      padding="20px"
      border="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.700")}
    > 
    {
    
    <div>
      <Text fontWeight="bold" mb={4} bg={useColorModeValue("gray.300", "gray.700")} p={2} rounded="md">
        {status==true ? <span>Status - Successfully executed</span> : <span>Status - Failed on some test cases</span>}
      </Text>
      
      <VStack align="stretch" spacing={2} style={{padding:"0px 20px"}}>
        <HStack justify="space-between">
          <Text>Time:</Text>
          <Text>{time_taken.toFixed(2)} mili secs</Text>
        </HStack>
        <HStack justify="space-between">
          <Text>Memory:</Text>
          <Text>{memory.toFixed(2)} KB</Text>
        </HStack>
      </VStack>
      
      {/* <Divider my={4} /> */}

      {/* <Text fontWeight="bold" mb={2}>Sample Input</Text>
      <Code 
        p={2} 
        bg={useColorModeValue("gray.200", "gray.700")} 
        color={textColor}
        rounded="md"
        display="block"
        whiteSpace="pre-wrap"
      >
        5 1 4
      </Code>

      <Text fontWeight="bold" mt={4} mb={2}>Your Output</Text>
      <Code 
        p={2} 
        bg={useColorModeValue("gray.200", "gray.700")} 
        color={textColor}
        rounded="md"
        display="block"
        whiteSpace="pre-wrap"
      >
        0
      </Code> */}
      </div>}



    </Box>
    
  );
};

export default ExecutionCard;
