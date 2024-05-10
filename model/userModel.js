const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userInput = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    otp:{
        type: Number
    },
    otpExpireDate:{
        type: Date
    },
    creatAt:{
        type: Date,
        default: Date.now()
    }
})


userInput.pre("save", async function(next){
    const comparePassword = this.password
    const genSalt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(comparePassword, genSalt)
    this.password = hashPassword
    next()
})

module.exports = mongoose.model("userAccount", userInput)