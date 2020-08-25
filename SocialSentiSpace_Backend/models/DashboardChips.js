var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var chipsSchema = new Schema({
  Label: {
    type: String,
    required: true,
  },

  MediaType: {
    type: String,
    required: true,
  },
  Data: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("DashboardChips", chipsSchema);
