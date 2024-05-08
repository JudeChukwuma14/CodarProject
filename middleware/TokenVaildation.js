const jwt = require("jsonwebtoken")

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
module.exports= {checkToken}