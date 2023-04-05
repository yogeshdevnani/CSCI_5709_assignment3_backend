const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        imageThumbnailUrl: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { versionKey: false }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

//sample data
const product2 = new Wishlist({
  userId: "6425ce9f52dbd67186ef71ab",
  products: [
    {
      productId: "64243f0f86767fed681da091",
      name: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
      imageThumbnailUrl:
        "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    },
  ],
});

async function saveProducts() {
  try {
    await product2.save();
    console.log("Products saved successfully!");
  } catch (err) {
    console.error(err);
  }
}

module.exports = Wishlist;
