var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new Schema({
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  image: {
    type: String,
  },
  dashboardChips: {
    $type: [
      {
        chips_id: {
          type: mongoose.Types.ObjectId,
          ref: "DashboardChips",
        },
      },
    ],
  },
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
