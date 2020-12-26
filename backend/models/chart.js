var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChartSchema = new Schema({
  Chartdata: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("Chart", ChartSchema);
