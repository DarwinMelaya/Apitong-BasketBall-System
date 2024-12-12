const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed"],
      default: "scheduled",
    },
    homeScore: {
      type: Number,
      default: 0,
    },
    awayScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Add validation to prevent same team as home and away
gameSchema.pre("save", function (next) {
  if (this.homeTeam.toString() === this.awayTeam.toString()) {
    next(new Error("Home team and away team cannot be the same"));
  }
  next();
});

module.exports = mongoose.model("Game", gameSchema);
