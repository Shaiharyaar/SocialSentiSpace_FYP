var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var resultSchema = new Schema({
  neutral: {
    type: Number,
  },
  positive: {
    type: Number,
  },
  negative: {
    type: Number,
  },
});
module.exports = mongoose.model("Result", resultSchema);
