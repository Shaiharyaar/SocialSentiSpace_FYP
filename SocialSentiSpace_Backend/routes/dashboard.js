var express = require("express");
const { create } = require("../models/Twitter");
var dashboardrouter = express.Router();
const Twitter = require("../models/Twitter");
const Result = require("../models/Result");

const varLatesttweet = require("../models/Latest_tweet");
const Latest_tweet = require("../models/Latest_tweet");

const FbDetails = require("../models/FbPostDetail");
const Facebook = require("../models/Facebook");

const InstaDetails = require("../models/latestInstaPost");
const Instagram = require("../models/Instagram");

const YoutubeDetails = require("../models/VideoDetail");
const Youtube = require("../models/Youtube");
const VideoDetail = require("../models/VideoDetail");

dashboardrouter.post("/setResult", (req, res, next) => {
  Result.create(req.body).then((result) => {
    console.log(result);
  });
});

dashboardrouter.post("/setLatestTweet", (req, res, next) => {
  Latest_tweet.create(req.body).then((latesttweet) => {
    console.log(latesttweet);
  });
});

dashboardrouter.post("/setTwitter", (req, res, next) => {
  Twitter.create(req.body).then((twitter) => {
    console.log(twitter);
  });
});

dashboardrouter.get("/getTwitter", function (req, res, next) {
  Twitter.find({})
    .populate("Result")
    .populate("LatestTweet")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Loading Twitter Successful!",
        result: results[0],
      });
    });
});

dashboardrouter.post("/setVideodetails", (req, res, next) => {
  VideoDetail.create(req.body).then((detail) => {
    res.json(detail);
  });
});
dashboardrouter.post("/setYoutube", (req, res, next) => {
  Youtube.create(req.body).then((youtube) => {
    res.json(youtube);
  });
});
dashboardrouter.get("/getYoutube", function (req, res, next) {
  Youtube.find({})
    .populate("Result")
    .populate("VideoDetail")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Loading Youtube Successful!",
        result: results[0],
      });
    });
});

dashboardrouter.post("/setInstaDetails", (req, res, next) => {
  InstaDetails.create(req.body).then((detail) => {
    res.json(detail);
  });
});
dashboardrouter.post("/setInstagram", (req, res, next) => {
  Instagram.create(req.body).then((instagram) => {
    res.json(instagram);
  });
});
dashboardrouter.get("/getInstagram", function (req, res, next) {
  Instagram.find({})
    .populate("Result")
    .populate("latestPost")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Loading Instagram Successful!",
        result: results[0],
      });
    });
});

dashboardrouter.post("/setfbDetails", (req, res, next) => {
  FbDetails.create(req.body).then((detail) => {
    res.json(detail);
  });
});
dashboardrouter.post("/setFacebook", (req, res, next) => {
  Facebook.create(req.body).then((facebook) => {
    res.json(facebook);
  });
});
dashboardrouter.get("/getFacebook", function (req, res, next) {
  Facebook.find({})
    .populate("Result")
    .populate("postDetail")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Loading Facebook Successful!",
        result: results[0],
      });
    });
});

module.exports = dashboardrouter;
