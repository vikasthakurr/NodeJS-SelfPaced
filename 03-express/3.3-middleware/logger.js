import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const PORT = 3000;

const username = "vikas";
const password = "vikas123";

//authentication middleware

// userrequest-->middleware-->route--> response
app.use((req, res, next) => {
  if (req.body.username === username && req.body.password === password) {
    console.log("credentials are good to go");
    next();
  } else {
    res.status(400).json({ message: "credentials are invalid" });
  }
});

app.use((req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `\n${req.body.username} has tried to login at ${Date.now()} at ${req.url}`,
    (err, data) => {
      if (err) console.log(err);
      else res.end("logs updated");
    },
  );
});
app.get("/", (req, res) => {
  res.end("welcome to home page");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.end("login done");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
