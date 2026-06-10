import express from "express";
const app = express();
app.use(express.json());

const PORT = 3000;

//crud operation routes

//request-->route-->controller logic -->response

//get route
app.get("/", (req, res) => {
  res.end("hello from home page");
});

app.get("/about", (req, res) => {
  res.status(200).json({ message: "this is about us page" });
});

app.get("/users", (req, res) => {
  console.log(req.query.category);
  res.status(200).json({ message: "fetching all users" });
});

app.get("/users/:id", (req, res) => {
  console.log(Number(req.params.id));
  res.end(`fetching user with id ${Number(req.params.id)}`);
});

app.get("/users/:userId/orders/:orderId", (req, res) => {
  console.log(Number(req.params.userId, req.params.orderId));

  res.end(
    `fetching order with id ${Number(req.params.orderId)} from user with id ${Number(req.params.userId)}`,
  );
});

app.post("/register", (req, res) => {
  //logic`
  console.log(req.body);
  res.end("user registered success");
});

app.put("/update/:id", (req, res) => {
  const userId = Number(req.params.id);
  //logic
  res.end("user updated success");
});

app.delete("/deactivate/:userId", (req, res) => {
  const userId = Number(req.params.id);
  //logic
  res.status(200).json({ message: "user deleted successfuly" });
});

app.listen(PORT, () => {
  console.log("server started");
});
