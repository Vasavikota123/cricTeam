// Page that has players details
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerCard from '../components/PlayerCard';
import { Link } from 'react-router-dom';

const PlayersPage = () => {
    const [players, setPlayers] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/players'); // URL to get details from server
                if (Array.isArray(response.data)) {
                    setPlayers(response.data); // Set players if data is an array
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

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-secondary text-2xl font-bold">Players</h2>
                <Link to="/add-player" className="bg-secondary text-white px-4 py-2 rounded-lg">Add Player</Link>
            </div>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {players.length > 0 ? (
                        players.map(player => (
                            <PlayerCard key={player._id} player={player} />
                        ))
                    ) : (
                        <p className="text-white">No players found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PlayersPage;
