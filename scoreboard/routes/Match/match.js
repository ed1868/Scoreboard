const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");

const bcryptSalt = 10;
const passportRouter = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const router = express.Router();

const User = require("../../models/User");
const Match = require("../../models/Match");

// ADD MATCH ROUTE
router.post("/add", (req, res, next) => {
  console.log("ADD MATCH ROUTE HAS BEEN HIT");
  if (req.isAuthenticated()) {
    console.log("THE USER INPTUING THE MATCH : ", req.user);
  }
  const username = req.user._id;

  const {
    finalScore,
    matchOneWinner,
    matchTwoWinner,
    matchThreeWinner,
  } = req.body;

  if (finalScore == "yes") {
    let newScore = Number(req.user.score) + 1;
    const newMatch = new Match({
      username: username,
      finalScore: newScore,
      matchOneWinner,
      matchTwoWinner,
      matchThreeWinner,
    });
    console.log("NEW USER SCORE: ", newScore);
    User.findByIdAndUpdate(
      username,
      { score: `${newScore}` },
      (err, editedUser) => {
        if (err) {
          console.log("THERE HAS BEEN AN ERROR UPDATING THE USER : ", err);
        }
        console.log("UPDATED USER : ", editedUser);
        return editedUser;
      }
    ).then((newUser) => {
      console.log(`NEW USER : ${newUser}`);
      Match.create(newMatch)
        .then((savedMatch) => {
          console.log("----SAVED match -----");
          res.status(200).json(savedMatch);
        })
        .catch((err) => {
          console.log("ERROR: ", err);
          res.status(500).json({ message: "SOMETHING WENT WRONG ", err });
        });
    });
  }

  
});

module.exports = router;
