const userAuth = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateOtp } = require("../middleware/otpgenerator");
const { mailSending } = require("../middleware/email");
const getHomepage = (req, res) => {
  res.render("index");
};

const getRegister = (req, res) => {
  res.render("register");
};
const getLogin = (req, res) => {
  res.render("login");
};

const getPostAds = (req, res) => {
  res.render("post-ads");
};

const postRegister = async (req, res) => {
  try {
    const { name, email, password, retypePassword } = req.body;
    const userArr = ["name", "email", "password", "retypePassword"];
    const emptyArr = [];
    for (const child of userArr) {
      if (!req.body[child] || req.body[child] === "") {
        emptyArr.push(child);
      }
    }
    if (emptyArr.length > 0) {
      res.render("register", {
        error: `This Field(s) ${emptyArr.join(" ,")} cannot be empty`,
      });
    }
    if (password !== retypePassword) {
      return res.render("register", { error: "Mistype password" });
    }
    const checkEmail = await userAuth.findOne({ email: email });
    if (checkEmail) {
      return res.render("register", { error: "Email already exit" });
    }
    await userAuth.create({
      name: name,
      email: email,
      password: password,
    });
    res.render("login", { success: "Account created successful" });
  } catch (err) {
    console.log(err.message);
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userArr = ["email", "password"];
    const emptyArr = [];
    for (const child of userArr) {
      if (!req.body[child] || req.body[child] === "") {
        emptyArr.push(child);
      }
    }
    if (emptyArr.length > 0) {
      return res.render("login", {
        error: `This Field(s) ${emptyArr.join(" ,")} cannot be empty`,
      });
    }
    const checkUser = await userAuth.findOne({ email: email });
    if (!checkUser) {
      return res.render("login", { error: "Email does not exist" });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (checkPassword) {
      const token = await jwt.sign(
        { id: checkUser._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("Nexusplus", token);
      res.redirect("/");
    } else {
      return res.render("login", { error: "Mismatch Email and Password" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const getOtp = (req, res)=>{
  res.render("otp")
}

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.render("forgot-password", { error: "Email not found" });
    }
    const account = await userAuth.findOne({ email: email });
    console.log(account)
    if (!account) {
      return res.render("forgot-password", { error: "Account not found" });
    }
    const generate = await generateOtp();
    account.otp = generate;
    const date = new Date();
    date.setMinutes(date.getMinutes() + 10);
    account.otpExpireDate = date;
    await account.save();
    
    const subject = "Account OTP code";
    const message = `Below is your otp code \n ${generate} and this code expire in 10mins`;
    const option = {
      subject: subject,
      message: message,
      email: email,
    };
    await mailSending(option);

    return res.render("forgot-password", { success: "Mail sent, check your inbox" });
  } catch (error) {
    console.log(error.message);
    return res.render("forgot-password", { error: "An error occurred, please try again later" });
  }
};



// const forgetPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.render("forgot-password", { error: "Email not provided" });
//     }
//     const account = await userAuth.findOne({ email: email });
//     if (!account) {
//       return res.render("forgot-password", { error: "Account not found" });
//     }
//     const otp = await generateOtp();
//     account.otp = otp;
//     account.otpExpireDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
//     await account.save();
    
//     const subject = "Account OTP code";
//     const message = `Below is your OTP code: ${otp}. This code will expire in 10 minutes.`;
//     const option = {
//       subject: subject,
//       message: message,
//       email: email,
//     };
//     await mailSending(option);

//     return res.render("otp", { email: email, success: "OTP sent to your email, check your inbox" });
//   } catch (error) {
//     console.error(error);
//     return res.render("forgot-password", { error: "An error occurred, please try again later" });
//   }
// };


const getLogout = (req, res) => {
  res.cookie("Nexusplus", "", { expiresIn: "1s" });
  res.redirect("/login");
};




module.exports = {
  getHomepage,
  getRegister,
  getLogin,
  getPostAds,
  postRegister,
  postLogin,
  getLogout,
  forgetPassword,
  getOtp
};
