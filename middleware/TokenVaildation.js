const jwt = require("jsonwebtoken")
const userAuth = require("../model/userModel")
const checkToken =(req, res, next)=>{
    const token = req.cookies.Nexusplus
    if(token){
        jwt.verify(token,process.env.JWT_SECRET_KEY, (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect("/login")
            }else{
                console.log(decodedToken) 
                next()
            }
        })
    }else{
        res.redirect("/login")
    }
}

const checkLoggedUser = (req, res, next)=>{
    const token = req.cookies.Nexusplus
    if(token){
        jwt.verify(token,process.env.JWT_SECRET_KEY, async (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                res.locals.user = null
            }else{
                req.user = decodedToken
                let user = await userAuth.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }else{
        res.locals.user = null
    }
}
module.exports= {checkToken, checkLoggedUser}