const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var passport = require("passport");
var authenticate = require("../authenticate");
// var ps = require("python-shell");
const Users = require("../models/user");
const userRouter = express.Router();
userRouter.use(bodyParser.json());
/* multer */

var multer = require("multer");
const DIR = "./public/profilePictures";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
});
//---------------------------------------------------------------------

// let options = {
//   // mode: 'text',
//   // //pythonPath: '/usr/bin/python',//only enable it if you have python installed different from default location
//   // pythonOptions: ['-u'], // get print results in real-time
//   scriptPath: "C:/Users/hp/Downloads", //Path to your python script
//   //If you want to add some variable that can be accessed in Python script by system.value1 etc
// };
// function run() {
//   ps.PythonShell.run("twitterScrape (1).py", options, function (err, results) {
//     if (err) throw err;
//     console.log(results);
//   });
// }

// show all the users

userRouter.route("/getUsers").get((req, res, next) => {
  Users.find({})
    .then(
      (users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

// Create users

userRouter.post("/signup", upload.single("image"), (req, res, next) => {
  try {
    console.log("FILE NAME: ", req.file.filename);
    Users.register(
      new Users({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        image: "http://localhost:8080/profilePictures/" + req.file.filename,
      }),
      req.body.password,
      (err, user) => {
        console.log("USER BODY: ", user);
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        } else {
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              status: "Registration Successful!",
              User: user,
            });
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are successfully logged in!",
    User: req.user,
  });
});

userRouter.post("/getuser", function (req, res) {
  var username = req.body.username;
  console.log(req.body);
  Users.findOne({ username: username }, function (err, user) {
    if (err) return res.json(400, { message: `user ${username} not found.` });

    res.json({
      success: true,
      User: user,
    });
  });
});

userRouter.post("/updatechips", function (req, res) {
  var username = req.body.username;
  var chips = req.body.chip;
  console.log(req.body);
  Users.findOneAndUpdate(
    { username: username },
    { $set: { chips: chips } },
    function (err, user) {
      if (err) return res.json(400, { message: `user ${username} not found.` });

      res.json({
        success: true,
        User: user,
      });
    }
  );
});

module.exports = userRouter;
