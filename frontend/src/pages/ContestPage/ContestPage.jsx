import React, { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import './ContestPage.css';

const ContestPage = () => {
    const [activeTab, setActiveTab] = useState('ongoing');
    const navigate = useNavigate();
    const renderContests = () => {
        switch (activeTab) {
            case 'past':
                return <PastContests />;
            case 'ongoing':
                return <OngoingContests />;
            case 'upcoming':
                return <UpcomingContests />;
            default:
                return null;
        }
    };
    const handleCreateContestClick = () => {
        navigate('/createcontest'); // Navigate to the create contest page
    };
    return (
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
            <button  onClick={handleCreateContestClick} className="createContestButton">Create Contest</button>
        </div>
    );
};

const ContestRow = ({ code, name, start, duration, status }) => (
    <div className="contestRow">
        <div className="rowItem">{code}</div>
        <div className="rowItem">{name}</div>
        <div className="rowItem">{start}</div>
        <div className="rowItem">{duration}</div>
        <div className="rowItem">
            {status === 'past' ? (
                <button className="leaderboardButton">Leaderboard</button>
            ) : (
                formatDistanceToNow(parseISO(start), { addSuffix: true })
            )}
        </div>
    </div>
);

const PastContests = () => (
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
            {/* Example past contest */}
            <ContestRow
                code="START146"
                name="Starters 146 (Rated till 5 stars)"
                start="07 Aug 2024 Wed 20:00"
                duration="2 Hrs"
                status="past"
            />
        </div>
    </div>
);

const OngoingContests = () => (
    <div className="contestTable">
        <div className="contestTableHeader">
            <div className="headerItem">Code</div>
            <div className="headerItem">Name</div>
            <div className="headerItem">Start</div>
            <div className="headerItem">Duration</div>
            <div className="headerItem">Starts In</div>
        </div>
        <div className="contestTableBody">
            {/* Example ongoing contest */}
            <ContestRow
                code="START410"
                name="Weekly Contest 410"
                start={new Date(Date.now() + 5000).toISOString()}
                duration="2 Hrs"
                status="ongoing"
            />
        </div>
    </div>
);

const UpcomingContests = () => (
    <div className="contestTable">
        <div className="contestTableHeader">
            <div className="headerItem">Code</div>
            <div className="headerItem">Name</div>
            <div className="headerItem">Start</div>
            <div className="headerItem">Duration</div>
            <div className="headerItem">Starts In</div>
        </div>
        <div className="contestTableBody">
            {/* Example upcoming contest */}
            <ContestRow
                code="START137"
                name="Biweekly Contest 137"
                start={new Date(Date.now() + 3600000).toISOString()}
                duration="2 Hrs"
                status="upcoming"
            />
        </div>
    </div>
);

export default ContestPage;
