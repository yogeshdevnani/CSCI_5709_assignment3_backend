const authenticateUser = require("../../utils/authenticateUser");
const express = require("express");
const {
  UpdatePassword,
  getUserFirstandLastName,
  updateUserFirstandLastName,
  getUserAddress,
  updateAddress,
  getOrderDetails,
} = require("./accountcontroller");
const router = express.Router();

//author:Tushar Arora
router.post("/updatepassword", authenticateUser, async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const response = await UpdatePassword(data, userId);
    res.json({
      status: response.responseStatus,
      message: response.responseMessage,
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
router.get("/getuserfirstandlastName", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const response = await getUserFirstandLastName(userId);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});

//author:Tushar Arora
router.post(
  "/updateuserfirstandlastName",
  authenticateUser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const data = req.body;

      const response = await updateUserFirstandLastName(data, userId);
      res.send(response);
    } catch (error) {
      console.log(error);
      res.json({
        status: "FAILED",
        message: error.message,
      });
    }
  }
);

//author:Tushar Arora
router.get("/getuseraddress", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const response = await getUserAddress(userId);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});

//author:Tushar Arora
router.post("/updateuseraddress", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const response = await updateAddress(data, userId);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});

//author:Tushar Arora
router.get("/getOrderDetails", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const response = await getOrderDetails(userId);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});

module.exports = router;
