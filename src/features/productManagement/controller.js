const ProductManagementObj = require("./model");
const ProductManagementDbObj = require("./model");

exports.addProduct = async (req, res) => {
  const sellerId = req.user.id;
  const data = req.body;
  console.log("addProduct outside");
  console.log(data.imageData);
  const imageURLSObject = generateImageURLObject(data.imageData);
  const noImageAvailableURL =
    "http://res.cloudinary.com/dihkowyae/image/upload/v1680702363/vjhv6fbbcoxzmqgmftrv.jpg";
  if (data.currentProductId) {
    console.log(`Existing Product ${data.currentProductId}`);
    const productId = data.currentProductId;

    const updateFields = {
      productId: 1234,
      quantity: data.quantity,
      name: data.productName,
      price: data.price,
      sellerId: sellerId,
      description: data.description,
      category: data.category,
    };

    const updateForm = await ProductManagementObj.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true }
    );
    res.send("success");
  } else {
    console.log("add called");
    const productAdd = await ProductManagementDbObj.create({
      productId:
        Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000) + 1,
      quantity: data.quantity,
      name: data.productName,
      price: data.price,
      sellerId: sellerId,
      description: data.description ? data.description : "-",
      category: data.category,
      averageRating: 0,
      totalRating: 0,
      imageThumbnailUrl: data.imageData[0]
        ? data.imageData[0]
        : noImageAvailableURL,
      images: imageURLSObject,
      ratingsData: [
        {
          ratingId: 1,
          ratingDesc: {
            ratings: [],
          },
        },
      ],
    });
    res.send("success");
  }
};

exports.getProductsBySellerId = async (req, res) => {
  const sellerId = req.user.id;
  console.log("get product by id called");
  const sellerProducts = await ProductManagementDbObj.find({
    sellerId: sellerId,
  });
  res.json(sellerProducts);
};

exports.getProductForm = async (req, res) => {
  // console.log(`data from getProduct ${req.body.productId}`);
  const productId = req.body.productId;
  const productFormDetails = await ProductManagementObj.find({
    _id: productId,
  });
  res.json(productFormDetails);
};

exports.testDummy = async (req, res) => {
  res.send("Dummy called");
  console.log("dummy get called");
};

function generateImageURLObject(imageURLS) {
  const imageURLJson = [];
  for (let i = 0; i < imageURLS.length; i++) {
    imageURLJson.push({
      imageId: i + 1,
      imageUrl: imageURLS[i],
    });
  }

  return imageURLJson;
}
