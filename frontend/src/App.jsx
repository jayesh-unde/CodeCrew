import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlayGround from "./pages/PlayGround/PlayGround";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import QuestionUpload from "./pages/QuestionUpload/QuestionUpload";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<PlayGround />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/questionupload" element={<QuestionUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
