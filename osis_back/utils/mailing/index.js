const clientDomain = process.env.CLIENT_DOMAIN_NAME;
import nodemailer from "nodemailer";
import { changePassword } from "./helpers/changePassword.js";
import { verifyEmail } from "./helpers/verifyEmail.js";
import { userBlocked } from "./helpers/userBlocked.js";
import { cartNotification } from "./helpers/cartNotification.js";
import { orderStatus } from "./helpers/orderStatus.js";
import { cartUpdateNotification } from "./helpers/cartUpdate.js";
import { cartCancellationNotification } from "./helpers/cartCancellation.js";
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
export const sendEmail = (to, type, userName, url, data) => {
  let subject = "";
  let htmlContent = "";

  switch (type) {
    case "changePassword":
      subject = "Osis account change password";
      htmlContent = changePassword(userName, url);
      break;
    case "verifyEmail":
      subject = "Verifiez votre email";
      htmlContent = verifyEmail(url, userName);
      break;
    case "userBlocked":
      subject = "Account Temporarily Blocked";
      htmlContent = userBlocked(userName, text);
      break;
    case "newCart":
      subject = "Nouvelle Commande à Approuver";
      htmlContent = cartNotification(data.cart, data.products, userName);
      break;
    case "cartaccepted":
      subject = "Votre commande a été acceptée";
      htmlContent = orderStatus(data.cart, userName, "accepted");
      break;
    case "cartrejected":
      subject = "Votre commande a été refusée";
      htmlContent = orderStatus(data.cart, userName, "rejected");
      break;
    case "cartpending":
      subject = "Votre commande est en traitement";
      htmlContent = orderStatus(data.cart, userName, "pending");
      break;
    case "status":
      subject = data.category
        ? `Liste des Produits - ${data.category}`
        : "Liste des Produits";
      htmlContent = orderStatus(data.products, data.category);
      break;
    case "cartUpdate":
      subject = "Mise à jour du panier";
      htmlContent = cartUpdateNotification(data.cart, data.products, userName);
      break;
    case "cartCancellation":
      subject = "Annulation de Panier";
      htmlContent = cartCancellationNotification(data.cart, userName);
      break;
    default:
      throw new Error("Invalid email type");
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent,
  };

  return transporter(process.env.EMAIL_USER, process.env.EMAIL_PASS).sendMail(
    mailOptions
  );
};
