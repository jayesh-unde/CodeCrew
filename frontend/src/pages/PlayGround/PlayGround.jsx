import { Box } from "@chakra-ui/react";
import CodeEditor from "../../components/CodeEditor";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
function PlayGround() {
  return (
    <>
    <Navbar/>
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <CodeEditor />
    </Box>
    <Footer/>
    </> 
    
  );
}

export default PlayGround;