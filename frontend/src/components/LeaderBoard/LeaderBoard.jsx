// src/Leaderboard.js
import React from 'react';
import './LeaderBoard.css';

const Leaderboard = () => {
    const data = [
        { rank: 1, username: 'fjzzq2002', score: 22, finishTime: '0:33:13' },
        { rank: 2, username: 'iixre', score: 22, finishTime: '0:38:56' },
        { rank: 3, username: 'tsreaper', score: 22, finishTime: '0:39:01' },
        { rank: 4, username: 'tiger2005', score: 22, finishTime: '0:42:20' },
        { rank: 5, username: 'dong_liu', score: 22, finishTime: '0:48:08' },
        { rank: 6, username: 'py-is-best-lang', score: 22, finishTime: '0:53:27' },
        { rank: 7, username: 'PurpleCrayon', score: 22, finishTime: '0:57:37' },
        // Add more data as needed
    ];

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
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.rank}</td>
                            <td>{item.username}</td>
                            <td>{item.score}</td>
                            <td>{item.finishTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;