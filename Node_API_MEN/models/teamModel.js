// Team Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName: { type: String, required: true }, // Ensure it is 'teamName'
    players: [{
        playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
        role: { type: String }
    }]
});

module.exports = mongoose.model('Team', teamSchema);
