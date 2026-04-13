import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/contact", async (req, res) => {
  const data = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "astrologer@email.com",
      subject: "New Contact Form",
 html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1e1b4b; padding:20px; font-family:Arial;">
  <tr>
    <td align="center">
      
      <table width="400" cellpadding="0" cellspacing="0" style="background-color:#2e1065; border-radius:15px; padding:20px; color:white;">
        
        <!-- Header -->
        <tr>
          <td align="center">
            <img src="https://i.imgur.com/yourlogo.png" width="70" />
            <h2 style="color:#facc15; margin:10px 0;">✨ Astro Tulika ✨</h2>
            <p style="color:#ccc;">Astrology Guidance</p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="background-color:#4c1d95; padding:15px; border-radius:10px;">
            <p><b>👤 Name:</b> ${data.name}</p>
            <p><b>📧 Email:</b> ${data.email}</p>
            <p><b>📱 Phone:</b> ${data.phone}</p>
            <p><b>📍 Location:</b> ${data.location}</p>

            <hr style="border:1px solid #ccc;" />

            <p><b>💬 Message:</b></p>
            <p style="background:white; color:black; padding:10px; border-radius:8px;">
              ${data.message}
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding-top:10px; font-size:12px; color:#aaa;">
            🌌 Powered by Astro Tulika
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
` 
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Email failed" });
  }
});

app.listen(5000, () => console.log("Server running"));