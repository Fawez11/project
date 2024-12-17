import models from "../models/models.js";
const { Cart, Order, Product, User } = models;

export const createCart = async (userId, products, transaction) => {
  const cart = await Cart.create(
    {
      userId,
      Approved: "Pending",
    },
    { transaction }
  );

  const productMap = await validateAndGetProducts(products, transaction);
  await createOrders(cart.id, products, productMap, transaction);

  return cart;
};

export const validateAndGetProducts = async (products, transaction) => {
  const productIds = products.map((p) => p.productId);
  const productDetails = await Product.findAll({
    where: {
      id: productIds,
      disabled: false,
      availability: true,
    },
    lock: true,
    transaction,
  });

  return productDetails.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});
};

export const createOrders = async (
  cartId,
  products,
  productMap,
  transaction
) => {
  await Promise.all(
    products.map(async (item) => {
      const product = productMap[item.productId];
      await updateProductStock(product, -item.quantity, transaction);
      return createOrder(cartId, item, transaction);
    })
  );
};

export const updateProductStock = async (
  product,
  quantityChange,
  transaction
) => {
  await product.increment({ quantity: quantityChange }, { transaction });
};

export const createOrder = async (cartId, item, transaction) => {
  return Order.create(
    {
      cartId,
      productId: item.productId,
      quantity: item.quantity,
    },
    { transaction }
  );
};

export const getCompleteCart = async (cartId) => {
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
          "quantity",
          "isOnSale",
          "discountPercentage",
        ],
        through: {
          model: Order,
          attributes: [
            "quantity",
            "unitPrice",
            "originalPrice",
            "discountPercentage",
            "savedAmount",
            "total",
          ],
        },
      },
    ],
  });
};
