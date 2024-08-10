import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Navbar = () => {
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle navigation
    const handleNavigate = (path) => {
        navigate(`/${path}`);
    };

    return (
        <>
            <div className="navbar">
                <div className="navbar-first-container">
                    <img src="/public/images/code.png" className="logo-image" alt=""/>
                    <span className="logo" onClick={() => handleNavigate('')}>CodeCrew</span>
                </div>
                <div className="navbar-second-container">
                    <h3 className="title" onClick={() => handleNavigate('playground')}>Playground</h3>
                    <h3 className="title" onClick={() => handleNavigate('arena')}>Arena</h3>
                    <h3 className="title" onClick={() => handleNavigate('battleground')}>Battleground</h3>
                    {/* <h3 className="title">Online IDE Platform</h3> No navigation for this item */}
                </div>
            </div>
            <hr className="rule" />
        </>
    );
};

export default Navbar;
