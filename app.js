const express = require ("express")
const mongoose = require ("mongoose")
const bcrypt = require ("bcrypt")
const cors = require ("cors")
const jwt = require ("jsonwebtoken")


const userModel=require("./models/users")
const ecomodel = require("./models/users")

let app=express()
app.use(express.json())
app.use(cors())


const generateHashedpassword=async (password)=>{
    const salt=await bcrypt.genSalt(10)
     return bcrypt.hash(password,salt)
}

mongoose.connect("mongodb+srv://sandras02:sandrasmenon@cluster0.3g103sn.mongodb.net/ecovibe?retryWrites=true&w=majority&appName=Cluster0")
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


app.listen(9090,()=>{
    console.log("server started")
})