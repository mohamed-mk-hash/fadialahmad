import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

function cleanText(value) {
  return String(value || "").trim();
}

app.post("/api/contact", async (req, res) => {
  const firstName = cleanText(req.body.firstName);
  const lastName = cleanText(req.body.lastName);
  const email = cleanText(req.body.email);
  const phone = cleanText(req.body.phone);
  const message = cleanText(req.body.message);

  if (!firstName || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "First name, email, and message are required.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: "New message from website contact form",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Message</h2>

          <p><strong>First name:</strong> ${firstName}</p>
          <p><strong>Last name:</strong> ${lastName || "-"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "-"}</p>

          <hr />

          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
      text: `
New Contact Message

First name: ${firstName}
Last name: ${lastName || "-"}
Email: ${email}
Phone: ${phone || "-"}

Message:
${message}
      `,
    });

    return res.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("Email sending error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Contact API running on port ${PORT}`);
});