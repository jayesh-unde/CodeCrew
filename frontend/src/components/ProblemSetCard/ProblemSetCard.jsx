import React from 'react';
import classes from './ProblemSetCard.module.css';
import Button from '../Button';
import CodeIcon from '@mui/icons-material/Code'; // Ensure this import is correct
import { Link } from 'react-router-dom'; // Ensure this import is correct

const ProblemSetCard = ({ question, solved }) => {
    // Convert the first letter of each difficulty level to uppercase
    const difficultyClass = question.Difficulty.toLowerCase();

    return (
        <div className={classes.Card}>
            <div className={classes.left}>
                <div className={classes.questionName}>
                    {question.Title}
                </div>
                <div className={`${classes.level} ${classes[difficultyClass]}`}>
                    {question.Difficulty}
                </div>
            </div>
            <div className={classes.mid}>
                <div className={classes.succ}>
                    {question.Total_Submissions === 0 
                        ? '0% Success' 
                        : `${((question.Correct_Submissions / question.Total_Submissions) * 100).toFixed(2)}% Success`}
                </div>
            </div>
            <div className={classes.right}>
                <Link to={`/questions/${question._id}`} className={classes.buttonContent}>
                    <Button color='white'>
                        {solved ? "Solved" : "Solve"}
                        <CodeIcon fontSize='large' style={{ marginLeft: '0.5em' }} />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ProblemSetCard;