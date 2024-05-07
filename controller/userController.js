

const getHomepage = (req, res)=>{
    res.render("index")
}

const getRegister = (req, res)=>{
    res.render("register")
}
const getLogin = (req,res)=>{
    res.render("login")
}

const postRegister = async(req, res)=>{
    try {
        const {name, email, password, retypePassword} = req.body
        const userArr = ["name", "email", "password", "retypePassword"]
        const emptyArr = []
        for(const child of userArr){
            if(!child[req.body] || child[req.body] === ""){
                emptyArr.push(child) 
            }
        }
        if(emptyArr.length > 0){
            res.render("register", {
                error: `This Field(s) ${emptyArr.join(" ,")} cannot be empty`
            })
        }
    } catch (error) {
        
    }
}

module.exports ={getHomepage, getRegister, getLogin}