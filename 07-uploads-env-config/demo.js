import dotenv from "dotenv";
import express from "express";


const app = express();
dotenv.config();

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
