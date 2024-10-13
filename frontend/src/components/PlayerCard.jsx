// Created this component for to display the details of players
import React from 'react';

const PlayerCard = ({ player }) => {
    return (
        <div className="bg-accent2 text-white rounded-lg p-4 mb-4 shadow-md">
            <h2 className="text-lg font-bold">{player.name}</h2>
            <p>Age: {player.age}</p>
            <p>Role: {player.role}</p>
            <p>Matches: {player.matches}</p>
            <p>Average Score: {player.average_score}</p>
        </div>
    );
};

export default PlayerCard;
