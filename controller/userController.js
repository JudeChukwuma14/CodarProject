

const getHomepage = (req, res)=>{
    res.render("index")
}

const getRegister = (req, res)=>{
    res.render("register")
}
const getLogin = (req,res)=>{
    res.render("login")
}

const getHome = async (req, res) => {
    try {
      if (req.user) {
        const userId = req.user.id;
        const user = await userModel.findOne({ _id: userId });
        const slicedName = user.email.split("");
        const currentUser = `${slicedName[0] + slicedName[1] + slicedName[2]}`;
        res.render("index", { currentUser });
      } else {
        res.render("index");
      }
    } catch (err) {
      console.log(err.message);
      res.render("error", { error: err.message });
    }
  };

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