var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var twitterSchema = new Schema({
  trend: {
    type: String,
    required: true,
  },
  Result: {
    type: mongoose.Types.ObjectId,
    ref: "Result",
  },
  LatestTweet: {
    type: mongoose.Types.ObjectId,
    ref: "Latest_Tweet",
  },
});
module.exports = mongoose.model("Twitter", twitterSchema);
