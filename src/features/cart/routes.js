const Cart = require("./model");
const express = require("express");
const router = express.Router();
const cartController = require("./controller");
const authenticateUser = require("../../utils/authenticateUser");
router.post("/", authenticateUser,cartController.addToCart);

router.delete("/:productId", authenticateUser,cartController.removeFromCart);

router.get("/",authenticateUser, cartController.getCartItems);

module.exports = router;
