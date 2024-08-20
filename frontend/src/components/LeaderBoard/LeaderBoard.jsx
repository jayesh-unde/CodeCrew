import React, { useEffect, useState } from 'react';
import './LeaderBoard.css';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const Leaderboard = () => {
  const location = useLocation();
  const [leaderboard, setLeaderboard] = useState(location.state?.leaderboard || []);
  const persistentId = location.state?.persistentId; // Retrieve the persistentId from state

  useEffect(() => {
    const socket = io('http://localhost:5500'); // Ensure the port matches your backend server

    // Request current leaderboard data on component mount
    socket.emit('request_leaderboard');
    
    // Listen for the updated leaderboard
    socket.on('update_leaderboard', (data) => {
      setLeaderboard(data.users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Ensure leaderboard data is always available and sorted
  const sortedData = leaderboard.sort((a, b) => {
    if (b.score === a.score) {
      return new Date(a.lastSubmit) - new Date(b.lastSubmit); // Earlier submission wins in case of a tie
    }
    return b.score - a.score;
  });

  return (
    <div className="leaderboard">
      <h1 className="leaderboard-title">Ranking of Weekly Contest 409</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Finish Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((user, index) => (
              <tr 
                key={user.userId || index} 
                className={user.userId === persistentId ? 'highlight-row' : ''}
              >
                <td>{index + 1}</td>
                <td>{user.userId}</td> {/* This should display the correct persistentId */}
                <td>{user.score}</td>
                <td>{user.lastSubmit ? new Date(user.lastSubmit).toLocaleTimeString() : 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No users to display</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
