const express = require ("express")
const mongoose = require ("mongoose")
const bcrypt = require ("bcrypt")
const cors = require ("cors")
const jwt = require ("jsonwebtoken")

const QuizRoutes = require('./routes/quizRoutes');
const quiz = require('./models/quiz');


const userModel=require("./models/users")
const ecomodel = require("./models/users")

let app=express()
app.use(express.json())
app.use(cors())

app.use(bodyParser.json());


const generateHashedpassword=async (password)=>{
    const salt=await bcrypt.genSalt(10)
     return bcrypt.hash(password,salt)
}

mongoose.connect("mongodb+srv://sandras02:sandrasmenon@cluster0.3g103sn.mongodb.net/ecovibe?retryWrites=true&w=majority&appName=Cluster0")



app.use('/api/quiz', QuizRoutes);
// api for signup

app.post("/signup",async(req,res)=>{
    let input = req.body
    let hashedpassword=await generateHashedpassword(input.password)

    console.log(hashedpassword)
    input.password = hashedpassword
    let eco= new ecomodel((input))
    eco.save()
    res.json({"status":"success"})
})

// api for sign in

app.post("/signin",async(req,res)=>{
   let input=req.body
   ecomodel.find({"emailid":req.body.emailid}).then(
    (response)=>{
        if (response.length>0) {
            let dbpassword = response[0].password
            console.log(response)
            bcrypt.compare(input.password,dbpassword,(error,isMatch)=>{
                if (isMatch) {
                 jwt.sign({email:input.emailid},"ecovibe",{expiresIn:"1d"},(error,token)=>{
                    if (error) {
                        res.json({"status":"unable to create token"})
                        
                    } else {
                        res.json({"status":"success",userId:response[0]._id,"token":token})
                    }
                 }) 



                } else {
                    res.json({"status":"incorrect"})
                }
            })
            
        } else {
            res.json({"status":"user does not exist"})
        }
    }
   ).catch()
})





app.listen(9090,()=>{
    console.log("server started")
})