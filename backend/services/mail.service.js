import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const enviarCorreo = async ({ to, subject, text }) => {

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS existe:", !!process.env.EMAIL_PASS);

  try {

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });

    console.log("✅ Correo enviado");
    console.log(info);

  } catch (error) {

    console.error("❌ ERROR REAL:");
    console.error(error);

  }
};