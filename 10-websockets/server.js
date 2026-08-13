const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // New User Joined
    socket.on("join", (username) => {

        socket.username = username;

        onlineUsers.push({
            id: socket.id,
            username
        });

        io.emit("online-users", onlineUsers);

        io.emit("chat-message", {
            sender: "Server",
            message: `${username} joined the chat`
        });
    });
    socket.on("send-message", (message) => {

        io.emit("chat-message", {
            sender: socket.username,
            message
        });

    });
    //typing indicators
    socket.on("typing",()=>{
        socket.broadcast.emit("user-typing",socket.username)
    })

    //stop typing
    socket.on("stop-typing",()=>{
        socket.broadcast.emit("stop-typing")
    })

    // Disconnect

    socket.on("disconnect",()=>{
        onlineUsers=onlineUsers.filter(
            user=>user.id !==socket.id
        );

        io.emit("online-users",onlineUsers)

        io.emit("chat-message",{
            sender: "Server",
            message: `${socket.username || "A user"} left the chat`

        })
        console.log("disconnected",socket.id)
    })

});





server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});