import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: "sebastianhermanf@gmail.com",
    pass: "hqbv whpi wjbz pirm",
  },
});

transporter.verify().then(() => {
  console.log("listo para enviar correos");
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: '"Clinica  DD 🦷✨" <sebastianhermanf@gmail.com>', // sender address
      to, 
      subject,
      html,
    });
  } catch (error) {
    console.error(error);
  }
};