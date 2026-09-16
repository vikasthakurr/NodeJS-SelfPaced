import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import ApiError from "./utils/ApiError.js";

const app = express();

const PORT = 3000;
let users = [
  { id: 1, name: "vikas" },
  { id: 2, name: "akash" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

// Pass `next` so we can forward errors to the centralized handler
app.get("/users/:id", (req, res, next) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);

  if (!user) {
    // throw err + message via the ApiError class
    return next(new ApiError("User not found", 404));
  }

  res.json(user);
});

// Centralized error handler must be registered AFTER all routes
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
