var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var youtubeSchema = new Schema({
  URL: {
    type: String,
    required: true,
  },
  Result: {
    type: mongoose.Types.ObjectId,
    ref: "Result",
  },
  totalComments: {
    type: Number,
    required: true,
  },
  VideoDetail: {
    type: mongoose.Types.ObjectId,
    ref: "VideoDetail",
  },
});
module.exports = mongoose.model("Youtube", youtubeSchema);
