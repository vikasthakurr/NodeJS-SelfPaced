import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/login" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      console.log(body);
    });
  }
});
server.listen(3000);

// const emitter = new EventEmitter();

// emitter.on("orderplaced", (username) => {
//   console.log(`mail has been sent to user ${username} `);
// });
// emitter.on("sayHi", () => {
//   console.log("hi good morning");
// });

// emitter.emit("orderplaced", "vikas");
// emitter.emit("sayHi");
