import React from "react";

const Footer = () => {
return (

    <>
        <footer className="footer">
        <div className="footer-first-container">
            <div className="copyright">
                <p>Copyright © 2024 CodeCrew</p>
            </div>
            <div className="social-media">
                <a href="#">
                    <span className="social-media-text">Linkedin</span>
                </a>
                <span className="divider">|</span>
                <a href="#">
                    <span className="social-media-text">Twitter</span>
                </a>
                <span className="divider">|</span>
                <a href="#">
                    <span className="social-media-text">Instagram</span>
                </a>
                <span className="divider">|</span>
                <a href="#">
                    <span className="social-media-text">Github</span>
                </a>
            </div>
        </div>
        <div className="flag-container">
            <img src="/public/images/india.png" className="flag-icon" alt="" />
            <span className="country-text">India</span>
        </div>
        </footer>

    </>
);
};

export default Footer;