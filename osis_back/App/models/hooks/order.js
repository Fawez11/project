export const ordersHooks = {
  beforeValidate: async (order) => {
    const product = await order.getProduct();
    if (product) {
      order.unitPrice = product.getCurrentPrice();
      order.originalPrice = product.price;
      order.discountPercentage =
        product.isOnSale && product.discountPercentage
          ? product.discountPercentage
          : null;
      order.savedAmount = order.discountPercentage
        ? (order.originalPrice * order.quantity * order.discountPercentage) /
          100
        : 0;
      order.total = order.unitPrice * order.quantity;
    }
  },
  afterCreate: async (order) => {
    const cart = await order.getCart({
      transaction: order.sequelize.transaction(),
    });
    if (cart) {
      try {
        const orders = await cart.getOrders();
        const totals = orders.reduce(
          (acc, o) => ({
            totalPrice: acc.totalPrice + Number(o.total),
            totalSaved: acc.totalSaved + Number(o.savedAmount),
          }),
          { totalPrice: 0, totalSaved: 0 }
        );

        await cart.update(totals, {
          transaction: order.sequelize.transaction(),
        });
        await order.sequelize.transaction().commit();
      } catch (error) {
        await order.sequelize.transaction().rollback();
        throw error;
      }
    }
  },
};
