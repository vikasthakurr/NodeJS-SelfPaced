import fs from "fs";

// fs.readFile("data.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("error while reading file", err.message);
//     return;
//   }
//   console.log(data);
// });

// fs.writeFile("log.txt", "hello world-2", (err) => {
//   if (err) {
//     console.log("error while writing file", err.message);
//     return;
//   }
//   console.log("file created");
// });

// fs.appendFile("log.txt","\n hello from vikas",(err)=>{
//     if(err){
//         console.log("error while appending",err.message);
//         return;
//     }
//     console.log("file updated")
// })
// fs.unlink("data.txt", (err) => {
//   if (err) {
//     console.log("error while removing the file", err.message);
//     return;
//   }
//   console.log("file removed");
// });

//sync way
//process-1
// fs.writeFileSync("demo.txt","hii");
//process-3

// let data=fs.readFileSync("demo.txt","utf-8");
// console.log(data)
