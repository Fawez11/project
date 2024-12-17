import nodemailer from "nodemailer";
import { userBlocked } from "./helpers/userBlocked.js";
import moment from "moment";
const transporter = (user, pass) =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user, // Your email
      pass,
    },
  });
export const sendBlockNotification = async (
  receiver,
  userName,
  blockedUntil,
  reason
) => {
  const formattedDate = moment(blockedUntil).format("LLLL");

  const mailOptions = {
    to: receiver,
    subject: "Account Temporarily Blocked",
    html: userBlocked(userName, formattedDate, reason),
  };

  try {
    transporter(process.env.EMAIL_USER, process.env.EMAIL_PASS).sendMail(
      mailOptions
    );
  } catch (error) {
    console.error("Error sending block notification:", error);
    return false;
  }
};
