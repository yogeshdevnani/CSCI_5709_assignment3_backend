const Wallet = require("./Wallet");
const { json } = require("express");
const Transaction = require("../payment/Transaction");

//Author: Shobhit Arora

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
    else{
    response = {
      responseStatus: true,
      responseMessage: "Wallet fetched sucessfully",
      responseData: walletDb,
    };
  }
  } catch (error) {
    console.log(error);
    response = {
      responseStatus: false,
      responseMessage: "Something Went wrong in wallet",
    };
  }

  return response;
};

exports.updateWallet= async(data,userId)=>{
  let response= {}
  try {
    const updateValue={accountbalance: data.accountbalance}
    const filter= {userid:userId}

    const updatedWalletDb= await Wallet.findOneAndUpdate(filter, updateValue,{new:true});
    if(updatedWalletDb){
      response={
        responseStatus: true,
        responseMessage: "Wallet sucessfully updated",
        responseData: updatedWalletDb
      }
      
    }
    else{
      response={
        responseStatus: false,
        responseMessage: "Wallet update failed"
      }
    }
    
  } catch (error) {
    console.log(error)
    response = {
      responseStatus: false,
      responseMessage: "Something Went wrong in Wallet",
    };
  }
  
  return response;
};

exports.getTransactionData = async (userId) => {
  let response = {};
  try {
    let transactionDb = await Transaction.find({ userid: userId });
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
