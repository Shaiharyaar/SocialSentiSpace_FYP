var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var videoSchema = new Schema({
  youtuber: {
    type: String,
    required: true,
  },
  videoName: {
    type: String,
    required: true,
  },
  VideoDescription: {
    type: String,
    required: true,
  },
  DateTime: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("VideoDetail", videoSchema);
