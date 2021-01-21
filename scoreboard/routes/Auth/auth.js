
const express        = require('express');
const bcrypt         = require('bcrypt');
const path           = require('path');


const bcryptSalt     = 10;
const passportRouter = express.Router();
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const router = express.Router();

const User = require("../../models/User");

const uploadCloud = require("../../config/cloudinary");


//USER SIGN UP ROUTE //

router.post("/signup", (req, res, next) => {
  console.log("USER SIGN UP ROUTE IS BEIGN HIT");
console.log(req)

  const {
    username,
    password,
    firstName,
    lastName,
    position,
    jerseyNumber,
  } = req.body;

  // const url = req.file.url;
console.log(Object.values(req.body));
  const encryptThis = password;

  console.log('ENCRYPT THIS SHIT : ', encryptThis)

  if (username === "" || password === "") {
    res.json({ message: "YOU MUST PROVIDE VALID CREDENTIALS " });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user != null) {
      return res.json({ message: "This Username Already exists!" });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    console.log('PASSWORD : ', hashPass);
    console.log('SALT : ', salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      // url,
      lastName,
      firstName,
      jerseyNumber,
      position,
    });

    console.log(`NEW USER : ${newUser}`);

    User.create(newUser)
      .then((savedUser) => {
        console.log("----SAVED USER -----");
        res.status(200).json(savedUser);
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        res.status(500).json({ message: "SOMETHING WENT WRONG ", err });
      });
  });
});

module.exports = router;
