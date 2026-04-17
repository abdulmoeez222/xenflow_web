import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string"
      ? JSON.parse(req.body || "{}")
      : req.body || {};

    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    // Configure nodemailer with Gmail (using same sender/receiver as per request)
    // NOTE: This requires EMAIL_USER and EMAIL_PASS (App Password) environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "aiwithmoiz@gmail.com",
        pass: process.env.EMAIL_PASS, // User must set this in their environment
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "aiwithmoiz@gmail.com",
      to: "aiwithmoiz@gmail.com",
      subject: `New Xenflow Contact: ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "N/A"}
        
        Message:
        ${message}
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Thank you! I have received your message and will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}