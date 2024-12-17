import Product from "../product.js";

export const cartHooks = {
  beforeCreate: async (cart) => {
    cart.totalPrice = 0;
    cart.totalSaved = 0;
  },
  afterCreate: async (cart) => {
    console.log(`New cart created: ${cart.id} for user: ${cart.userId}`);
  },
  beforeUpdate: async (cart) => {
    if (cart.changed("Approved")) {
      console.log(`Cart ${cart.id} status changed to ${cart.Approved}`);
    }
  },
  afterUpdate: async (cart) => {
    if (cart.changed("Approved") && cart.Approved === "Rejected") {
      const orders = await cart.getOrders({
        include: [{ model: Product }],
      });

      for (const order of orders) {
        await order.Product.increment("quantity", { by: order.quantity });
      }
    }
  },
};
