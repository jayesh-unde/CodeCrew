import { ChakraProvider, Box, Button, VStack, HStack, Select, extendTheme, Icon } from '@chakra-ui/react';
import { Resizable } from 're-resizable';
import theme from '../../theme';
import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../../constants";
import { MdPlayArrow, MdCloudUpload } from "react-icons/md"; // Icons for buttons
import QuestionComponent from '../../components/QuestionComponent';

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
  "TestCases": {
    "TestCase1": {
      "Input": "123",
      "Output": "321"
    },
    "TestCase2": {
      "Input": "-123",
      "Output": "-321"
    }
  }
};

const QuestionPage = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("cpp");
  const [value, setValue] = useState(CODE_SNIPPETS[language]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <ChakraProvider theme={theme} >
      <VStack spacing={4} m={2} h="calc(100vh - 4rem)" w="99%" overflowX="hidden">
        <HStack justify="center" spacing={8} w="full">
          <Button mt={4} variant="outline" colorScheme="green">Submit</Button>
          <Button mt={4} variant="outline" colorScheme="green">Run</Button>
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
              <QuestionComponent question={questionData} />
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
                <Select placeholder="Select language" onChange={(e) => { setLanguage(e.target.value); setValue(CODE_SNIPPETS[e.target.value]); }}
                  w="auto" minWidth="100px" maxWidth="200px">
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
                  />
                </Box>
              </Resizable>
              <Box h="full" p={0} bg="gray.500" overflowY="auto" w="full">
                Right Bottom Content
              </Box>
            </VStack>
          </Resizable>
        </HStack>
        
      </VStack>
    </ChakraProvider>
  );
};

export default QuestionPage;
