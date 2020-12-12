var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var chipsSchema = new Schema({
  userid: { type: String, required: true },
  Label: {
    type: String,
    required: true,
  },
  social_id: {
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
