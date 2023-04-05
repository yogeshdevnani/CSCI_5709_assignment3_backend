const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const WalletScheme = new Schema({
  userid: {
    type: String,
    required: true,
    unique: true
  },
  accountbalance: {
    type: Number,
    required: true
  }
});

const Wallet = mangoose.model("Wallet", WalletScheme);
module.exports = Wallet;
