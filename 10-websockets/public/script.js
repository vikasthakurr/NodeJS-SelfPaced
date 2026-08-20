const socket = io();
const username = prompt("Enter your username:");

socket.emit("join", username);

const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");
const messagesDiv = document.getElementById("messages");
const usersEl = document.getElementById("users");
const typingEl = document.getElementById("typing");

let typingTimeout;

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// Typing indicator - emit while user types
messageInput.addEventListener("input", () => {
    socket.emit("typing");
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        socket.emit("stop-typing");
    }, 1000);
});

function sendMessage() {
    const msg = messageInput.value.trim();
    if (msg === "") return;
    socket.emit("send-message", msg);
    socket.emit("stop-typing");
    messageInput.value = "";
}

// Display incoming chat messages
socket.on("chat-message", (data) => {
    const div = document.createElement("div");
    div.classList.add("message");

    if (data.sender === "Server" || data.sender === "server") {
        div.classList.add("server-message");
        div.textContent = data.message;
    } else if (data.sender === username) {
        div.classList.add("my-message");
        div.innerHTML = `<strong>You</strong>: ${data.message}`;
    } else {
        div.classList.add("other-message");
        div.innerHTML = `<strong>${data.sender}</strong>: ${data.message}`;
    }

    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Update online users list - fix: use user.username instead of user (object)
socket.on("online-users", (list) => {
    usersEl.innerHTML = "";
    list.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user.username;
        if (user.username === username) {
            li.classList.add("current-user");
        }
        usersEl.appendChild(li);
    });
});

// Show typing indicator
socket.on("user-typing", (name) => {
    typingEl.textContent = `${name} is typing...`;
});

socket.on("stop-typing", () => {
    typingEl.textContent = "";
});