const Wallet = require("./Wallet");
const { json } = require("express");
const Transaction = require("../payment/Transaction");

exports.getWalletData = async (userId) => {
  let response = {};
  try {
    let walletDb = await Wallet.findOne({ userid: userId });
    console.log(walletDb);
    if (!walletDb) {
      let createWallet = await Wallet.create({
        userid: userId,
        accountbalance: 0,
      });
      response = {
        responseStatus: true,
        responseMessage: "Wallet created sucessfully",
        responseData: createWallet,
      };
    }

    response = {
      responseStatus: true,
      responseMessage: "Wallet fetched sucessfully",
      responseData: walletDb,
    };
  } catch (error) {
    console.log(error);
    response = {
      responseStatus: false,
      responseMessage: "Something Went wrong in wallet",
    };
  }

  return response;
};

exports.getTransactionData = async (userId) => {
  let response = {};
  try {
    let transactionDb = await Transaction.findOne({ userid: userId });
    if (!transactionDb) {
      response = {
        responseStatus: false,
        responseMessage: "Fetching transaction data failed",
      };
    } else {
      response = {
        responseStatus: true,
        responseMessage: "transaction created sucessfully",
        responseData: transactionDb,
      };
    }
  } catch (error) {
    console.log(error);
    response = {
      responseStatus: false,
      responseMessage: "Something Went wrong in Transaction",
    };
  }

  return response;
};
