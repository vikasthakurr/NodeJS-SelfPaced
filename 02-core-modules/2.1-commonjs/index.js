// const { mult } = require("./math");
// console.log(mult(5, 9));
// const http = require("http");
// console.log(example);
// console.log(example(4, 6));
// console.log(maths);
// console.log(maths.add(5, 6));
// console.log(maths.mult(7, 7));
// console.log(http);

// const os = require("os");
// console.log(os.cpus().length);
const fs = require("fs");
console.log("hi");
// const data = fs.readFileSync("./vikas.txt", "utf-8");
// console.log(data);
fs.readFile("./vikas.txt", "utf-8", (err, data) => {
  if (err) return console.log(err);
  console.log(data);
});
console.log("bye");
