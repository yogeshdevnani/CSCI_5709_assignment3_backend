const Wishlist = require("./model");
const { ObjectId } = require("mongoose");

//fetch the wishlist collection items that user has added
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.find({ userId: userId });
    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// delete the product from the wishlist collection
exports.deleteFromWishlist = async (req, res) => {
  try {
    const id = req.user.id;
    const productId = req.body.productId;
    const wishlist = await Wishlist.updateOne(
      { userId: id },
      { $pull: { products: { productId: productId } } },
      { new: true }
    );
    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add the product to the wishlist collection
exports.addToWishlist = async (req, res) => {
  try {
    console.log(req.user.id);
    const id = req.user.id;
    const product = req.body.product;
    const userExists = await Wishlist.find({ userId: id });
    if (userExists.length > 0) {
      const wishlist = await Wishlist.findOneAndUpdate(
        { userId: id },
        { $push: { products: product } },
        { new: true }
      );
      res.json(wishlist);
    } else {
      const wishlist = await Wishlist.create({ userId: id, products: product });
      res.json(wishlist);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
