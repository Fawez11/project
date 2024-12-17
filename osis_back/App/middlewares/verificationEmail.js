import rateLimit from "express-rate-limit";
import User from "../models/user.js";
import { sendBlockNotification } from "../../utils/mailing/blockUser.js";
import { blockUser } from "../services/blockService.js";

const verificationEmailLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.body.email || req.query.email,
  handler: async (req, res) => {
    try {
      const userEmail = req.body.email || req.query.email;
      const user = await User.findOne({ where: { email: userEmail } });

      if (user) {
        const reason = "trop de tentatives de vérification d'email";
        const blockedUntil = await blockUser(user.id, 12, reason);

        await sendBlockNotification(
          user.email,
          user.firstName,
          blockedUntil,
          reason
        );
      }

      res.status(429).json({
        message:
          "Trop de tentatives de vérification. Compte bloqué temporairement pendant 12 heures.",
        blockedUntil,
      });
    } catch (error) {
      console.error("Error in verification email limiter:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
});

export default verificationEmailLimiter;
