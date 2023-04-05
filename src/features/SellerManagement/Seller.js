const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const SellerSchema = new Schema({
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

const Seller = mangoose.model("Seller", SellerSchema);
module.exports = Seller;
