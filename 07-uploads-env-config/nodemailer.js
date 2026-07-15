import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
const app = express();
dotenv.config();

const PORT = process.env.PORT;

//click on dp ->manage profile->security &signin->app password->nodemailer

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASS,
  },
});

// const mailOption = {
//   from: process.env.MY_EMAIL,
//   to: process.env.MY_EMAIL,
//   subject: "Welcome to backend course by vikas thakur",
//   body: "Geeksforgeeks welcomes you all students",
// };

// transport.sendMail(mailOption, (err, info) => {
//   if (err) return err;
//   else {
//     console.log(`mail has been sent successfully`);
//     console.log(info);
//   }
// });

app.post("/sendMail", async (req, res) => {
  try {
    const { to, subject, body } = req.body;

    await transport.sendMail({ to, subject, body });
    return res.status(200).send("mail sent successfully");
    console.log("mail sent successfully");
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
