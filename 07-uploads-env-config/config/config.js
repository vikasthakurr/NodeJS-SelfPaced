import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  mongodb: process.env.MONGO_URL,
};
