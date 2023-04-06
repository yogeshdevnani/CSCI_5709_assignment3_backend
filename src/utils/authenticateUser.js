const { verifyAuthenticationToken } = require("./authentication");

//author:Tushar Arora
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("tokenauth" + token);
  const response = verifyAuthenticationToken(token);
  try {
    if (!response.responseStatus) {
      res.status(401).send({ error: response.responseMessage });
    } else {
      req.user = response.responseData;
      next();
    }
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = authenticateUser;
