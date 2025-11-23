const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🚨 Replace with your Gmail login
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sethuraman0104@gmail.com",
    pass: "Sspg01043016*" // NOT your normal Gmail password
  }
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "sethuraman0104@gmail.com",
    subject: "New Contact Form Submission",
    html: `
      <div style="padding:20px; background:#f5f7fa; border-radius:10px; font-family:Arial;">
        <h2 style="color:#333;">📩 New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send message.");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
