// Form to fill the players
import React, { useState } from 'react';
import axios from 'axios'; //axios is used to make an API call to server

const PlayerForm = () => {
    const [player, setPlayer] = useState({ name: '', age: '', role: '', matches: '', average_score: '' });
    const [errors, setErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        if (!player.name) newErrors.name = 'Name is required';
        if (!player.age || player.age < 0) newErrors.age = 'Age must be a positive number';
        if (!player.role) newErrors.role = 'Role is required';
        if (!player.matches || player.matches < 0) newErrors.matches = 'Matches must be a positive number';
        if (!player.average_score || player.average_score < 0) newErrors.average_score = 'Average score must be a positive number';
        return newErrors;
    };

    const handleChange = (e) => {
        setPlayer({ ...player, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        console.log('Submitting player:', player);

        try {
            const response = await axios.post('http://localhost:3000/api/players', player);
            alert('Player added successfully');
            console.log('Response:', response.data);
            setPlayer({ name: '', age: '', role: '', matches: '', average_score: '' });
            setErrors({});
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            alert('Error adding player');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#96adcf] p-4">
            <div className="bg-[#6e7888] p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-[#6a4e56]">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#1f2937]">Add Player</h2>
                <form onSubmit={handleSubmit} className="text-[#6e7888]">
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium text-[#1f2937]">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={player.name}
                            onChange={handleChange}
                            placeholder="Enter player's name"
                            className="w-full mb-2 p-3 bg-[#6e7888] text-white border-2 border-[#1f2937] rounded focus:outline-none focus:ring-2 focus:ring-[#96adcf]"
                        />
                        {errors.name && <p className="text-white">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="age" className="block font-medium text-[#1f2937]">Age</label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            value={player.age}
                            onChange={handleChange}
                            placeholder="Enter player's age"
                            className="w-full mb-2 p-3 bg-[#6e7888] text-white border-2 border-[#1f2937] rounded focus:outline-none focus:ring-2 focus:ring-[#96adcf]"
                        />
                        {errors.age && <p className="text-red-500">{errors.age}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block font-medium text-[#1f2937]">Role</label>
                        <select
                            name="role"
                            id="role"
                            value={player.role}
                            onChange={handleChange}
                            className="w-full mb-2 p-3 bg-[#6e7888] text-white border-2 border-[#1f2937] rounded focus:outline-none focus:ring-2 focus:ring-[#96adcf]"
                        >
                            <option value="">Select Role</option>
                            <option value="Batsman">Batsman</option>
                            <option value="Bowler">Bowler</option>
                            <option value="Allrounder">Allrounder</option>
                            <option value="WicketKeeper">WicketKeeper</option>
                        </select>
                        {errors.role && <p className="text-red-500">{errors.role}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="matches" className="block font-medium text-[#1f2937]">Matches</label>
                        <input
                            type="number"
                            name="matches"
                            id="matches"
                            value={player.matches}
                            onChange={handleChange}
                            placeholder="Enter number of matches"
                            className="w-full mb-2 p-3 bg-[#6e7888] text-white border-2 border-[#1f2937] rounded focus:outline-none focus:ring-2 focus:ring-[#96adcf]"
                        />
                        {errors.matches && <p className="text-red-500">{errors.matches}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="average_score" className="block font-medium text-[#1f2937]">Average Score</label>
                        <input
                            type="number"
                            name="average_score"
                            id="average_score"
                            value={player.average_score}
                            onChange={handleChange}
                            placeholder="Enter average score"
                            className="w-full mb-2 p-3 bg-[#6e7888] text-white border-2 border-[#1f2937] rounded focus:outline-none focus:ring-2 focus:ring-[#96adcf]"
                        />
                        {errors.average_score && <p className="text-red-500">{errors.average_score}</p>}
                    </div>

                    <button type="submit" className="bg-[#6a4e56] text-white px-6 py-3 rounded-lg w-full hover:bg-[#96adcf] transition-colors duration-300">Add Player</button>
                </form>
            </div>
        </div>
    );
};

export default PlayerForm;
