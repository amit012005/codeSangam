const express=require("express");
const path=require("path");
require("./src/db/connect");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");


const app=express();
const port=process.env.port ||3000; //if we host then port will be generated automatically

app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended:true}));


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



const adminSchema=new mongoose.Schema({
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

const Admin=new mongoose.model("Admin",studentSchema);






// Define the schema for Multiple Choice Questions
const mcqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],  // Assuming options are strings
    required: true,
  },
  correctAnswer: {  // Renamed from correctOption to be consistent with the front-end
    type: String,
    required: true,
  },
});

// Define the schema for True/False Questions
const trueFalseSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  isTrue: {
    type: Boolean,
    required: true,
  },
});

// Define the schema for Short Answer Questions
const shortAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
});

// Define the main schema for all types of questions
const questionSchema = new mongoose.Schema({
  quizTitle: {
    type: String,
    required: true,
  },
  quizType: {
    type: String,
    enum: ['mcq', 'trueFalse', 'shortAnswer'],
    required: true,
  },
  numQuestions: {
    type: Number,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'quizType', // Dynamic reference based on the quizType field
    },
  ],
  // New fields added to the main schema
  options: {
    type: [[String]],  // Assuming options for all questions (2D array)
    required: true,
  },
  correctAnswers: {
    type: [String],
    required: true,
  },
});

// Create models based on the defined schemas
const MCQ = mongoose.model('MCQ', mcqSchema);
const TrueFalse = mongoose.model('TrueFalse', trueFalseSchema);
const ShortAnswer = mongoose.model('ShortAnswer', shortAnswerSchema);
const Question = mongoose.model('Question', questionSchema);


app.post('/saveQuestions', async (req, res) => {
    try {
      const { quizTitle, quizType, numQuestions, questions, options, correctAnswers } = req.body;
  
      // Check if the required fields are provided
      if (!quizTitle || !quizType || !numQuestions || !questions || !options || !correctAnswers) {
        return res.status(400).send('Incomplete data. Please provide all required fields.');
      }
  
      // Create a new question document
      const question = new Question({
        quizTitle,
        quizType,
        numQuestions,
        questions,
        options,
        correctAnswers,
      });
  
      // Save the question to the database
      await question.save();
  
      res.send('Questions saved successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  


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

app.get("/aboutus",(req,res)=>{
    res.render("aboutus.ejs");
})
app.get("/user-profile",(req,res)=>{
    res.render("user-profile.ejs");
})


app.post("/userRegister",async (req,res)=>{
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
          res.redirect("userLogin");
        }else{
          await alert("password doesn't match");
          res.redirect("userRegister");
        }
    } catch (error) {
        res.status(400).send(error);
      }
})

app.post("/userLogin",async(req,res)=>{
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
        res.render("login.ejs");
       }
    } catch (error) {
        res.status(400).send(error);
    }
})



app.post("/adminRegister",async (req,res)=>{
    try {
        var pass=req.body.password;
        var cpass=req.body.confirmpassword;
        if(pass===cpass){
         let newAdmin= new Admin({
          username:req.body.username,
          email:req.body.email,
          password:req.body.password,
          confirmpassword:req.body.confirmpassword
         });
     
          newAdmin.save();
          res.redirect("adminLogin");
        }else{
          await alert("password doesn't match");
          res.redirect("userRegister");
        }
    } catch (error) {
        res.status(400).send(error);
      }
})

app.post("/adminLogin",async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        console.log(`${email} , ${password}`);
       const useremail =await Admin.findOne({email:email});
       console.log(useremail);
       if(useremail.password===password){
        res.render("admin-dashboard.ejs");
       }else{
        alert("invalid Username or password");
        res.render("adminLogin.ejs");
       }
    } catch (error) {
        res.status(400).send(error);
    }
})





app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})