import express from "express";
import { body,validationResult } from "express-validator";
const app = express();

app.use(express.json());

const PORT = 3000;
//incorrect path without validation
app.post("/register", (req, res) => {
  console.log(req.body);
  res.json({ message: "user registerd" });
});

//with validation
app.post("/login", [
  body("username").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req).formatWith((error) => error.msg);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    res.json({ message: "login successful" });
  },
]);

app.listen(PORT, () => {
  console.log("server has started at port 3000");
});
