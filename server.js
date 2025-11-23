const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS
  }
});

// Send email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${process.env.GMAIL_USER}>`,
    replyTo: email,
    to: process.env.GMAIL_USER,
    subject: "New Contact Form Submission",
    html: `
      <div style="max-width:600px;margin:auto;padding:20px;background:#f5f7fa;border-radius:12px;font-family:Arial,sans-serif;">
        <div style="text-align:center;margin-bottom:20px;">
          <img src="cid:farzanalogo" width="120" alt="Farzana Trading Logo"/>
        </div>
        <h2 style="color:#d92528;">📩 New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <hr>
        <p style="font-size:12px;color:#555;text-align:center;">© 2025 Farzana Trading Company | Designed by HR INFO</p>
      </div>
    `,
    attachments: [
      {
        filename: "farzanalogo.png",
        path: path.join(__dirname, "public/images/farzanalogo.png"),
        cid: "farzanalogo"
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Message sent successfully!");
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).send("Failed to send message.");
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
