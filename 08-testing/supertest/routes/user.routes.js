import express from "express";

const userRoutes = express.Router();

userRoutes.post("/users", (req, res) => {
  res.status(201).send({ name: req.body.name });
});

export default userRoutes;

//route ->middleware=>controller->output
