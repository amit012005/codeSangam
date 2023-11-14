const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/students",{
    useNewUrlParser: true
}).then(()=>{
    console.log("database connection successful")
}).catch((e)=>{
    console.log(`no connection`);
})