//route or integration testing using supertest
import express from "express";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});
app.use(userRoutes)

export default app;
