import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT;

//mongodb connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongodb database");
  })
  .catch((err) => {
    console.log(err);
  });

//userSchema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

//model

const User = mongoose.model("User", userSchema);

//create a user
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isAlready = await User.findOne({ email });
    if (isAlready) throw new Error("user already exist");
    const user = new User({ username, email, password: hashedPassword });
    const savedUser = await user.save();
    if (!savedUser)
      return res
        .status(400)
        .json({ message: "something went wrong while registering" });
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user does not exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "password not matched" });
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.MY_SECRET,
      {
        expiresIn: "1d",
      },
    );

    console.log(token);
    res.json({ message: "login successfull" });
  } catch (err) {
    console.log(err);
  }
});
app.get("/allusers", async (req, res) => {
  try {
    const users = await User.find();
    if (!users)
      return res
        .status(404)
        .json({ message: "something wrong while listing users" });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//specifc id

// app.get("/users/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await User.findById(id);
//     if (!user) return res.json({ message: "user not available" });
//     res.status(200).json(user);
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.put("/users/:id", async (req, res) => {
//   const id = req.params.id;
//   const user = await User.findByIdAndUpdate(
//     id,
//     { $set: req.body },
//     { new: true },
//   );
//   if (!user) return res.json({ message: "not udpated" });
//   res.status(201).json(user);
// });

// app.delete("/users/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deletedUser = await User.findByIdAndDelete(id);
//     if (!deletedUser) return res.json({ message: "not deleted" });
//     res.json({ message: "deleted successfuly" });
//   } catch (err) {
//     res.status(400).json({ error: err });
//   }
// });
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
