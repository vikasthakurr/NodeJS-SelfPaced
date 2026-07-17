import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
const app = express();
app.use(helmet());
app.use(morgan("combined"));
app.use(
  cors({
    origin: "https://www.geeksforgeeks.org",
  }),
);

const PORT = 3000;

const limit = rateLimit({
  windowMs: 15 * 60 * 60,
  max: 2,
  message: "too many request",
});

// localhost:3000
//localhost:5173
//cors=>cross origin resources sharing

// app.use(limit());
app.get("/", limit, (req, res) => {
  res.end("hi from home");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
