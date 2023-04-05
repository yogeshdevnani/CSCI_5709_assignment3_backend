//import functions from controller

const express = require("express");
const router = express.Router();

router.get("/login", async (req, res) => {
  try {
    //get data from req
    let { name } = req.body;
    //use your controller function to update database

    //send response if needed
    res.json({
      status: "SUCCESS",
      message: "login success",
      data: data,
    });
  } catch (err) {
    res.json({
      status: "FAILED",
      message: err.message,
    });
  }
});

module.exports = router;
