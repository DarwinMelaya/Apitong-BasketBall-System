const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Team = require("../models/Team");
const Game = require("../models/Game");

// @desc    Get all teams standings
// @route   GET /api/public/standings
router.get(
  "/standings",
  asyncHandler(async (req, res) => {
    const teams = await Team.find({}).sort({ winningPercentage: -1 });
    res.json(teams);
  })
);

// @desc    Get upcoming games
// @route   GET /api/public/games
router.get(
  "/games",
  asyncHandler(async (req, res) => {
    const games = await Game.find({
      date: { $gte: new Date().setHours(0, 0, 0, 0) },
    })
      .populate("homeTeam", "name wins losses")
      .populate("awayTeam", "name wins losses")
      .sort({ date: 1 });
    res.json(games);
  })
);

// @desc    Get completed games (history)
// @route   GET /api/public/games/history
router.get(
  "/games/history",
  asyncHandler(async (req, res) => {
    const games = await Game.find({
      status: "completed",
    })
      .populate("homeTeam", "name wins losses")
      .populate("awayTeam", "name wins losses")
      .sort({ date: -1 }); // Most recent first
    res.json(games);
  })
);

module.exports = router;
