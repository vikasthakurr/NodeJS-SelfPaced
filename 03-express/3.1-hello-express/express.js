import express from "express";

//defination of server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //home route logic
  res.end("hello from home page");
});

app.get("/about", (req, res) => {
  res.status(200).json({
    message: "hello from about us page",
  });
});
app.listen(3000, () => {
  console.log("server is up and running");
});
