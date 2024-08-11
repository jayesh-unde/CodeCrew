import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Arena.css";
import ProblemSetCard from '../../components/ProblemSetCard/ProblemSetCard';
import { getAllQuestion } from '../../http';
import { Button } from '@chakra-ui/react';

const Arena = () => {
    const [problems, setProblems] = useState([]);
    const [filterDifficulty, setFilterDifficulty] = useState('');
    const [filterTitle, setFilterTitle] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getAllQuestion();
                if (response && response.data && response.data.success) {
                    setProblems(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    const filteredProblems = problems.filter((problem) => {
        return (
            (filterDifficulty === '' || problem.Difficulty === filterDifficulty) &&
            (filterTitle === '' || problem.Title.toLowerCase().includes(filterTitle.toLowerCase()))
        );
    });

    const handleCreateQuestion = () => {
        navigate('/questionupload');
    };

    return (
        <div>
            <div className="filters">
                <label>
                    Filter by Difficulty:
                    <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
                        <option value="">All</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </label>
                <label>
                    Filter by Title:
                    <input
                        type="text"
                        value={filterTitle}
                        onChange={(e) => setFilterTitle(e.target.value)}
                        placeholder="Search by title"
                    />
                </label>
                <Button 
                    onClick={handleCreateQuestion} 
                    colorScheme="blue" 
                    style={{ color: 'white', backgroundColor: '#1A202C' }}
                >
                    Create Question
                </Button>
            </div>
            <div className="problem-set-container">
                {filteredProblems.length > 0 ? filteredProblems.map((problem, index) => (
                    <ProblemSetCard key={index} question={problem} solved={problem.Correct_Submissions > 0} />
                )) : <p>No problems found.</p>}
            </div>
        </div>
    );
};

export default Arena;