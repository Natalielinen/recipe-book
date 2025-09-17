import nodemailer from "nodemailer";

export const sendEmail = async (
  toEmail: string,
  subject: string,
  message: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};
