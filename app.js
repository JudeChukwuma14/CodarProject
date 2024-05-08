const express = require("express");
const expressHbs = require("express-handlebars");
const cookies = require("cookie-parser");
const expressFileUpload = require("express-fileupload");
require("dotenv").config()
const routerLink = require("./route/allRouter")
const mongoose = require("mongoose");

mongoose.connect(process.env.Mongoose_Url).then(()=>{
  console.log("DB connection established")
}).catch((err)=>{
  console.log(err.message)
})
const app = express();
app.engine(
  "hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set('view engine', 'hbs');

app.use(cookies());
app.use(expressFileUpload());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routerLink)
const port = process.env.Port_Number;
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
