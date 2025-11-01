const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

let otpStore = {}; // temporary storage (email → otp)

// 📩 Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Email required" });

  // generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  // email setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"CivicConnect" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your verification code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to send OTP" });
  }
});

// ✅ Verify OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email]; // clear it after verification
    return res.json({ valid: true, msg: "OTP verified successfully" });
  }
  return res.status(400).json({ valid: false, msg: "Invalid OTP" });
});

module.exports = router;
