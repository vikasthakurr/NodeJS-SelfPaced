import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import ApiError from "./utils/ApiError.js";

const PORT = 3000;

const app = express();

const users = [
  { id: 1, name: "vikas" },
  { id: 2, name: "akash" },
];
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res, next) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  if (!user) {
    return next(new ApiError(404, "user not found"));
  }
  res.json(user);
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server is running");
});
