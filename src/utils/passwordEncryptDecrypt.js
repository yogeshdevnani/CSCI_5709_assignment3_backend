const bcrypt = require("bcryptjs");

//author:Tushar Arora
encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(password, salt);
  return bcryptPassword;
};
module.exports = encryptPassword;
