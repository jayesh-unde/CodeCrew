import React, { useState, useEffect } from 'react';
import styles from './ContestCard.module.css';
import { useNavigate } from 'react-router-dom';

const ContestCard = ({ title, date, status, contestDate }) => {
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = () => {
        if (status === 'Ongoing') {
            setShowModal(true); // Show the modal only for ongoing contests
        }
    };

   return (
        <div className={styles.mainContainer} onClick={handleCardClick}>
            <ImageBackground contestDate={contestDate} />
            <ContestInfo title={title} date={date} />
            {showModal && <UsernameModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

const calculateTimeLeft = (contestDate) => {
    const now = new Date();
    const difference = contestDate - now;

    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
};

// Modal Component
const UsernameModal = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        onClose(); // Close the modal after registration
        navigate('/contest'); // Redirect to the contest page
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <h3>Enter Your Username</h3>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className={styles.usernameInput}
                />
                <div className={styles.modalButtons}>
                    <button onClick={handleRegister} className={styles.registerButton}>Register</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const ImageBackground = ({ contestDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(contestDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(contestDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [contestDate]);

    return (
        <div className={styles.imageBackground}>
            <div className={styles.overlay}>
                <div className={styles.countdownContainer}>
                    <span className={styles.countdownText}>
                        {timeLeft.days || 0}d {timeLeft.hours || 0}h {timeLeft.minutes || 0}m {timeLeft.seconds || 0}s remaining
                    </span>
                </div>
            </div>
        </div>
    );
};

const ContestInfo = ({ title, date }) => (
    <div className={styles.contestInfo}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.dateTime}>{date}</p>
    </div>
);

export default ContestCard;
