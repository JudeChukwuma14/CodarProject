const express = require("express")
const { getHomepage, getRegister, getLogin, getPostAds, postRegister, postLogin, getLogout, forgetPassword, getOtp } = require("../controller/userController")
const {checkToken} = require("../middleware/TokenVaildation")
const router = express.Router()

router.get("/", getHomepage)
router.get("/register", getRegister)
router.get("/login", getLogin)
router.get("/logout", getLogout)
router.get("/postads", getPostAds)
router.post("/register", postRegister)
router.post("/login", postLogin)
router.get("/otp", getOtp)
router.post("/forgot-password", forgetPassword)

module.exports = router