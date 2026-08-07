import express from "express"

const userRoutes= express.Router()

userRoutes.post("/users",(req,res)=>{
  res.status(200).json({
    name:req.body.name
  })
})

export default userRoutes
