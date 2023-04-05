const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const AddressSchema = new Schema({
  address1: {
    type: String,
    required: true,
    unique: true,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
  },
});

const User = mangoose.model("Address", AddressSchema);
module.exports = User;
