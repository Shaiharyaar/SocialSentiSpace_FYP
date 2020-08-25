var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var instaSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  postDetails: {
    type: String,
    required: true,
  },
  DateTime: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Instagram_post_Details", instaSchema);
