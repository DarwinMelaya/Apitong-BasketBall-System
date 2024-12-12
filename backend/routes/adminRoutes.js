const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware");
const Admin = require("../models/Admin");
const Team = require("../models/Team");
const Game = require("../models/Game");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Admin login
// @route   POST /api/admin/login
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  })
);

// @desc    Create team
// @route   POST /api/admin/teams
router.post(
  "/teams",
  protect,
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    const team = await Team.create({ name });
    res.status(201).json(team);
  })
);

// @desc    Update team standings
// @route   PUT /api/admin/teams/:id
router.put(
  "/teams/:id",
  protect,
  asyncHandler(async (req, res) => {
    const { wins, losses } = req.body;
    const team = await Team.findById(req.params.id);

    if (team) {
      team.wins = wins;
      team.losses = losses;
      const updatedTeam = await team.save();
      res.json(updatedTeam);
    } else {
      res.status(404);
      throw new Error("Team not found");
    }
  })
);

// @desc    Create game schedule
// @route   POST /api/admin/games
router.post(
  "/games",
  protect,
  asyncHandler(async (req, res) => {
    const { homeTeam, awayTeam, date, time, venue } = req.body;
    const game = await Game.create({
      homeTeam,
      awayTeam,
      date,
      time,
      venue,
    });
    res.status(201).json(game);
  })
);

// @desc    Update game score
// @route   PUT /api/admin/games/:id/score
router.put(
  "/games/:id/score",
  protect,
  asyncHandler(async (req, res) => {
    const { homeScore, awayScore } = req.body;
    const game = await Game.findById(req.params.id);

    if (game) {
      game.homeScore = homeScore;
      game.awayScore = awayScore;
      game.status = "completed";

      // Update team standings
      const homeTeam = await Team.findById(game.homeTeam);
      const awayTeam = await Team.findById(game.awayTeam);

      if (homeScore > awayScore) {
        homeTeam.wins += 1;
        awayTeam.losses += 1;
      } else {
        awayTeam.wins += 1;
        homeTeam.losses += 1;
      }

      await Promise.all([homeTeam.save(), awayTeam.save(), game.save()]);

      res.json(game);
    } else {
      res.status(404);
      throw new Error("Game not found");
    }
  })
);

module.exports = router;
