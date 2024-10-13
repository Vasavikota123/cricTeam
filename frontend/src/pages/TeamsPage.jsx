// Page that has team details
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamCard from '../components/TeamCard';
import { Link } from 'react-router-dom';

const TeamsPage = () => {
    const [teams, setTeams] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/teams'); // passed url to fetch details from server
                if (Array.isArray(response.data)) {
                    setTeams(response.data); // Set teams if data is an array
                } else {
                    throw new Error('Unexpected data format: teams should be an array');
                }
            } catch (error) {
                setError('Error fetching teams');
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-secondary text-2xl font-bold">Teams</h2>
                <Link to="/add-team" className="bg-secondary text-white px-4 py-2 rounded-lg">Create Team</Link>
            </div>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {teams.length > 0 ? (
                        teams.map(team => (
                            <TeamCard key={team._id} team={team} />
                        ))
                    ) : (
                        <p className="text-white">No teams found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TeamsPage;
