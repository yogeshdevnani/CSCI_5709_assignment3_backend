//import functions from controller

const express = require("express");
const {
  sellerRegistration,
  sellerLogin,
  recoverpasswordforSeller,
} = require("../SellerManagement/sellercontroller");
const router = express.Router();

const {
  userRegistration,
  userLogin,
  sendOTP,
  recoverpasswordforUser,
} = require("./usercontroller");

//author:Tushar Arora
router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const userType = req.body.usertype;
    var response;
    if (userType.toLowerCase() === "seller") {
      response = await sellerRegistration(data);
    } else if (userType.toLowerCase() === "buyer") {
      response = await userRegistration(data);
    }

    res.status(200).json({
      status: response.responseStatus,
      message: response.responseMessage,
      userType: userType,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});

//author:Tushar Arora
router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const userType = req.body.usertype;
    var response;
    if (userType.toLowerCase() === "seller") {
      response = await sellerLogin(data);
    } else if (userType.toLowerCase() === "buyer") {
      response = await userLogin(data);
    }

    res.status(200).json({
      status: response.responseStatus,
      message: response.responseMessage,
      token: response.responseToken,
      userType: userType,
    });
  } catch (err) {
    res.json({
      status: "FAILED",
      message: err.message,
    });
  }
});

//author:Tushar Arora
router.post("/otp", async (req, res) => {
  try {
    const data = req.body;
    const userType = req.body.usertype;
    var response = await sendOTP(data);

    res.status(200).json({
      status: response.responseStatus,
      message: response.responseMessage,
      otp: response.responseOTP,
      userType: userType,
    });
  } catch (err) {
    res.json({
      status: "FAILED",
      message: err.message,
    });
  }
});

//author:Tushar Arora
router.post("/reset", async (req, res) => {
  try {
    const data = req.body;
    const userType = req.body.usertype;

    if (userType.toLowerCase() === "seller") {
      response = await recoverpasswordforSeller(data);
    } else if (userType.toLowerCase() === "buyer") {
      response = await recoverpasswordforUser(data);
    }

    res.status(200).json({
      status: response.responseStatus,
      message: response.responseMessage,
      userType: userType,
    });
  } catch (err) {
    res.json({
      status: "FAILED",
      message: err.message,
    });
  }
});

module.exports = router;
