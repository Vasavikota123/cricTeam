// List of the teams created
import React from 'react';

const TeamCard = ({ team }) => {
    return (
        <div className="bg-accent3 text-white rounded-lg p-4 mb-4 shadow-md">
            <h2 className="text-lg font-bold">{team.teamName}</h2>
            <ul className="mt-2">
                {team.players.map((player, index) => (
                    <li key={index}>
                        {player.playerId.name} - {player.playerId.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamCard;
