import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }

});

// 🔥 Verificar conexión SMTP al iniciar
transporter.verify((error, success) => {

  if (error) {

    console.log("❌ SMTP VERIFY ERROR:");
    console.log(error);

  } else {

    console.log("✅ SMTP listo para enviar");

  }

});

export const enviarCorreo = async ({ to, subject, text }) => {

  try {

    console.log("📧 Intentando enviar correo...");
    console.log("Destino:", to);

    const info = await transporter.sendMail({

      from: process.env.EMAIL_USER,
      to,
      subject,
      text

    });

    console.log("✅ CORREO ENVIADO");
    console.log(info);

    return true;

  } catch (error) {

    console.log("❌ ERROR REAL SMTP:");
    console.log(error);

    return false;

  }

};