import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getContest} from '../../http' // Import the getContest function
import './ContestRules.css';

const ContestRules = () => {
  const { _id } = useParams(); // Get the contest ID from the URL params
  const [contest, setContest] = useState(null);
  const [contestQuestions, setContestQuestions] = useState(null);
  const [endTime,setEndTime] = useState(null); // State to store contest details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  
  useEffect(() => {
    // Function to fetch contest data by ID
    const fetchContest = async () => {
      try {
        console.log(_id);
        const data = await getContest(_id);
         // Call getContest with the contest ID
        setContest(data.data);
        setContestQuestions(data.data.Questions);
        setEndTime(data.data.EndTime);
      } catch (err) {
        setError('Failed to load contest details');
      } finally {
        setLoading(false);
      }
    };

    fetchContest(); // Call the function to fetch contest data
  }, [_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!contest) {
    return <div>Contest not found</div>;
  }
  const handleQuestionClick = (index) => {
    navigate(`/contest/${_id}/question/${index}`, { state: { contestQuestions,endTime } });
  };
  return (
    <div className="container">
      <div className="header">
        <h1>{contest.Title}</h1>
      </div>
      
      <div className="content">
        <h2>Welcome to the {contest.Title}</h2>
        <p>{contest.description}</p>
        <p><strong>Register for the contest in advance and fill out the survey to be selected for an interview with CodeCrew!!</strong></p>
        <p>You can fill out the contact information at the registration step. CodeCrew may reach out to eligible contest winners for an interview opportunity with CodeCrew.</p>

        <div className="important-note">
          <h3>Important Note</h3>
          <p>1. To provide a better contest and ensure fairness, we listened to CodeCrewrs' feedback and put in lots of thoughts behind the updated contest rule. Please check out our new contest rule which covers more scenarios with details explained.</p>
          <p>2. The penalty time of 5 minutes will be applied for each wrong submission.</p>
          <p>3. To ensure the fairness of the contest, CodeCrew will hide some test cases during the contest. When users submit incorrect submissions, CodeCrew will not show the hidden test cases to the users.</p>
          <p>4. The final rating of this contest will be updated within 5 working days after the contest.</p>
        </div>
              
        <h2>Problem List</h2>
        <ul className="problem-list">
          {contest.Questions.map((question, index) => (
            <li key={question._id} onClick={() => handleQuestionClick(index)}>
              {question.Title} <span className="score">{question.Points}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContestRules;
