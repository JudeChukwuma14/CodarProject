const express = require("express")
const { getHomepage, getRegister, getLogin, getPostAds, postRegister, postLogin } = require("../controller/userController")
const {checkToken} = require("../middleware/TokenVaildation")
const router = express.Router()

router.get("/",checkToken, getHomepage)
router.get("/register", getRegister)
router.get("/login", getLogin)
router.get("/postads", getPostAds)
router.post("/register", postRegister)
router.post("/login", postLogin)

module.exports = router