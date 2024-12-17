export const initializeHooks = (models) => {
  const { Product, Cart, Order } = models;

  const calculateFinalPrice = (product) => {
    if (product.isOnSale && product.discountPercentage) {
      const discount = (product.price * product.discountPercentage) / 100;
      return Number(product.price) - discount;
    }
    return Number(product.price);
  };

  // Product Hooks
  Product.addHook("beforeValidate", async (product) => {
    try {
      product.finalPrice = calculateFinalPrice(product);
    } catch (error) {
      throw new Error("Erreur lors du calcul du prix final");
    }
  });

  Product.addHook("beforeCreate", async (product) => {
    try {
      product.name = product.name.toLowerCase();
      product.availability = product.quantity > 0 && !product.disabled;
      if (!product.finalPrice) {
        product.finalPrice = calculateFinalPrice(product);
      }
    } catch (error) {
      throw new Error("Erreur lors de la création du produit");
    }
  });

  Product.addHook("beforeUpdate", async (product) => {
    try {
      if (product.changed("name")) {
        product.name = product.name.toLowerCase();
      }
      if (product.changed("quantity") || product.changed("disabled")) {
        product.availability = product.quantity > 0 && !product.disabled;
      }
      if (
        product.changed("price") ||
        product.changed("discountPercentage") ||
        product.changed("isOnSale")
      ) {
        product.finalPrice = calculateFinalPrice(product);
      }
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour du produit");
    }
  });

  Product.addHook("beforeDestroy", async (product) => {
    const pendingOrders = await product.countOrders({
      include: [
        {
          model: Cart,
          where: { Approved: "Pending" },
        },
      ],
    });
    if (pendingOrders > 0) {
      throw new Error("Cannot delete product with pending orders");
    }

    const associatedSlider = await models.Slider.findOne({
      where: { productId: product.id },
    });

    if (associatedSlider) {
      await associatedSlider.update({ productId: null });
    }
  });

  // Order Hooks
  Order.addHook("beforeValidate", async (order, options) => {
    try {
      const product = await Product.findByPk(order.productId, {
        transaction: options.transaction,
      });

      if (!product) {
        throw new Error("Produit non trouvé");
      }

      if (order.quantity > product.quantity) {
        throw new Error(`Stock insuffisant pour ${product.name}`);
      }

      order.unitPrice = product.finalPrice;
      order.originalPrice = product.price;
      order.discountPercentage = product.isOnSale
        ? product.discountPercentage
        : null;
      order.savedAmount = order.discountPercentage
        ? (order.originalPrice * order.quantity * order.discountPercentage) /
          100
        : 0;
      order.total = order.unitPrice * order.quantity;
    } catch (error) {
      throw new Error(`Erreur de validation: ${error.message}`);
    }
  });

  Order.addHook("afterCreate", async (order, options) => {
    try {
      const transaction = options.transaction;
      const cart = await Cart.findByPk(order.cartId, {
        transaction,
        rejectOnEmpty: true,
      });

      const orders = await Order.findAll({
        where: { cartId: cart.id },
        transaction,
      });

      const totals = orders.reduce(
        (acc, o) => ({
          totalPrice: acc.totalPrice + Number(o.total),
          totalSaved: acc.totalSaved + Number(o.savedAmount),
        }),
        { totalPrice: 0, totalSaved: 0 }
      );

      await cart.update(totals, { transaction });
    } catch (error) {
      console.error("Error in Order afterCreate hook:", error);
      throw error;
    }
  });

  Order.addHook("afterUpdate", async (order, options) => {
    try {
      const transaction = options.transaction;
      const cart = await Cart.findByPk(order.cartId, { transaction });

      if (cart) {
        const orders = await Order.findAll({
          where: { cartId: cart.id },
          transaction,
        });

        const totals = orders.reduce(
          (acc, o) => ({
            totalPrice: acc.totalPrice + Number(o.total),
            totalSaved: acc.totalSaved + Number(o.savedAmount),
          }),
          { totalPrice: 0, totalSaved: 0 }
        );

        await cart.update(totals, { transaction });
      }
    } catch (error) {
      console.error("Error in Order afterUpdate hook:", error);
      throw error;
    }
  });

  Order.addHook("afterDestroy", async (order, options) => {
    try {
      const transaction = options.transaction;
      const cart = await Cart.findByPk(order.cartId, { transaction });

      if (cart) {
        const orders = await Order.findAll({
          where: { cartId: cart.id },
          transaction,
        });

        const totals = orders.reduce(
          (acc, o) => ({
            totalPrice: acc.totalPrice + Number(o.total),
            totalSaved: acc.totalSaved + Number(o.savedAmount),
          }),
          { totalPrice: 0, totalSaved: 0 }
        );

        await cart.update(totals, { transaction });
      }
    } catch (error) {
      console.error("Error in Order afterDestroy hook:", error);
      throw error;
    }
  });

  // Cart Hooks
  Cart.addHook("beforeCreate", async (cart) => {
    try {
      cart.totalPrice = 0;
      cart.totalSaved = 0;
    } catch (error) {
      throw new Error("Erreur lors de la création du panier");
    }
  });

  Cart.addHook("afterCreate", async (cart) => {
    console.log(`New cart created: ${cart.id} for user: ${cart.userId}`);
  });

  Cart.addHook("beforeUpdate", async (cart) => {
    if (cart.changed("Approved")) {
      console.log(`Cart ${cart.id} status changed to ${cart.Approved}`);
    }
  });

  Cart.addHook("afterUpdate", async (cart, options) => {
    try {
      if (cart.changed("Approved") && cart.Approved === "Rejected") {
        const orders = await Order.findAll({
          where: { cartId: cart.id },
          include: [{ model: Product }],
          transaction: options.transaction,
        });

        await Promise.all(
          orders.map(async (order) => {
            if (order.product) {
              await Product.increment(
                { quantity: order.quantity },
                {
                  where: { id: order.product.id },
                  transaction: options.transaction,
                }
              );
            }
          })
        );
      }
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour du panier");
    }
  });

  // Add hooks to update cart totals when orders change
  const updateCartTotals = async (order, options) => {
    try {
      const cart = await Cart.findByPk(order.cartId, {
        transaction: options.transaction,
      });
      if (cart) {
        const orders = await Order.findAll({
          where: { cartId: cart.id },
          transaction: options.transaction,
        });

        const totals = orders.reduce(
          (acc, o) => ({
            totalPrice: acc.totalPrice + Number(o.total),
            totalSaved: acc.totalSaved + Number(o.savedAmount),
          }),
          { totalPrice: 0, totalSaved: 0 }
        );

        await cart.update(totals, { transaction: options.transaction });
      }
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour des totaux du panier");
    }
  };

  Order.addHook("afterCreate", updateCartTotals);
  Order.addHook("afterUpdate", updateCartTotals);
  Order.addHook("afterDestroy", updateCartTotals);
};
