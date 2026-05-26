import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const enviarCorreo = async ({ to, subject, text }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });

    console.log("📧 Correo enviado a:", to);

  } catch (error) {
    console.error("❌ Error correo:", error.message);
  }
};