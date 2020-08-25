var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var twitterSchema = new Schema({
  trend: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  trendAndLocation: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  Result: {
    type: mongoose.Types.ObjectId,
    ref: "Result",
  },
  totalTweets: {
    type: Number,
    required: true,
  },
  DateTime: {
    type: String,
    required: true,
  },
  LatestTweet: {
    type: mongoose.Types.ObjectId,
    ref: "Latest_Tweet",
  },
});
module.exports = mongoose.model("Twitter", twitterSchema);
