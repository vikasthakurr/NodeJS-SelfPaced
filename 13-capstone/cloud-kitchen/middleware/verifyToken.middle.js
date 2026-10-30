import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const verificationToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not found" });
  }
  const token = authHeader.split(" ")[1];
  const isValid = jwt.verify(token, process.env.JWT_SECRET);

  if (!isValid) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  req.user = isValid;
  next();
};
export default verificationToken;
