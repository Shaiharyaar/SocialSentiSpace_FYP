var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var youtubeSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },

  Result: {
    type: mongoose.Types.ObjectId,
    ref: "Result",
  },

  VideoDetail: {
    type: mongoose.Types.ObjectId,
    ref: "VideoDetail",
  },
});
module.exports = mongoose.model("Youtube", youtubeSchema);
