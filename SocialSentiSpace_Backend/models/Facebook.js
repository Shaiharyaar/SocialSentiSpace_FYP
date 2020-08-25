var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var facebookSchema = new Schema({
  postURL: {
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
  postDetail: {
    type: mongoose.Types.ObjectId,
    ref: "Fb_post_detail",
  },
});
module.exports = mongoose.model("Facebook", facebookSchema);
