//built-in and third party middleware
import express from "express";
import morgan from "morgan";

const app = express();
// json built in middleware
app.use(express.json());
app.use(morgan("tiny"));

//static middlware to server static files and folder
app.use(express.static("public"));

const PORT = 3000;
app.get("/", (req, res) => {
  res.end("hello world");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.end("login done");
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
