const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/Quizuser",{
    useNewUrlParser: true
}).then(()=>{
    console.log("database connection successful")
}).catch((e)=>{
    console.log(`no connection`);
})