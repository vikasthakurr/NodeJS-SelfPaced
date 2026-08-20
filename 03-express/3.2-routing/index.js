import express from "express";
import morgan from "morgan";

const app = express();

//json body parser
app.use(express.json());

//form parse data
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//for static assest
app.use(express.static("public"));

app.use(morgan("dev"))
const PORT = 3000;

//allusers
//CRUD->
//POST


app.post("/users", (req, res) => {
  const user = req.body;
  console.log(req.body);
  res.status(201).json({
    message: "user created successfuly",
    user,
  });
});

// app.post("/register",(req,res)=>{
//     console.log(req.body);
//     res.send("form submitted")
// })

// //GET
// app.get("/users", (req, res) => {
//   res.status(200).json({
//     message: "all user fetched",
//   });
// });

//PUT

// app.put("/users/:id", (req, res) => {
//   const id = req.params.id;
//   const updatedData = req.body;

//   res.status(200).json({
//     message: "user updated successfully",
//     updatedData,
//   });
// });

//delete

// app.delete("/users/:id", (req, res) => {
//   const id = req.params.id;

//   res.status(200).json({
//     message: "user deleted successfully",
//     id,
//   });
// });
app.listen(PORT, () => {
  console.log("server is running");
});
