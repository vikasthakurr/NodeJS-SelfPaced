import express from "express";
import errorHandler from "./middleware/errorHandler";
import ApiError from "./utils/ApiError";

const app = express();

const PORT = 3000;
let users = [
  { id: 1, name: "vikas" },
  { id: 2, name: "akash" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

//error

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  if (!user) {
    return next(new ApiError("id not found", 404));
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
