const mangoose = require("mongoose");
const Schema = mangoose.Schema;
// var autoIncrement = require('mongoose-auto-increment');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// autoIncrement.initialize(mangoose.connection);

// UserSchema.plugin(autoIncrement.plugin, {
//   model: "User",
//   field: "_id",
//   startAt: 365000,
//   incrementBy: 1,
// });

const User = mangoose.model("User", UserSchema);
module.exports = User;
