const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const TransactionScheme = new Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date
  },
  type: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true
  }
});

const Transaction = mangoose.model("Transaction", TransactionScheme);
module.exports = Transaction;
