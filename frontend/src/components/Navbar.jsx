// Create this component to put the options on Navbar
import React from 'react';

const Navbar = () => {
    return (
        <div className="bg-primary text-white px-4 py-2 flex justify-between items-center">
            <div className="px-20 text-lg font-bold">CricTeams</div>
            <div className="space-x-4">
                <a href="/" className="hover:text-secondary">Home</a>
                <a href="/players" className="hover:text-secondary">Players</a>
                <a href="/teams" className="hover:text-secondary">Teams</a>
            </div>
        </div>
    );
};

export default Navbar;
