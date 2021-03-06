var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var instagramSchema = new Schema({
  hashtag: {
    type: String,
    required: true,
  },
  Result: {
    type: mongoose.Types.ObjectId,
    ref: "Result",
  },
  latestPost: {
    type: mongoose.Types.ObjectId,
    ref: "Instagram_post_Details",
  },
});
module.exports = mongoose.model("Instagram", instagramSchema);
