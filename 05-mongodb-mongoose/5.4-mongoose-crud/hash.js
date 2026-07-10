//hashing package
//bcrypt.hash(plainpassword,saltround)=>10
//retrun a hashed password
//register=> username,emaill,password->bcrypt.hash(password,10)=>saved the whole data in db
// 12345=>registered=>1234567898765asdfghj
//compare ->plain passowrd->10->
//bcrypt.compare(plainpassword, hashpassword)=>true or false
import bcrypt from "bcryptjs";

async function hashedPassword() {
  let passowrd = "12345";
  let hashedValue = await bcrypt.hash(passowrd, 10);
  console.log(hashedValue);
}

hashedPassword();
