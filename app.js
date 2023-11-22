const express=require("express");
const path=require("path");
require("./src/db/connect");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");

// const Register = require("./src/models/registers");


const Question = require('./src/models/question');

// const { log } = require("console");
//const static_path=path.join(__dirname,"../views");


const app=express();
const port=process.env.port ||3000; //if we host then port will be generated automatically

app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended:true}));




// mongoose.connect("mongodb://localhost:27017/students",{
//     useNewUrlParser: true
// }).then(()=>{
//     console.log("connection successful")
// }).catch((e)=>{
//     console.log(`no connection`);
// });

const studentSchema=new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    },
    confirmpassword :{
         type:String,
         required:true
    }
});

//creating collection,defining model ,class

const Register=new mongoose.model("Register",studentSchema);
// const register=new Regiter({
//     username:"Shivanand",
//     email:"shivanand@123gmail.com",
//     password:"shivanand",
//     confirmpassword:"shivanand"
// })

// module.export=Register;




app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.get("/userLogin",(req,res)=>{
    res.render("userLogin.ejs");
})
app.get("/adminLogin",(req,res)=>{
    res.render("adminLogin.ejs");
})
app.get("/userSignup",(req,res)=>{
    res.render("userRegister.ejs");
})
app.get("/adminSignup",(req,res)=>{
    res.render("adminRegister.ejs");
})

// app.get("/register",(req,res)=>{
//     res.render("register.ejs");
// })
app.get("/aboutus",(req,res)=>{
    res.render("aboutus.ejs");
})
app.get("/user-profile",(req,res)=>{
    res.render("user-profile.ejs");
})

app.post("/register",async (req,res)=>{
    try {
        var pass=req.body.password;
        var cpass=req.body.confirmpassword;
        if(pass===cpass){
         let newStudent= new Register({
          username:req.body.username,
          email:req.body.email,
          password:req.body.password,
          confirmpassword:req.body.confirmpassword
         });
     
          newStudent.save();
          res.redirect("login");
        }else{
          await alert("password doesn't match");
          res.redirect("register.ejs");
        }
    } catch (error) {
        res.status(400).send(error);
      }
})

app.post("/login",async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        console.log(`${email} , ${password}`);
       const useremail =await Register.findOne({email:email});
       console.log(useremail);
       if(useremail.password===password){
        res.render("inside.ejs");
       }else{
        alert("invalid Username or password");
        res.render("login.ejs")
       }
    } catch (error) {
        res.status(400).send(error);
    }
})


// const sampleQuestion = {
//     question_text: "What is the capital of France?",
//     correct_answer: "Paris",
//     wrong_answers: ["Berlin", "London", "Madrid"]
// };

// Question.create(sampleQuestion, (err, question) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(`Question inserted with the _id: ${question._id}`);
//     }
// });

// // Retrieve a random question
// Question.countDocuments((err, count) => {
//     const random = Math.floor(Math.random() * count);
//     Question.findOne().skip(random).exec((err, randomQuestion) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log("Random Question:", randomQuestion);
//         }
//     });
// });








app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})