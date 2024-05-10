const userAuth = require("../model/userModel");

const generateOtp = async () => {
  let uniqueCode = Math.floor(Math.random() * 10000000);
  const checkOtp = await userAuth.findOne({ otp: uniqueCode });

  while (checkOtp) {
    uniqueCode = Math.floor(Math.random() * 10000000);
    checkOtp = await userAuth.findOne({ otp: uniqueCode });
  }
  return uniqueCode
};

module.exports = {generateOtp}