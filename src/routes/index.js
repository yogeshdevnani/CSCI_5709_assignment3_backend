const express = require("express");
const router = express.Router();

const userRoutes = require("../features/userManagement");
const testRoutes = require("./../features/testing");
const accountRoutes = require("./../features/accountManagement");
const productRoutes = require("../features/product");
const paymentRoutes = require("../features/payment");
const walletRoutes = require("../features/wallet");
const wishlistRoutes = require("../features/wishlist");
const productManagementRoutes = require("../features/productManagement");

const cartRoutes = require("../features/cart");
router.use("/test", testRoutes);
router.use("/user", userRoutes);
router.use("/account", accountRoutes);
router.use("/products", productRoutes);
router.use("/payment", paymentRoutes);
router.use("/wallet", walletRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);
router.use("/productmanagement", productManagementRoutes);

module.exports = router;
