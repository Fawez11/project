import nodemailer from "nodemailer";
import { userUnblocked } from "./helpers/userUnblocked.js";

const transporter = (user, pass) =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });

export const sendUnblockNotification = async (receiver, userName) => {
  const mailOptions = {
    to: receiver,
    subject: "Account Unblocked",
    html: userUnblocked(userName),
  };

  try {
    await transporter(process.env.EMAIL_USER, process.env.EMAIL_PASS).sendMail(
      mailOptions
    );
    return true;
  } catch (error) {
    console.error("Error sending unblock notification:", error);
    return false;
  }
};
