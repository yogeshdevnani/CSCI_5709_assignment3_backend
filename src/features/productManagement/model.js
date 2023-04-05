const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const ProductSchema = new Schema({
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
    required: false,
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
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sellerId: {
    type: String,
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

const ProductManagementObj = mangoose.model("Products", ProductSchema);
module.exports = ProductManagementObj;
