var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var fbpostSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  Detail: {
    type: String,
    required: true,
  },

  DateTime: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Fb_post_detail", fbpostSchema);
