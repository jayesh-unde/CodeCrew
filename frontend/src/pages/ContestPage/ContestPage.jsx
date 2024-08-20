import React, { useState, useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getAllContest} from '../../http' // Ensure the path is correct for your project
import './ContestPage.css';
import Navbar from '../../components/Navbar';

const ContestPage = () => {
    const [activeTab, setActiveTab] = useState('ongoing');
    const [contests, setContests] = useState({ past: [], ongoing: [], upcoming: [] });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch contests when the component mounts
        getAllContest()
            .then(response => {
                const allContests = response.data.contests;
                const now = Date.now();

                const past = allContests.filter(contest => new Date(contest.EndTime).getTime() < now);
                const ongoing = allContests.filter(contest => 
                    new Date(contest.StartTime).getTime() <= now && new Date(contest.EndTime).getTime() >= now
                );
                const upcoming = allContests.filter(contest => new Date(contest.StartTime).getTime() > now);

                setContests({ past, ongoing, upcoming });
            })
            .catch(error => {
                console.error("Failed to fetch contests", error);
            });
    }, []);

    const renderContests = () => {
        switch (activeTab) {
            case 'past':
                return <PastContests contests={contests.past} />;
            case 'ongoing':
                return <OngoingContests contests={contests.ongoing} />;
            case 'upcoming':
                return <UpcomingContests contests={contests.upcoming} />;
            default:
                return null;
        }
    };

    const handleCreateContestClick = () => {
        navigate('/createcontest'); // Navigate to the create contest page
    };

    return (
        <><Navbar/>
        <div className="contestPage">
            <div className="tabs">
                <div
                    className={activeTab === 'past' ? 'tab active' : 'tab'}
                    onClick={() => setActiveTab('past')}
                >
                    Past Contests
                </div>
                <div
                    className={activeTab === 'ongoing' ? 'tab active' : 'tab'}
                    onClick={() => setActiveTab('ongoing')}
                >
                    Ongoing Contests
                </div>
                <div
                    className={activeTab === 'upcoming' ? 'tab active' : 'tab'}
                    onClick={() => setActiveTab('upcoming')}
                >
                    Upcoming Contests
                </div>
            </div>
            <div className="contestContent">
                {renderContests()}
            </div>
            <button onClick={handleCreateContestClick} className="createContestButton">Create Contest</button>
        </div>
        </>
    );
};

const ContestRow = ({ code, name, start, duration, status }) => {
    const navigate = useNavigate();

    const handleContestClick = () => {
        if (status === 'ongoing') {
            navigate(`/contestrules/${code}`);
        }
    };

    return (
        <div
            className="contestRow"
            onClick={handleContestClick}
            style={{ cursor: status === 'ongoing' ? 'pointer' : 'default', opacity: status === 'ongoing' ? 1 : 0.6 }}
        >
            <div className="rowItem">{code}</div>
            <div className="rowItem">{name}</div>
            <div className="rowItem">{start}</div>
            <div className="rowItem">{duration}</div>
            <div className="rowItem">
                {status === 'past' ? (
                    <button className="leaderboardButton" onClick={() => navigate(`/leaderboard/${code}`)}>Leaderboard</button>
                ) : (
                    formatDistanceToNow(parseISO(start), { addSuffix: true })
                )}
            </div>
        </div>
    );
};


const PastContests = ({ contests }) => (
    <div className="contestTable">
        <div className="contestTableHeader">
            <div className="headerItem">Code</div>
            <div className="headerItem">Name</div>
            <div className="headerItem">Start</div>
            <div className="headerItem">Duration</div>
            <div className="headerItem">
                <button className="leaderboardButton">Leaderboard</button>
            </div>
        </div>
        <div className="contestTableBody">
            {contests.map((contest) => (
                <ContestRow
                    key={contest._id}
                    code={contest._id} // Assuming _id as the unique code
                    name={contest.Title}
                    start={new Date(contest.StartTime).toLocaleString()}
                    duration={`${Math.ceil((new Date(contest.EndTime) - new Date(contest.StartTime)) / (1000 * 60 * 60))} Hrs`}
                    status="past"
                />
            ))}
        </div>
    </div>
);

const OngoingContests = ({ contests }) => (
    <div className="contestTable">
        <div className="contestTableHeader">
            <div className="headerItem">Code</div>
            <div className="headerItem">Name</div>
            <div className="headerItem">Start</div>
            <div className="headerItem">Duration</div>
            <div className="headerItem">Starts In</div>
        </div>
        <div className="contestTableBody">
            {contests.map((contest) => (
                <ContestRow
                    key={contest._id}
                    code={contest._id} // Assuming _id as the unique code
                    name={contest.Title}
                    start={new Date(contest.StartTime).toISOString()}
                    duration={`${Math.ceil((new Date(contest.EndTime) - new Date(contest.StartTime)) / (1000 * 60 * 60))} Hrs`}
                    status="ongoing"
                />
            ))}
        </div>
    </div>
);

const UpcomingContests = ({ contests }) => (
    <div className="contestTable">
        <div className="contestTableHeader">
            <div className="headerItem">Code</div>
            <div className="headerItem">Name</div>
            <div className="headerItem">Start</div>
            <div className="headerItem">Duration</div>
            <div className="headerItem">Starts In</div>
        </div>
        <div className="contestTableBody">
            {contests.map((contest) => (
                <ContestRow
                    key={contest._id}
                    code={contest._id} // Assuming _id as the unique code
                    name={contest.Title}
                    start={new Date(contest.StartTime).toISOString()}
                    duration={`${Math.ceil((new Date(contest.EndTime) - new Date(contest.StartTime)) / (1000 * 60 * 60))} Hrs`}
                    status="upcoming"
                />
            ))}
        </div>
    </div>
);

export default ContestPage;
