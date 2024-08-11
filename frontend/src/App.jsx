import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlayGround from "./pages/PlayGround/PlayGround";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import QuestionUpload from "./pages/QuestionUpload/QuestionUpload";
import CreateContest from "./pages/CreateContest/CreateContest";
import Arena from "./pages/Arena/Arena";
import "./index.css";
// In your main component or App.js
import "react-datepicker/dist/react-datepicker.css";
import ContestPage from "./pages/ContestPage/ContestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
