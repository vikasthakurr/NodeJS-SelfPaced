import express from "express";
import multer from "multer";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded());

// const upload = multer({ dest: "uploads/", limits: 2 * 1024 * 1024 });
const storage = multer.diskStorage({
  destination(req, res, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
app.get("/", (req, res) => {
  res.end("hello server");
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.json(req.file);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
