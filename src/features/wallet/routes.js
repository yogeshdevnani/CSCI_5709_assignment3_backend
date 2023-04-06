const authenticateUser = require("../../utils/authenticateUser");
const express = require("express");
const {
  getWalletData,
  getTransactionData,
  updateWallet,
} = require("./walletController");
const router = express.Router();

//Author: Shobhit Arora

router.get("/getwalletdetails", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await getWalletData(userId);
    res.send(response);
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
});

router.put("/updateWallet", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;
    const response = await updateWallet(data, userId);
    res.send(response);
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
});

router.get("/gettransactions", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await getTransactionData(userId);
    res.send(response);
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
});

module.exports = router;
