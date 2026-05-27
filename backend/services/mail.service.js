import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  tls: {
    ciphers: "SSLv3"
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000

});

transporter.verify(function(error, success) {

  if (error) {

    console.log("❌ VERIFY ERROR:");
    console.log(error);

  } else {

    console.log("✅ SMTP READY");

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

    console.log("❌ ERROR SMTP:");
    console.log(error);

  }

};