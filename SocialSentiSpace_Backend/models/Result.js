var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var resultSchema = new Schema({
  positive: {
    type: Number,
  },
  negative: {
    type: Number,
  },
  neutral: {
    type: Number,
  },
});
module.exports = mongoose.model("Result", resultSchema);
