const express = require("express");
const authenticateUser = require("../../utils/authenticateUser");
const router = express.Router();

const wishlistController = require("./controller");

router.get("/", authenticateUser, wishlistController.getWishlist);

router.post("/delete", authenticateUser, wishlistController.deleteFromWishlist);

router.post("/add", authenticateUser, wishlistController.addToWishlist);

module.exports = router;
