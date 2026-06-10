import express from "express";
const app = express();

const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log("giving the output");
  next();
});

app.use((req, res, next) => {
  console.log("checking user credentials");
  next();
});

// function logger(req, res, next) {
//   console.log(req.url && req.method);
//   next();
// }
// app.use((req, res, next) => {
//   //logic
//   req.user = {
//     name: "vikas",
//   };
//   next();
// });

app.get("/", (req, res) => {
//   console.log(req.user.name);
  res.end("hi from home page");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "user logged in" });
});

app.listen(PORT, () => {
  console.log("server started");
});
