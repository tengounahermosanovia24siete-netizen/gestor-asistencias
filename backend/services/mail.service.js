import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

dns.setDefaultResultOrder("ipv4first");

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS existe:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000

});

export const enviarCorreo = async ({ to, subject, text }) => {

  console.log("📧 Intentando enviar correo...");
  console.log("Destino:", to);

  try {

    const info = await transporter.sendMail({

      from: `"Gestor Asistencias" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text

    });

    console.log("✅ Correo enviado");
    console.log(info.response);

  } catch (error) {

    console.log("❌ ERROR SMTP:");
    console.log(error);

  }

};