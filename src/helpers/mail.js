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
  
transporter.verify().then(()=>{
    console.log("listo para enviar correos")
})

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: '"Prueba CID 👻" <sebastianhermanf@gmail.com>', // sender address
      to,   // list of receivers
      subject,  
      text: "Hello world?", // plain text body
      html,  
    });
  } catch (error) {
    console.error(error);
  }
}