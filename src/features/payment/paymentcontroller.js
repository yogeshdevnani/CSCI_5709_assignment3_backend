const Address = require("../accountManagement/Address");
const { json } = require("express");
const Card = require("./Card");
const Transaction = require("./Transaction");
const Order = require("./Order");
const Wallet = require("../wallet/Wallet");
const Cart = require("../cart/model");

//Author: Shobhit Arora
// method to create address
exports.createAddress = async (data, userId) => {
  let response = {};
  try {
    
    let addressdb = await Address.findOne({ userid: userId });
    if (!addressdb) {
      addressdb = await Address.create({
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        province: data.province,
        pincode: data.pincode,
        userid: userId,
      });
    }

    const address = {
      address1: addressdb.address1,
      address2: addressdb.address2,
      city: addressdb.city,
      province: addressdb.province,
      pincode: addressdb.pincode,
      userid: addressdb.userid,
    };

    response = {
      responseStatus: true,
      responseMessage: "Address saved sucessfully",
      responseData: addressdb,
    };
  } catch (err) {
    console.log(err);
    response = {
      responseStatus: false,
      responseMessage: "Something Went wrong in create Address",
    };
  }

  return response;
};

exports.getCart = async (userId) => {
  let response = {};
  try {
    let cart = await Cart.findOne({ userId: userId });

    if (cart) {
      response = {
        responseStatus: true,
        responseMessage: "Cart fetched sucessfully",
        responseData: cart,
      };
    } else {
      response = {
        responseStatus: false,
        responseMessage: "Cart fetch failed",
      };
    }
  } catch (err) {
    console.log(err);
    response = {
      responseStatus: false,
      responseMessage: "Something Went wrong in Cart",
    };
  }

  return response;
};

exports.validatePayment = async (data, userId) => {
  let response = {};
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (data.source === "Credit" || data.source === "Debit") {
      //Test credit card 
      // let cardDb = await Card.find({ card: data.card });
      // if (cardDb) {
        let transactionDb = await Transaction.create({
          amount: cart.totalCost,
          date: new Date(),
          type: "Debited",
          source: data.source,
          userid: userId,
        });
        response = {
          responseStatus: true,
          responseMessage: "Transaction was success",
          responseData: transactionDb,
        };
      // }
    } else if (data.source === "Wallet") {
      
      let walletDb = await Wallet.findOne({ userid: userId });
      let balance = parseInt(walletDb.accountbalance);
      let totalCost= parseInt(cart.totalCost);
      if (balance >= totalCost) {
        balance = balance - totalCost;
        let updateWalletData = {
          accountbalance: balance,
        };

        const updatedWalletDb = await Wallet.findByIdAndUpdate(
          walletDb.id,
          updateWalletData,
          { new: true }
        );
        if (updatedWalletDb) {
          let transactionDb = await Transaction.create({
            amount: cart.totalCost,
            date: new Date(),
            type: "Debited",
            source: data.source,
            userid: userId,
          });
          response = {
            responseStatus: true,
            responseMessage: "Transaction was success",
            responseData: updatedWalletDb,
          };
        }
      } else {
        response = {
          responseStatus: false,
          responseMessage: "Not enough balance in wallet",
        };
      }
    } else {
      response = {
        responseStatus: false,
        responseMessage: "Transaction failed",
      };
    }
  } catch (error) {
    console.log(error);
    response = {
      responseStatus: false,
      responseMessage: "Something went wrong in transaction",
    };
  }
  console.log("inside response",response)
  return response;
};

exports.createOrder = async (data, userId) => {
  let response = {};
  let orders = [];
  try {
    let cart = await Cart.findOne({ userId: userId });
    let address = await Address.findOne({ userid: userId });

    for (let i = 0; i < cart.cartItems.length; i++) {
      let order = await Order.create({
        productid: cart.cartItems[i].productId,
        description: cart.cartItems[i].description,
        // sellerId: cart.cartitems.sellerId,
        amount: cart.totalCost,
        date: new Date(),
        userid: userId,
        address: [
          {
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            province: address.province,
            pincode: address.pincode,
          },
        ],
      });
      orders.push(order);
    }
    if(orders){
      deletedCart=await Cart.deleteOne({userId: userId})
      response = {
        responseStatus: true,
        responseMessage: "Order sucessfully create",
        responseData: orders,
      };
    }
    
  } catch (error) {
    console.log(error);
    response = {
      responseStatus: false,
      responseMessage: "Something Went wrong",
    };
  }
  return response;
};
