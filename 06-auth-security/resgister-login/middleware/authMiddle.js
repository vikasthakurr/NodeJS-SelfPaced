import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const verification = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(404).json({ message: "please provide the token" });
    }
    const token = authHeader.split(" ")[1];
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (!isValid) return res.status(401).json({ message: "invalid token" });
    req.user = isValid;
    next();
  } catch (err) {
    res.json({ message: err.message });
  }
};
export default verification;
