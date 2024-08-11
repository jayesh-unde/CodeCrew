import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlayGround from "./pages/PlayGround/PlayGround";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import QuestionUpload from "./pages/QuestionUpload/QuestionUpload";
import CreateContest from "./pages/CreateContest/CreateContest";
import Arena from "./pages/Arena/Arena";
import Leaderboard from "./components/LeaderBoard/LeaderBoard";
import "./index.css";
// In your main component or App.js
import "react-datepicker/dist/react-datepicker.css";
import ContestPage from "./pages/ContestPage/ContestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<PlayGround />} />
        <Route path="/question/:_id" element={<QuestionPage />} />
        <Route path="/questionupload" element={<QuestionUpload />} />
        <Route path="/createcontest" element={<CreateContest />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/battleground" element={<ContestPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;