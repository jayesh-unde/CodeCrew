import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home/Home';
import PlayGround from './pages/PlayGround/PlayGround';
// import Loader from './components/shared/Loader/Lader';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/playground" element={<PlayGround/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
