// import { emit } from "cluster";
// import { emit } from "cluster";
import { EventEmitter } from "events";

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("start", () => {
  console.log("my event started");
});

myEmitter.emit("start");

// emitter.on("greet", () => {
//   console.log("hi good evening");
// });
// emitter.emit("greet");

// emitter.on("userLogin", (username) => {
//   console.log(`${username} logged in`);
// });
// emitter.emit("userLogin", "vikas");

// emitter.once("message", () => {
//   console.log("user 1 done");
// });

// // emitter.on("message", () => {
// //   console.log("user 2 done");
// // });
// emitter.emit("message");
// emitter.emit("vikas");

// const greetUser = () => {
//   console.log("hello");
// };

// emitter.on("greet", greetUser);
// emitter.off("greet", greetUser);
// emitter.emit("greet");

//real world example

// emitter.on("orderCreated", (orderId) => {
//   console.log(`sending the mail for the order ${orderId}`);
// });
// emitter.on("orderCreated", (orderId) => {
//   console.log(`saving the orderid into database`);
// });

// emitter.emit("orderCreated", 101);

// import http from "http";

// const server = http.createServer((req, res) => {
//   let body = "";
//   req.on("data", (chunk) => {
//     body += chunk;
//   });
//   req.on("end", (data) => {
//     console.log("data received", body);
//   });
// });

// server.listen(3000, () => {
//   console.log("server started");
// });
