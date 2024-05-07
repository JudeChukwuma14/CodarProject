const express = require("express")
const { getHomepage, getRegister, getLogin } = require("../controller/userController")
const router = express.Router()

router.get("/", getHomepage)
router.get("/register", getRegister)
router.get("/login", getLogin)

module.exports = router