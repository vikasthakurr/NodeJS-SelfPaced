import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

//browser/postman/thunderclient --> valid route--> contoller logic--> response
//req.params
//req.query
//req.headers
//req.url
//req.method
//req.body

//status code ->current status of my request
//100-199 -->information status
//200-299 --> successful response status
//300-399 -> redirection response
//400-499 --> client side response
//500-599 --> server side response

app.get("/users/:userId/orders/:orderId", (req, res) => {
  //   console.log(req.headers);
  //   console.log(req.url);
  //   console.log(req.method);
  console.log(req.params.userId, req.params.orderId);
  res.end("hi from homepage");
});

app.get("/products", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  res.end("hi from products page");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.end("hi");
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
