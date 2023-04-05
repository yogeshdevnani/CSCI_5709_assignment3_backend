const express = require("express");
const authenticateUser = require("../../utils/authenticateUser");
const router = express.Router();

const productController = require("./controller");

router.get("/", productController.getProducts);

router.get("/:id", authenticateUser, productController.getProductById);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

router.get("/:id/ratings", productController.getRatings);
router.post("/:id/rating", productController.addRating);

router.put("/:id/rating/:ratingId", productController.updateRating);

router.delete("/:id/rating/:ratingId", productController.deleteRating);

router.post("/filter", authenticateUser, productController.filterProducts);

module.exports = router;
