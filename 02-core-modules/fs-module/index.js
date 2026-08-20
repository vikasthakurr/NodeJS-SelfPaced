import fs from "fs";

// console.log(fs)

//write file
// fs.writeFileSync("log.txt","hello from vikas")
// fs.writeFileSync("log.txt","hi")
// fs.writeFile("log.txt", "hi from nodejs", (err) => {
//   if (err) return;
//   console.log("data has been written");
// });

// fs.appendFile("log.txt", "\nhow are you", (err) => {
//   if (err) return;
//   console.log("data has been appended");
// });

// fs.readFile("log.txt", "utf-8", (err, data) => {
//   if (err) return;
//   console.log(data);
// });

// fs.unlink("log.txt",(err)=>{
//     if(err) return;
//     console.log("file deleted")
// })

// if (fs.existsSync("log.txt")) {
//   console.log("file is there in folder");
// }

console.log("hi");
// fs.readFileSync("log.txt","utf-8");
fs.readFile("log.txt", "utf-8", (err, data) => {
  if (err) return;
  console.log(data);
});
console.log("end")