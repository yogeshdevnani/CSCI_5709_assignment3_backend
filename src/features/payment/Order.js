const mangoose = require("mongoose");
const Schema = mangoose.Schema;
 

const OrderSchema = new Schema({

  productid: {
    type: String,
    required:true},
  description:{
    type: String},
  amount: {
    type: Number,
    required:true},
  date:{
    type:Date,
    required:true
  },
  userid:{
    type:String
  },
  address: [{
    address1: {
        type: String,
        required:true},
      address2:{
        type: String},
      city:{
          type: String,
          required:true},
      province: {
        type: String,
        required:true},
      pincode:{
        type:String,
        required:true
      }
  }]


});


const User = mangoose.model("Order", OrderSchema);
module.exports = User;