const Address = require("../accountManagement/Address");
const { json } = require("express");
const Card = require("./Card");
const Transaction = require("./Transaction");
const Order = require("./Order");

const cart = {
  totalcost: 234,
  cartitems: [
    {
      productid: "641f6e395ea9fc44419925fc",
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    },
    {
      productid: "642ada738f7eec46837a32c4",
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    },
  ],
};

// method to create address
exports.createAddress = async (data, userId) => {
  let response = {};
  try {
    // console.log(data.address1);
    let addressdb = await Address.find({ userid: userId });
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

exports.validatePayment = async (data, userId) => {
  let response = {};
  try {
    console.log(data.source);
    if (data.source === "Credit" || "Debit") {
      let cardDb = await Card.find({ card: data.card });
      // console.log(cardDb);
      if (cardDb) {
        let transactionDb = await Transaction.create({
          amount: cart.totalcost,
          date: new Date(),
          type: "Debit",
          source: data.source,
          userid: userId,
        });
        response = {
          responseStatus: true,
          responseMessage: "Transaction was success",
          responseData: transactionDb,
        };
      } else {
        response = {
          responseStatus: false,
          responseMessage: "Transaction failed",
        };
      }
    } else if (data.source == "Wallet") {
      let walletDb = await Wallet.find({ userId: userId });
      if (walletDb.balance == cart.totalcost) {
        response = {
          responseStatus: true,
          responseMessage: "Transaction was success",
        };
      }
    }
  } catch (error) {
    console.log(error);
    response = {
      responseStatus: false,
      responseMessage: "Something went wrong in transaction",
    };
  }

  return response;
};

exports.createOrder = async (data, userId) => {
  let response = {};
  let orders = [];
  try {
    let address = await Address.findOne({ userid: userId });
    console.log(address);
    console.log("Product id" + cart.cartitems[0].productid);
    for (let i = 0; i < cart.cartitems.length; i++) {
      let order = await Order.create({
        productid: cart.cartitems[i].productid,
        description: cart.cartitems[i].description,
        // sellerId: cart.cartitems.sellerId,
        amount: cart.totalcost,
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
    response = {
      responseStatus: true,
      responseMessage: "Order sucessfully create",
      responseData: orders,
    };
  } catch (error) {
    console.log(error);
    response = {
      responseStatus: false,
      responseMessage: "Something Went wrong",
    };
  }
  return response;
};
