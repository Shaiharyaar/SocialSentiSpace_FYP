var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var trendSchema = new Schema({
  location: [
    {
      type: String,
      required: true,
    },
  ],
  trend: [
    {
      type: String,
      required: true,
    },
  ],
});
module.exports = mongoose.model("Trends", trendSchema);
