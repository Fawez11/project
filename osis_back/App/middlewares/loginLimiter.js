import rateLimit from "express-rate-limit";
import User from "../models/user.js";
import { sendBlockNotification } from "../../utils/mailing/blockUser.js";
import { blockUser } from "../services/blockService.js";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (user) {
        const reason = "trop de tentatives de connexion échouées";
        const blockedUntil = await blockUser(user.id, 1, reason);

        await sendBlockNotification(
          user.email,
          user.firstName,
          blockedUntil,
          reason
        );

        return res.status(429).json({
          message:
            "Trop de tentatives de connexion. Compte bloqué temporairement pendant 1 heure.",
          blockedUntil,
        });
      }

      return res.status(429).json({
        message:
          "Trop de tentatives de connexion. Veuillez réessayer plus tard.",
      });
    } catch (error) {
      console.error("Erreur dans le limiteur de connexion:", error);
      return res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },
});

export default loginLimiter;
