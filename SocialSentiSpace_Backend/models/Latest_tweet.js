var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  tweet: {
    type: String,
    required: true,
  },
  DateTime: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Latest_Tweet", tweetSchema);
