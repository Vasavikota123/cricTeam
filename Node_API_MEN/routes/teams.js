// Defined Routes to create, Delete, fetch, and edit team details
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Team = require('../models/teamModel');
const Player = require('../models/playerModel');

// POST a new team
router.post("/", async (req, res) => {
    const { teamName, players } = req.body;
    try {
        const team = await Team.create({ teamName, players });
        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET all teams
router.get("/", async (req, res) => {
    try {
        const teams = await Team.find().populate('players.playerId');
        res.status(200).json(teams);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET a single team by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Team does not exist." });
        }
        const team = await Team.findById(id).populate('players.playerId');
        if (!team) {
            return res.status(404).json({ error: "Team does not exist." });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PATCH a team's information (add/remove players)
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { teamName, players } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Team does not exist." });
        }
        const team = await Team.findByIdAndUpdate(
            id,
            { teamName, players },
            { new: true }
        );
        if (!team) {
            return res.status(404).json({ error: "Team does not exist." });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a team
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Team does not exist." });
        }
        const team = await Team.findByIdAndDelete(id);
        if (!team) {
            return res.status(404).json({ error: "Team does not exist." });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
