var express = require("express");
const { create } = require("../models/Twitter");
var dashboardrouter = express.Router();

const DashboardChips = require("../models/DashboardChips");

const Result = require("../models/Result");

const Twitter = require("../models/Twitter");
const Latest_tweet = require("../models/Latest_tweet");

const FbDetails = require("../models/FbPostDetail");
const Facebook = require("../models/Facebook");

const InstaDetails = require("../models/latestInstaPost");
const Instagram = require("../models/Instagram");

const Youtube = require("../models/Youtube");
const VideoDetail = require("../models/VideoDetail");

dashboardrouter.post("/setChips", (req, res, next) => {
  DashboardChips.create(req.body).then((result) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Loading chips Successful!",
      result: result,
    });
  });
});

dashboardrouter.post("/getChips", (req, res, next) => {
  console.log(req.body);
  DashboardChips.find({ userid: req.body.id }).exec(function (error, results) {
    if (error) {
      return next(eparams);
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Loading Twitter Successful!",
      result: results,
    });
  });
});
dashboardrouter.post("/setResult", (req, res, next) => {
  Result.create(req.body).then((result) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Adding Results Successful!",
      result: result,
    });
  });
});

dashboardrouter.post("/setLatestTweet", (req, res, next) => {
  Latest_tweet.create(req.body).then((latesttweet) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Adding Twitter detail Successful!",
      result: latesttweet,
    });
  });
});

dashboardrouter.post("/setTwitter", (req, res, next) => {
  Twitter.create(req.body).then((twitter) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Adding Twitter detail Successful!",
      result: twitter,
    });
  });
});

dashboardrouter.post("/getTwitter", function (req, res, next) {
  Twitter.findById(req.body.id)
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
        result: results,
      });
    });
});

dashboardrouter.post("/setVideodetails", (req, res, next) => {
  VideoDetail.create(req.body).then((detail) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Adding Video detail Successful!",
      result: detail,
    });
  });
});
dashboardrouter.post("/setYoutube", (req, res, next) => {
  Youtube.create(req.body).then((youtube) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Adding Youtube Successful!",
      result: youtube,
    });
  });
});
dashboardrouter.post("/getYoutube", function (req, res, next) {
  Youtube.findById(req.body.id)
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
        status: "Loading Twitter Successful!",
        result: results,
      });
    });
});

dashboardrouter.post("/setInstaDetails", (req, res, next) => {
  InstaDetails.create(req.body).then((detail) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Adding Twitter detail Successful!",
      result: detail,
    });
  });
});
dashboardrouter.post("/setInstagram", (req, res, next) => {
  Instagram.create(req.body).then((instagram) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Adding Twitter detail Successful!",
      result: instagram,
    });
  });
});
dashboardrouter.post("/getInstagram", function (req, res, next) {
  Instagram.findById(req.body.id)
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
        result: results,
      });
    });
});

dashboardrouter.post("/setfbDetails", (req, res, next) => {
  FbDetails.create(req.body).then((detail) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Adding detail Successful!",
      result: detail,
    });
  });
});
dashboardrouter.post("/setFacebook", (req, res, next) => {
  Facebook.create(req.body).then((facebook) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Adding detail Successful!",
      result: facebook,
    });
  });
});
dashboardrouter.post("/getFacebook", function (req, res, next) {
  Facebook.findById(req.body.id)
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
        result: results,
      });
    });
});

//Delete operations

dashboardrouter.post("/deleteTwitter", (req, res, next) => {
  console.log(req.body);
  Twitter.findByIdAndDelete(req.body.id).then((result) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Deleting Twitter data Successful!",
    });
  });
});

dashboardrouter.post("/deleteLatestTweet", (req, res, next) => {
  console.log(req.body);
  Latest_tweet.findByIdAndDelete(req.body.id).then((result) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Deleting chip Successful!",
    });
  });
});

dashboardrouter.post("/deleteYoutube", (req, res, next) => {
  console.log(req.body);
  Youtube.findByIdAndDelete(req.body.id).then((result) => {
    console.log("Deleting Youtube data Successful!");

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Deleting Youtube data Successful!",
    });
  });
});

dashboardrouter.post("/deleteYoutubeDetails", (req, res, next) => {
  console.log(req.body);
  VideoDetail.findByIdAndDelete(req.body.id).then((result) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Deleting video data Successful!",
    });
  });
});

dashboardrouter.post("/deleteFacebook", (req, res, next) => {
  console.log(req.body);
  Facebook.findByIdAndDelete(req.body.id).then((result) => {
    console.log("Deleting Facebook data Successful!");

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Deleting Facebook data Successful!",
    });
  });
});

dashboardrouter.post("/deleteFbDetails", (req, res, next) => {
  console.log(req.body);
  FbDetails.findByIdAndDelete(req.body.id).then((result) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Deleting Fb post data Successful!",
    });
  });
});

dashboardrouter.post("/deleteInstagram", (req, res, next) => {
  console.log(req.body);
  Instagram.findByIdAndDelete(req.body.id).then((result) => {
    console.log("Deleting Instagram data Successful!");

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Deleting Instagram Successful!",
    });
  });
});

dashboardrouter.post("/deleteInstaPost", (req, res, next) => {
  console.log(req.body);
  InstaDetails.findByIdAndDelete(req.body.id).then((result) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Deleting Instagram post data Successful!",
    });
  });
});

dashboardrouter.post("/deleteResult", (req, res, next) => {
  console.log(req.body);
  Result.findByIdAndDelete(req.body.id).then((result) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Deleting chip Successful!",
    });
  });
});
dashboardrouter.post("/deleteChips", (req, res, next) => {
  console.log(req.body);
  DashboardChips.findByIdAndDelete(req.body.chipid).then((result) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Deleting chip Successful!",
    });
  });
});

//Updating data

dashboardrouter.post("/updatetwitterdetails", function (req, res) {
  Latest_tweet.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        username: req.body.username,
        tweet: req.body.tweet,
        DateTime: req.body.DateTime,
      },
    },
    function (err, result) {
      if (err)
        return res.json(400, { message: `id ${req.body.id} not found.` });

      res.json({
        success: true,
        result: result,
      });
    }
  );
});

dashboardrouter.post("/updateyoutubedetails", function (req, res) {
  VideoDetail.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        youtuber: req.body.youtuber,
        videoName: req.body.videoName,
        VideoDescription: req.body.VideoDescription,
        DateTime: req.body.DateTime,
      },
    },
    function (err, result) {
      if (err)
        return res.json(400, { message: `id ${req.body.id} not found.` });

      res.json({
        success: true,
        result: result,
      });
    }
  );
});

dashboardrouter.post("/updateinstagramdetails", function (req, res) {
  InstaDetails.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        username: req.body.username,
        postDetails: req.body.postDetails,
        DateTime: req.body.DateTime,
      },
    },
    function (err, result) {
      if (err)
        return res.json(400, { message: `id ${req.body.id} not found.` });

      res.json({
        success: true,
        result: result,
      });
    }
  );
});

dashboardrouter.post("/updatefacebookdetails", function (req, res) {
  FbDetails.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        username: req.body.username,
        post: req.body.post,
        DateTime: req.body.DateTime,
      },
    },
    function (err, result) {
      if (err)
        return res.json(400, { message: `id ${req.body.id} not found.` });

      res.json({
        success: true,
        result: result,
      });
    }
  );
});

dashboardrouter.post("/updateresult", function (req, res) {
  Result.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        positive: req.body.positive,
        negative: req.body.negative,
        neutral: req.body.neutral,
      },
    },
    function (err, result) {
      if (err)
        return res.json(400, { message: `id ${req.body.id} not found.` });

      res.json({
        success: true,
        result: result,
      });
    }
  );
});

module.exports = dashboardrouter;
