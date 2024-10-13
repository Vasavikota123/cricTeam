//
import React, { useState, useEffect } from 'react';
import axios from 'axios';// axios is used to make an API call to server

const TeamForm = () => {
    const [team, setTeam] = useState({ teamName: '' }); // Changed to 'teamName'
    const [allPlayers, setAllPlayers] = useState([]); // Players available for selection
    const [selectedPlayers, setSelectedPlayers] = useState([]); // Players added to the team
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/players');
                if (Array.isArray(response.data)) {
                    setAllPlayers(response.data); // Set all players if data is an array
                } else {
                    throw new Error('Unexpected data format: players should be an array');
                }
            } catch (error) {
                setError('Error fetching players');
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, []);

    const handleChange = (e) => {
        setTeam({ ...team, [e.target.name]: e.target.value });
    };

    const handleAddPlayer = (player) => {
        if (!selectedPlayers.find(p => p._id === player._id)) {
            setSelectedPlayers([...selectedPlayers, player]);
            setAllPlayers(allPlayers.filter(p => p._id !== player._id));
        }
    };

    const handleRemovePlayer = (player) => {
        setSelectedPlayers(selectedPlayers.filter(p => p._id !== player._id));
        setAllPlayers([...allPlayers, player]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!team.teamName || !team.teamName.trim()) { // Changed to 'teamName'
            setFormError('Team name is required');
            return;
        }

        if (selectedPlayers.length < 11) {
            setFormError('You must select at least 11 unique players');
            return;
        }

        // Prepared the data to send to the server
        const teamData = {
            teamName: team.teamName.trim(),
            players: selectedPlayers.map(player => ({ playerId: player._id }))
        };

        try {
            await axios.post('http://localhost:3000/api/teams', teamData);
            alert('Team created successfully');
            // Reset the form
            setTeam({ teamName: '' });
            setSelectedPlayers([]);
            setFormError('');
            setError(null);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(`Error: ${error.response.data.error}`);
            } else {
                setError('Error creating team. Please try again.');
            }
            console.error('Error creating team:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-accent1 p-4 rounded-lg shadow-md text-white">
            <div className="mb-4">
                <label htmlFor="teamName" className="block text-secondary">Team Name</label>
                <input
                    type="text"
                    name="teamName"
                    id="teamName"
                    value={team.teamName} 
                    onChange={handleChange}
                    placeholder="Enter team name"
                    className="w-full mb-2 p-2 text-primary bg-white rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-secondary">Add Players</label>
                <div className="flex flex-wrap">
                    {allPlayers.length > 0 ? (
                        allPlayers.map(player => (
                            <button
                                key={player._id}
                                type="button"
                                onClick={() => handleAddPlayer(player)}
                                className="bg-secondary text-white px-2 py-1 rounded-lg m-2"
                            >
                                {player.name}
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-300">No available players</p>
                    )}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-secondary">Selected Players (Click to remove)</label>
                <div className="flex flex-wrap">
                    {selectedPlayers.length > 0 ? (
                        selectedPlayers.map(player => (
                            <button
                                key={player._id}
                                type="button"
                                onClick={() => handleRemovePlayer(player)}
                                className="bg-primary text-white px-2 py-1 rounded-lg m-2"
                            >
                                {player.name}
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-300">No players selected</p>
                    )}
                </div>
            </div>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button type="submit" className="bg-secondary text-white px-4 py-2 rounded-lg">Create Team</button>
        </form>
    );
};

export default TeamForm;
