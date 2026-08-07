import express from "express"
import userRoutes from "./routes/user.routes.js"

const app=express()
app.use(express.json())


app.get("/",(req,res)=>{
    req.end("hello world")
})

app.use(userRoutes)

export default app