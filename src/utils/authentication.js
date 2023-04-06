var jwt = require("jsonwebtoken");
//author:Tushar Arora
exports.getAuthenticationToken = (user) => {
  const authtoken = jwt.sign(user, process.env.JWT_SECRET);
  return authtoken;
};

//author:Tushar Arora
exports.verifyAuthenticationToken = (token) => {
  let response;
  let data = {};
  console.log("token" + token);
  try {
    if (!token) {
      return (response = {
        responseStatus: false,
        responseMessage: "User is not authorized token is missing!",
      });
    }
    data = jwt.verify(token, process.env.JWT_SECRET);

    response = {
      responseStatus: true,
      responseMessage: "User is verified!",
      responseData: data,
    };
  } catch (error) {
    console.log(error);
    response = {
      responseStatus: false,
      responseMessage: "Please provide valid token!",
    };
  }
  return response;
};
