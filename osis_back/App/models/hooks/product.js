import Cart from "../cart.js";

const calculateFinalPrice = (product) => {
  if (product.isOnSale && product.discountPercentage) {
    const discount = (product.price * product.discountPercentage) / 100;
    return Number(product.price) - discount;
  }
  return Number(product.price);
};

export const productHooks = {
  beforeValidate: async (product) => {
    product.finalPrice = calculateFinalPrice(product);
  },
  beforeCreate: async (product) => {
    product.name = product.name.toLowerCase();
    product.availability = product.quantity > 0 && !product.disabled;
    if (!product.finalPrice) {
      product.finalPrice = calculateFinalPrice(product);
    }
  },
  beforeUpdate: async (product) => {
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
  },
  afterCreate: async (product) => {
    console.log(
      `New product created: ${product.id} - ${product.name} - Final Price: ${product.finalPrice}`
    );
  },
  beforeDestroy: async (product) => {
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
  },
};
