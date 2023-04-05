const authenticateUser = require("../../utils/authenticateUser");
const express = require("express");
const { getWalletData, getTransactionData } = require("./walletController");
const router = express.Router();

router.get("/getwalletdetails", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await getWalletData(userId);
    // const transactionResponse= await getTransactionData(userId)
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
