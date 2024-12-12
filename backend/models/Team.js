const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    winningPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate winning percentage before saving
teamSchema.pre("save", function (next) {
  const totalGames = this.wins + this.losses;
  this.winningPercentage = totalGames > 0 ? this.wins / totalGames : 0;
  next();
});

module.exports = mongoose.model("Team", teamSchema);
