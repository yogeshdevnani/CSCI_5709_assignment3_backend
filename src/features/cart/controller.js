const Cart = require("./model");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);
    const {
      productId,
      name,
      description,
      price,
      averageRating,
      totalRating,
      category,
      quantity,
      imageThumbnailUrl,
    } = req.body;

    let cart = await Cart.findOne({ userId });

    console.log("cart ", cart);
    if (!cart) {
      cart = new Cart({
        cartId: Date.now(),
        userId,
        cartItems: [
          {
            productId,
            name,
            description,
            price,
            averageRating,
            totalRating,
            category,
            quantity,
            imageThumbnailUrl,
          },
        ],
        totalCost: quantity * price,
        totalQuantity: quantity,
      });
    } else {
      const existingProductIndex = cart.cartItems.findIndex(
        (item) => item.productId === productId
      );

      if (existingProductIndex !== -1) {
        cart.cartItems[existingProductIndex].quantity += quantity;
      } else {
        cart.cartItems.push({
          productId,
          name,
          description,
          price,
          averageRating,
          totalRating,
          category,
          quantity,
          imageThumbnailUrl,
        });
      }

      cart.totalCost += quantity * price;
      cart.totalQuantity += quantity;
    }

    console.log("cart", cart);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    console.log("userId", userId);
    const cart = await Cart.findOne({ userId });
    console.log("cart=>", cart);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.cartItems.find((item) => {
      return item.productId === productId;
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity -= 1;

    let totalCost = parseFloat(cart.totalCost);
    totalCost -= parseFloat(item.price);
    console.log(totalCost);

    cart.totalCost = totalCost.toFixed(2);
    cart.totalQuantity -= 1;

    if (item.quantity === 0) {
      const items = cart.cartItems.filter(
        (item) => item.productId !== productId
      );
      cart.cartItems = items;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
