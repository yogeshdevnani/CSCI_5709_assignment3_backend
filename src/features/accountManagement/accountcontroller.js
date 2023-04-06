const encryptPassword = require("../../utils/passwordEncryptDecrypt");
const bcrypt = require("bcryptjs");
const User = require("../userManagement/User");
const Address = require("./Address");
const Order = require("../payment/Order");
const Product = require("../product/model");

const { json } = require("express");
//author:Tushar Arora
// to update the password of logged in user
exports.UpdatePassword = async (UserReq, userId) => {
  let response = {};
  try {
    if (UserReq.newpassword != UserReq.confirmpassword) {
      return (response = {
        responseStatus: false,
        responseMessage:
          "New password does not match with the confirm password!",
      });
    }

    let userdb = await User.findOne({
      _id: userId,
    });

    let passwordcheck = await bcrypt.compare(UserReq.password, userdb.password);

    if (!userdb || !passwordcheck) {
      return (response = {
        responseStatus: false,
        responseMessage: "Incorrect password! try again!",
      });
    }

    if (userdb && passwordcheck) {
      const bcryptPassword = await encryptPassword(UserReq.newpassword);
      const user = await User.findByIdAndUpdate(
        userId,
        { password: bcryptPassword },
        { new: true }
      );

      response = {
        responseStatus: true,
        responseMessage: "Password is successfully changed!",
        responseData: user,
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
//author:Tushar Arora
//fetch user first name and last name
exports.getUserFirstandLastName = async (userId) => {
  let response = {};
  try {
    let userdb = await User.findOne({
      _id: userId,
    });

    if (!userdb) {
      return (response = {
        responseStatus: false,
        responseMessage: "UserId does not exists!",
      });
    }

    response = {
      responseStatus: true,
      responseMessage: "User is fetched successfully!",
      responseData: {
        firstname: userdb.firstname,
        lastname: userdb.lastname,
      },
    };
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
// update the user first and last name
exports.updateUserFirstandLastName = async (UserReq, userId) => {
  let response = {};
  try {
    let userdb = await User.findOne({
      _id: userId,
    });
    if (!userdb) {
      return (response = {
        responseStatus: false,
        responseMessage: "User does not exists!",
      });
    } else {
      const userfirstandlastname = {
        firstname: UserReq.firstname,
        lastname: UserReq.lastname,
      };
      const user = await User.findByIdAndUpdate(userId, userfirstandlastname, {
        new: true,
      });
      const data = {
        firstname: user.firstname,
        lastname: user.lastname,
      };

      response = {
        responseStatus: true,
        responseMessage: "First or Last name are successfully changed!",
        responseData: data,
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
//author:Tushar Arora
// get user address  details
exports.getUserAddress = async (userId) => {
  let response = {};
  try {
    let addressdb = await Address.findOne({
      userid: userId,
    });

    if (!addressdb) {
      return (response = {
        responseStatus: false,
        responseMessage: "No address found!",
      });
    }

    response = {
      responseStatus: true,
      responseMessage: "Address is fetched successfully!",
      responseData: {
        address1: addressdb.address1,
        address2: addressdb.address2,
        city: addressdb.city,
        province: addressdb.province,
        pincode: addressdb.pincode,
      },
    };
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
// udate user addresss
exports.updateAddress = async (addressReq, userId) => {
  let response = {};
  try {
    let addressdb = await Address.findOne({
      userid: userId,
    });

    if (!addressdb) {
      addressdb = await Address.create({
        address1: addressReq.address1,
        address2: addressReq.address2,
        city: addressReq.city,
        province: addressReq.province,
        pincode: addressReq.pincode,
        userid: userId,
      });

      const addressdata = {
        address1: addressdb.address1,
        address2: addressdb.address2,
        city: addressdb.city,
        province: addressdb.province,
        pincode: addressdb.pincode,
      };

      return (response = {
        responseStatus: true,
        responseMessage: "Address is successfully added!",
        responseData: addressdata,
      });
    } else {
      const userAddress = {
        address1: addressReq.address1,
        address2: addressReq.address2,
        city: addressReq.city,
        province: addressReq.province,
        pincode: addressReq.pincode,
      };
      const address = await Address.findByIdAndUpdate(
        addressdb.id,
        userAddress,
        { new: true }
      );
      const addressdata = {
        address1: address.address1,
        address2: address.address2,
        city: address.city,
        province: address.province,
        pincode: address.pincode,
      };
      response = {
        responseStatus: true,
        responseMessage: "Address is successfully updated!",
        responseData: addressdata,
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
//author:Tushar Arora
// get the order history of the users
exports.getOrderDetails = async (userId) => {
  ListofOrder = [];
  let response = {};
  try {
    let orderList = await Order.find({ userid: userId });

    for (var order of orderList) {
      const product = await Product.findOne({ _id: order.productid });

      const orderdetails = {
        photo: product.images[0].imageUrl,
        orderNumber: order.id,
        orderName: product.name,
        orderDate: order.date,
        Amount: order.amount,
      };

      for (var address of order.address) {
        orderdetails.address1 = address.address1;
        orderdetails.address2 = address.address2;
        orderdetails.city = address.city;
        orderdetails.province = address.province;
        orderdetails.pincode = address.pincode;
        ListofOrder.push(orderdetails);
      }
    }

    response = {
      responseStatus: true,
      responseMessage: "order is successfully fetched!",
      responseData: ListofOrder,
    };
  } catch (error) {
    console.log(error);
    response = {
      responseStatus: false,
      responseMessage: "Something went wrong!",
    };
  }
  return response;
};
