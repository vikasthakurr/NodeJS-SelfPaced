import http from "http";
import { json } from "stream/consumers";
import fs from "fs";
// console.log(http);

//instance of server
const server = http.createServer(function (req, res) {
  //   console.log(req.url);
  //   console.log(req.method);
  //   res.end("hello from geeksforgeeks");
  let data = {
    fname: "vikas",
    age: 26,
    role: "SDE-Backend & mentor",
  };

  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.end("hello from home page");
  } else if (req.url === "/about" && req.method === "GET") {
    res.statusCode = 200;
    // res.end("hi from about page");
    res.setHeader("content-type", "application/text");
    res.end(JSON.stringify(data));
  } else if (req.url === "/products" && req.method === "GET") {
    fs.readFile("./data.json", "utf-8", (err, data) => {
      if (err) return err;
      else {
        res.end(data);
      }
    });
  } else if (req.url === "/register" && req.method === "POST") {
    res.statusCode = 201;
    res.end("user registered");
  } else {
    res.statusCode = 404;
    res.end("invalid route");
  }
});

server.listen(3000, function () {
  console.log("server has started");
});
