// create functions to manipulate database
const { getAuthenticationToken } = require("../../utils/authentication");
const encryptPassword = require("../../utils/passwordEncryptDecrypt");

const bcrypt = require("bcryptjs");
const Seller = require("./Seller");

//author:Tushar Arora
// seller registration code
exports.sellerRegistration = async (SellerReq) => {
  let response = {};
  try {
    // fetching the user from mongo database to check whether the user already exists or not
    let sellerdb = await Seller.findOne({
      email: SellerReq.email,
    });

    if (sellerdb) {
      return (response = {
        responseStatus: false,
        responseMessage:
          "Seller is already exists please try with other email Id!",
      });
    }

    const bcryptPassword = await encryptPassword(SellerReq.password);

    sellerdb = await Seller.create({
      email: SellerReq.email,
      firstname: SellerReq.firstname,
      lastname: SellerReq.lastname,
      password: bcryptPassword,
    });

    response = {
      responseStatus: true,
      responseMessage: "Seller is successfully registered!",
    };
  } catch (error) {
    console.log(error);
    console.log(error.message);
    response = {
      responseStatus: false,
      responseMessage: "Something went wrong!",
    };
  }

  return response;
};

//author:Tushar Arora
// seller login code
exports.sellerLogin = async (SellerReq) => {
  let response = {};
  try {
    let sellerdb = await Seller.findOne({
      email: SellerReq.email,
    });

    if (sellerdb) {
      let passwordcheck = await bcrypt.compare(
        SellerReq.password,
        sellerdb.password
      );
      if (passwordcheck) {
        console.log(sellerdb.id);
        const seller = {
          id: sellerdb.id,
        };
        const token = getAuthenticationToken(seller);

        response = {
          responseStatus: true,
          responseMessage: "Seller is successfully logged in!",
          responseToken: token,
        };
      } else {
        return (response = {
          responseStatus: false,
          responseMessage: "Incorrect email or password! try again!",
        });
      }
    } else {
      return (response = {
        responseStatus: false,
        responseMessage: "Incorrect email or password! try again!",
      });
    }
  } catch (error) {
    console.log(error);
    response = {
      responseStatus: false,
      responseMessage: "Something went wrong!",
    };
  }

  return response;
};

//author:Tushar Arora
// recovery password
exports.recoverpasswordforSeller = async (SellerReq) => {
  let response = {};
  try {
    if (SellerReq.password != SellerReq.confirmpassword) {
      return (response = {
        responseStatus: false,
        responseMessage:
          "New password does not match with the confirm password!",
      });
    }
    let sellerdb = await Seller.findOne({
      email: SellerReq.email,
    });

    if (sellerdb) {
      const bcryptPassword = await encryptPassword(SellerReq.password);
      const seller = await Seller.findByIdAndUpdate(
        sellerdb.id,
        { password: bcryptPassword },
        { new: true }
      );

      response = {
        responseStatus: true,
        responseMessage: "Password is successfully changed!",
        responseData: seller,
      };
    } else {
      response = {
        responseStatus: false,
        responseMessage: "Seller does not exists!",
      };
    }
  } catch (error) {
    console.log(error);
    response = {
      responseStatus: false,
      responseMessage: "Something went wrong!",
    };
  }

  return response;
};
