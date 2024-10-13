// Sidebar that navigates to several functions like PlayerList, Creating Player, Creating Team etc
import React from 'react';

const Sidebar = () => {
    return (
        <div className="bg-accent1 h-full p-4 text-white w-60 hidden md:block">
            <nav>
                <ul>
                    <li className="mb-4"><a href="/" className="hover:text-secondary">Home</a></li>
                    <li className="mb-4"><a href="/players" className="hover:text-secondary">Player List</a></li>
                    <li className="mb-4"><a href="/add-player" className="hover:text-secondary">Add Player</a></li>
                    <li className="mb-4"><a href="/teams" className="hover:text-secondary">Team List</a></li>
                    <li className="mb-4"><a href="/add-team" className="hover:text-secondary">Add Team</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
