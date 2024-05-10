const userAuth = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      const token = await jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      res.cookie("Nexusplus", token)
      res.redirect("/")
    } else {
      return res.render("login", { error: "Mismatch Email and Password" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const postProduct = async(req, res)=>{
  try {
    
  } catch (error) {
    
  }
}

module.exports = {
  getHomepage,
  getRegister,
  getLogin,
  getPostAds,
  postRegister,
  postLogin,
};
