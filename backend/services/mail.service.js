import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  tls: {
    rejectUnauthorized: false
  }
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

    console.error("❌ ERROR SMTP:");
    console.error(error);

  }
};