const express =require("express")
const http=require("http")
const {Server}=require("socket.io")
const app=express()

const server=http.createServer(app)

//attach a socket connection

const io=new Server(server)

app.use(express.static("public"));

io.on("connection",(socket)=>{
    console.log("new connection detected",socket.id)
})
server.listen(3000,()=>{

    console.log("server is running on port 3000")

})