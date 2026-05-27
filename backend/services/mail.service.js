import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  family: 4,

  tls: {
    rejectUnauthorized: false
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000

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