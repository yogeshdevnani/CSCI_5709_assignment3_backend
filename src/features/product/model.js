//Authors - Rituraj Kadamati 

//Schema for product
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: {
    type: Number,
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
  ratingsData: [
    {
      ratingId: {
        type: Number,
        required: true,
        unique: true,
      },
      ratingDesc: {
        type: {
          ratings: [
            {
              rating: {
                type: Number,
                required: true,
              },
              comment: {
                type: String,
                default: "",
              },
            },
          ],
        },
        required: true,
      },
    },
  ],
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
  images: [
    {
      imageId: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
    },
  ],
});

const Product = mongoose.model("Product", ProductSchema);

//sample data
const product1 = new Product({
  productId: 1,
  name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  price: 109.95,
  ratingsData: [
    {
      ratingId: 1,
      ratingDesc: {
        ratings: [
          {
            rating: 3.9,
            comment: "Great backpack for everyday use.",
          },
        ],
      },
    },
  ],
  averageRating: 3.9,
  totalRating: 120,
  category: "men's clothing",
  quantity: 10,
  imageThumbnailUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  images: [
    {
      imageId: 1,
      imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
  ],
});

const product2 = new Product({
  productId: 2,
  name: "Mens Casual Premium Slim Fit T-Shirts",
  description:
    "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  price: 22.3,
  ratingsData: [
    {
      ratingId: 1,
      ratingDesc: {
        ratings: [
          {
            rating: 4.1,
            comment: "Great shirt for casual wear.",
          },
        ],
      },
    },
  ],
  averageRating: 4.1,
  totalRating: 259,
  category: "men's clothing",
  quantity: 20,
  imageThumbnailUrl:
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  images: [
    {
      imageId: 1,
      imageUrl:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    },
  ],
});

async function saveProducts() {
  try {
    await product1.save();
    await product2.save();
    console.log("Products saved successfully!");
  } catch (err) {
    console.error(err);
  }
}

module.exports = Product;
