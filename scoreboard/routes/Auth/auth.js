const express = require("express");
const passport = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const User = requite("../../models/User");

const uploadCloud = require("../../config/cloudinary");

const bcryptSalt = 10;

//USER SIGN UP ROUTE //

router.post("/signup", (req, res, next) => {
  console.log("USER SIGN UP ROUTE IS BEIGN HIT");

  console.log(`REQUEST BODY : ${req.body}`);
  const { username, password, firstName, lastName, position, jerseyNumber } = req.body;


});
