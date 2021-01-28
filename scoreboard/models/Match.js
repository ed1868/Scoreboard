const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    finalScore: {
      type: String,
      required: true,
    },
    matchOneWinner: {
      type: String,
    },
    matchTwoWinner: {
      type: String,
    },
    matchThreeWinner: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
