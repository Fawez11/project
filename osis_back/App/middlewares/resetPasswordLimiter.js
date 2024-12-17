import rateLimit from "express-rate-limit";
import User from "../models/user.js";
import { sendBlockNotification } from "../../utils/mailing/blockUser.js";
import { blockUser } from "../services/blockService.js";

const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  handler: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id);

      if (user) {
        const reason = "trop de tentatives de réinitialisation du mot de passe";
        const blockedUntil = await blockUser(id, 24, reason);

        await sendBlockNotification(
          user.email,
          user.firstName,
          blockedUntil,
          reason
        );
      }

      res.status(429).json({
        message:
          "Trop de tentatives de réinitialisation. Compte bloqué temporairement pendant 24 heures.",
      });
    } catch (error) {
      console.error("Error in reset password limiter:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  skipSuccessfulRequests: false,
});

export default resetPasswordLimiter;
