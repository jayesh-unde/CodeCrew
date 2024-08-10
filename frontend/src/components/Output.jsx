import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../http";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [consoleError,setConsoleError] = useState('');
  const [inputValue, setInputValue] = useState('');

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      console.log(inputValue);
      const result = await executeCode(language, sourceCode, inputValue);
      console.log(result);
      setOutput(result.data.output.split("\n"));
      // setOutput(result);
      setConsoleError(undefined);

    } catch (error) {
      console.log(error);
      console.log(error.response.data.error);
      if(error.response){
        let cleanedTraceback = error.response.data.error;
        let traceback = cleanedTraceback.replace(/"[^"]*"/g, " ");
        traceback = traceback.split("\n");
        setConsoleError(traceback);
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
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Input
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      
      <Box
        height="25vh"
        p={2}
        overflowY="auto"
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        <div>
            <textarea
              id="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{padding:"10px",width:"100%",height:"100%",resize:"none"}}
              rows={6}
            />
          </div>
      </Box>
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      
      <Box
        height="45vh"
        p={2}
        overflowY="auto"
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 
          consoleError? 
            <>
            <Text color="red.400" fontSize="sm" mt={2}>Error Occured</Text>
            <Text color="red.400" fontSize="sm" mt={2}>{consoleError.map((line, i) => <Text key={i}>{line}</Text>)}</Text>
            </>
          : 'Click "Run Code" to see the output here'
          }
      </Box>
    </Box>
  );
};
export default Output;