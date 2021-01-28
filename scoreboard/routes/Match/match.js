
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
const Match = require('../../models/Match')



// ADD MATCH ROUTE 
router.get('/add',(req,res,next) => {
 console.log('ADD MATCH ROUTE HAS BEEN HIT');
 if (req.isAuthenticated()) {
  console.log('THE USER INPTUING THE MATCH : ', req.user);
}
const username = req.user.username;

 const {
  finalScore,
  matchOneWinner,
  matchTwoWinner,
  matchThreeWinner,

} = req.body;


})

module.exports = router;