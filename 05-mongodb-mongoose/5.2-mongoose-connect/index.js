import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";



dotenv.config()
const PORT= process.env.PORT || 8000;

const app= express()

//mongodb connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb connected")
}).catch((err)=>{
    console.log("error connecting db",err)
})

// console.log(result)/

app.get("/",(req,res)=>{
    res.end("hi from mongodb setup")
})

app.listen(PORT,()=>{
    console.log("server started")
})