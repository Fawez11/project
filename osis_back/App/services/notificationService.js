import { sendEmail } from "#utils/mailing/index";
import { Cart, Product, Order, User } from "../models/models.js";

export const sendCartNotification = async (cart, type) => {
  try {
    const completeCart = await getCartWithDetails(cart.id);
    if (!completeCart?.user) return;

    const userName = getUserFullName(completeCart.user);
    await sendNotificationByType(type, completeCart, userName);
  } catch (error) {
    console.error("Error sending cart notification:", error);
  }
};

const getCartWithDetails = async (cartId) => {
  return Cart.findByPk(cartId, {
    include: [
      {
        model: Product,
        as: "products_orders",
        attributes: [
          "id",
          "name",
          "price",
          "finalPrice",
          "isOnSale",
          "discountPercentage",
        ],
        through: {
          model: Order,
          attributes: ["quantity", "unitPrice", "discountPercentage", "total"],
        },
      },
      {
        model: User,
        as: "user",
        attributes: ["firstName", "lastName", "email"],
      },
    ],
  });
};

const getUserFullName = (user) => `${user.firstName} ${user.lastName}`;

const sendNotificationByType = async (type, cart, userName) => {
  switch (type) {
    case "new":
      await sendEmail(process.env.EMAIL_USER, "newCart", userName, null, {
        cart,
        products: cart.products_orders,
      });
      break;

    case "status":
      const status = cart.Approved.toLowerCase();
      await sendEmail(cart.user.email, `cart${status}`, userName, null, {
        cart,
      });
      break;

    case "update":
      await sendEmail(process.env.EMAIL_USER, "cartUpdate", userName, null, {
        cart,
        products: cart.products_orders,
      });
      break;

    case "cancellation":
      await sendEmail(
        process.env.EMAIL_USER,
        "cartCancellation",
        userName,
        null,
        {
          cart,
        }
      );
      break;
  }
};
