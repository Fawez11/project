import cron from "node-cron";
import User from "../models/user.js";
import moment from "moment";
import { Op } from "sequelize";
import { sendUnblockNotification } from "../../utils/mailing/unblockUser.js";

// Run every 5 minutes instead of every minute
cron.schedule("*/5 * * * *", async () => {
  try {
    // Add limit and batch processing
    const batchSize = 100;
    let processed = 0;

    while (true) {
      const blockedUsers = await User.findAll({
        where: {
          isBlocked: true,
          blockedUntil: {
            [Op.lt]: new Date(),
          },
        },
        limit: batchSize,
        offset: processed,
        attributes: [
          "id",
          "email",
          "firstName",
          "lastName",
          "isBlocked",
          "blockedUntil",
        ],
      });

      if (blockedUsers.length === 0) break;

      await User.update(
        {
          isBlocked: false,
          blockedUntil: null,
          blockReason: null,
        },
        {
          where: {
            id: blockedUsers.map((user) => user.id),
          },
        }
      );

      // Send unblock notifications
      for (const user of blockedUsers) {
        await sendUnblockNotification(
          user.email,
          `${user.firstName} ${user.lastName}`
        );
      }

      processed += blockedUsers.length;
      if (blockedUsers.length < batchSize) break;
    }
  } catch (error) {
    console.error("Error in unblock cron job:", error);
  }
});

export const blockUser = async (userId, hours = 24, reason) => {
  const blockedUntil = moment().add(hours, "hours").toDate();

  await User.update(
    {
      isBlocked: true,
      blockedUntil,
      blockReason: reason,
    },
    { where: { id: userId } }
  );

  return blockedUntil;
};
