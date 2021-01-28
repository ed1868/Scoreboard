
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

const login = (req, user) => new Promise((resolve, reject) => {
  req.login(user, (err) => {
    console.log(user);
    if (err) {
      reject(new Error('Something went wrong'));
    } else {
      resolve(user);
    }
  });
});


//USER LOGGED IN ROUTE //

router.get('/loggedin', (req, res) => {
  console.log('THIS IS WHAT YOU ARE LOOKING FOR', req.user);
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res.status(403).json({ message: 'Unauthorized' });
});

//USER SIGN UP ROUTE //

router.post("/signup",uploadCloud.single('url'), (req, res, next) => {
  console.log("USER SIGN UP ROUTE IS BEIGN HIT");


  const {
    username,
    email,
    password,
    firstName,
    lastName,
    position,
  } = req.body;

  // const url = req.file.url;
// console.log(Object.values(req.body));
 const url = "CLOUDINARY TO BE FINISHED"
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
      url,
      lastName,
      firstName,
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


//USER LOG IN ROUTE


router.post("/login",(req,res,next) => {
    console.log('LOGIN ROUTE IS BEING HIT');
    console.log('SESSION -----> ', req.session)

    passport.authenticate('local', (err,user,info) => {
      if(err) { return next(err)}
      if(!user) {return res.json({message: 'UNAUTHORIZED BITCH'})}
      req.logIn(user, (err) => {
        if(err){return res.status(500).json({message:'ERROR WHILE LOG IN '});}
        req.session.currentUser = user;
        return res.status(200).json(req.session.currentUser);
      });
    })(req,res,next);
});


//USER LOG OUT ROUTE 


router.get('/logout',(req,res,next) => {
  req.logOut();
  res.status(200).json({message: 'You Logged Out Succesfully'})
})
module.exports = router;
