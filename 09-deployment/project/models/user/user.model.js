import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    default: "John Doe",
    minlength: 10,
    maxlength: 20,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 12,
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
    isadmin: true,
    isSuperAdmin: true,
  },
  avatar: {
    type: String,
    default: "vikas.png",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
