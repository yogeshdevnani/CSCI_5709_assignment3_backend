const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  dateOfBirth: String,
  type: String,
});

const User = mangoose.model("User", UserSchema);
module.exports = User;
