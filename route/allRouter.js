const express = require("express")
const { getHomepage, getRegister, getLogin, getPostAds } = require("../controller/userController")
const router = express.Router()

router.get("/", getHomepage)
router.get("/register", getRegister)
router.get("/login", getLogin)
router.get("/postads", getPostAds)

module.exports = router