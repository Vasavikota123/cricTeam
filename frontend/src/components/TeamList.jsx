// List of Teams Created
import React, { useState, useEffect } from 'react';
import axios from 'axios'; //axios is used to make api call to server
import TeamCard from './TeamCard';

const TeamList = () => {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('/api/teams');
                if (Array.isArray(response.data)) {
                    setTeams(response.data);
                } else {
                    throw new Error('Data format is not an array');
                }
            } catch (error) {
                setError('Error fetching teams');
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    return (
        <div>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : teams.length > 0 ? (
                teams.map(team => (
                    <TeamCard key={team._id} team={team} />
                ))
            ) : (
                <p className="text-white">No teams found.</p>
            )}
        </div>
    );
};

export default TeamList;
