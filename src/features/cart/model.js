const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  cartId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      productId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      averageRating: {
        type: Number,
        required: true,
      },
      totalRating: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      imageThumbnailUrl: {
        type: String,
        required: true,
      },
    },
  ],

  totalCost: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
