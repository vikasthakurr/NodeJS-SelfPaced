// const express= require("express")
import express from "express"
// console.log(express)
const server= express()
const PORT=3000;


//root route or homepage
// server.get("/",(req,res)=>{
//     res.end("hello world from express")
// })


server.get("/about",(req,res)=>{
    res.status(200)
    // res.send()
    // res.json()
    // res.setHeader("author","vikas thakur")
    // res.end("hello from about page")
    res.send(`
                <h1>hello</h1>
        `)
})

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})