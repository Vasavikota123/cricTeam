// Homepage dashboard Page
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // To make API call
import PlayerCard from '../components/PlayerCard';
import TeamCard from '../components/TeamCard';
import { FiMenu } from 'react-icons/fi';

const Dashboard = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [playerError, setPlayerError] = useState(null);
    const [teamError, setTeamError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/players');
                if (Array.isArray(response.data)) {
                    setPlayers(response.data.slice(-5)); // Get the latest 5 players
                } else {
                    throw new Error('Data format is not an array');
                }
            } catch (error) {
                setPlayerError('Error fetching players');
                console.error('Error fetching players:', error);
            }
        };

        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/teams');
                if (Array.isArray(response.data)) {
                    setTeams(response.data.slice(-2)); // Get the latest 2 teams
                } else {
                    throw new Error('Data format is not an array');
                }
            } catch (error) {
                setTeamError('Error fetching teams');
                console.error('Error fetching teams:', error);
            }
        };

        fetchPlayers();
        fetchTeams();
    }, []);

    // Toggle sidebar open/close
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar with sliding effect */}
            <div
                className={`fixed top-0 left-0 h-full ${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white transition-all duration-300 ease-in-out`}
            >
                <div className="flex items-center justify-between h-16 px-4">
                    <button onClick={toggleSidebar} className="text-white">
                        <FiMenu size={24} />
                    </button>
                    {sidebarOpen && (
                        <h2 className="text-lg font-bold">CricTeams</h2>
                    )}
                </div>
                {sidebarOpen && (
                    <div className="p-4">
                        <ul className="space-y-4">
                            <li>
                                <a href="/players" className="text-white hover:text-gray-400">Players</a>
                            </li>
                            <li>
                                <a href="/teams" className="text-white hover:text-gray-400">Teams</a>
                            </li>
                            <li>
                                <a href="/add-player" className="text-white hover:text-gray-400">Add Player</a>
                            </li>
                            <li>
                                <a href="/add-team" className="text-white hover:text-gray-400">Create Team</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Main content */}
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-16'} p-4`}
            >
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-secondary">Welcome to CricTeams</h1>
                    <p className="text-gray-600 mt-2">
                        CricTeams is your one-stop solution for managing and organizing cricket teams. Quickly add players, create teams, and keep track of your lineup. Enjoy the convenience and efficiency of CricTeams!
                    </p>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-4">
                        <h2 className="text-secondary text-xl font-bold mb-4">Recent Players</h2>
                        {playerError ? (
                            <p className="text-red-500">{playerError}</p>
                        ) : players.length > 0 ? (
                            players.map(player => (
                                <PlayerCard key={player._id} player={player} />
                            ))
                        ) : (
                            <p className="text-white">No recent players found.</p>
                        )}
                    </div>
                    <div className="md:w-1/2 p-4">
                        <h2 className="text-secondary text-xl font-bold mb-4">Latest Teams</h2>
                        {teamError ? (
                            <p className="text-red-500">{teamError}</p>
                        ) : teams.length > 0 ? (
                            teams.map(team => (
                                <TeamCard key={team._id} team={team} />
                            ))
                        ) : (
                            <p className="text-white">No recent teams found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
