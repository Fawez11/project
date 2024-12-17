import models from "../models/models.js";
const { Cart, Order, Product, User } = models;
import Sequelize from "../../config/database.js";
import { sendEmail } from "#utils/mailing/index";
import { getPagination, getPagingData } from "../../utils/pagination.js";

// Helper function for cart notifications
const sendCartNotification = async (cart, type) => {
  try {
    const completeCart = await Cart.findByPk(cart.id, {
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
            attributes: [
              "quantity",
              "unitPrice",
              "discountPercentage",
              "total",
            ],
          },
        },
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    if (completeCart?.user) {
      const userName = `${completeCart.user.firstName} ${completeCart.user.lastName}`;

      switch (type) {
        case "new":
          await sendEmail(process.env.EMAIL_USER, "newCart", userName, null, {
            cart: completeCart,
            products: completeCart.products_orders,
          });
          break;

        case "status":
          const status = completeCart.Approved.toLowerCase();
          await sendEmail(
            completeCart.user.email,
            `cart${status}`,
            userName,
            null,
            {
              cart: completeCart,
            }
          );
          break;
      }
    }
  } catch (error) {
    console.error("Error sending cart notification:", error);
  }
};

const handleSequelizeError = (error) => {
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    return {
      status: 400,
      message: error.errors[0].message,
    };
  }

  // Handle specific error messages from hooks
  if (error.message.includes("Stock insuffisant")) {
    return {
      status: 400,
      message: error.message,
    };
  }

  if (error.message.includes("Produit non trouvé")) {
    return {
      status: 404,
      message: error.message,
    };
  }

  // Default server error
  console.error("Server Error:", error);
  return {
    status: 500,
    message: "Erreur interne du serveur",
  };
};

const addToCart = async (req, res) => {
  const transaction = await Sequelize.transaction();

  try {
    const userId = req.user.id;
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "La liste des produits est requise",
      });
    }

    const cart = await Cart.create(
      {
        userId,
        Approved: "Pending",
      },
      { transaction }
    );

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

    const productMap = productDetails.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});

    // Validate all products first
    for (const item of products) {
      const product = productMap[item.productId];

      if (!product) {
        await transaction.rollback();
        return res.status(404).json({
          message: `Produit avec ID ${item.productId} non trouvé ou non disponible`,
        });
      }

      if (product.quantity < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({
          message: `Quantité insuffisante pour le produit ${product.name}. Disponible: ${product.quantity}`,
          productId: item.productId,
          availableQuantity: product.quantity,
        });
      }
    }

    // Create orders - hooks will handle calculations
    await Promise.all(
      products.map(async (item) => {
        const product = productMap[item.productId];

        await product.update(
          {
            quantity: product.quantity - item.quantity,
          },
          { transaction }
        );

        return Order.create(
          {
            cartId: cart.id,
            productId: item.productId,
            quantity: item.quantity,
          },
          { transaction }
        );
      })
    );

    await transaction.commit();

    // Fetch complete cart with orders and products
    const completeCart = await Cart.findByPk(cart.id, {
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

    // Send notification after successful creation
    await sendCartNotification(completeCart, "new");

    return res.status(201).json({
      message: "Produits ajoutés au panier avec succès",
      cart: completeCart,
    });
  } catch (error) {
    await transaction.rollback();
    const { status, message } = handleSequelizeError(error);
    return res.status(status).json({ message });
  }
};

const getUserCarts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, size, status } = req.query;
    const { limit, offset } = getPagination(page, size);

    const whereClause = { userId };
    if (status) {
      whereClause.Approved = status;
    }

    const carts = await Cart.findAndCountAll({
      where: whereClause,
      limit,
      offset,
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
            attributes: [
              "quantity",
              "unitPrice",
              "discountPercentage",
              "total",
            ],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const response = getPagingData(carts, page, limit);

    return res.status(200).json({
      message: "Paniers récupérés avec succès",
      ...response,
    });
  } catch (error) {
    const { status, message } = handleSequelizeError(error);
    return res.status(status).json({ message });
  }
};

// Add function to restore product quantities if cart is rejected
const restoreProductQuantities = async (cartId) => {
  const transaction = await Sequelize.transaction();

  try {
    const orders = await Order.findAll({
      where: { cartId },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "quantity"],
        },
      ],
      transaction,
    });

    // Check if orders exist
    if (!orders || orders.length === 0) {
      await transaction.rollback();
      throw new Error("No orders found for cart");
    }

    // Update product quantities
    await Promise.all(
      orders.map(async (order) => {
        if (!order.product) {
          console.error(`Product not found for order ${order.id}`);
          return;
        }

        await Product.increment(
          { quantity: order.quantity },
          {
            where: { id: order.product.id },
            transaction,
          }
        );
      })
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error("Error restoring product quantities:", error);
    throw error;
  }
};

const updateCartStatus = async (req, res) => {
  const transaction = await Sequelize.transaction();

  try {
    const { cartId } = req.params;
    const { status } = req.body;

    if (!["Accepted", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({
        message: "Statut invalide",
      });
    }

    // Fetch cart with all needed associations
    const cart = await Cart.findByPk(cartId, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName", "email"],
        },
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
            attributes: [
              "quantity",
              "unitPrice",
              "discountPercentage",
              "total",
            ],
          },
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({
        message: "Panier non trouvé",
      });
    }

    // If cart is being rejected, restore product quantities
    if (status === "Rejected" && cart.Approved !== "Rejected") {
      try {
        await restoreProductQuantities(cartId);
      } catch (error) {
        await transaction.rollback();
        console.error("Error restoring quantities:", error);
        return res.status(500).json({
          message: "Erreur lors de la restauration des quantités",
        });
      }
    }

    await cart.update({ Approved: status }, { transaction });

    // Fetch updated cart with all associations for email
    const updatedCart = await Cart.findByPk(cartId, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName", "email"],
        },
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
            attributes: [
              "quantity",
              "unitPrice",
              "discountPercentage",
              "total",
            ],
          },
        },
      ],
      transaction,
    });

    // Send status notification after successful update
    if (updatedCart.user) {
      const userName = `${updatedCart.user.firstName} ${updatedCart.user.lastName}`;
      try {
        await sendEmail(
          updatedCart.user.email,
          `cart${status.toLowerCase()}`,
          userName,
          null,
          {
            cart: updatedCart,
            products: updatedCart.products_orders,
          }
        );
      } catch (emailError) {
        console.error("Error sending status notification:", emailError);
        // Don't rollback transaction if email fails
      }
    }

    await transaction.commit();

    return res.status(200).json({
      message: "Statut du panier mis à jour avec succès",
      cart: updatedCart,
    });
  } catch (error) {
    await transaction.rollback();
    const { status, message } = handleSequelizeError(error);
    return res.status(status).json({ message });
  }
};

const updateCart = async (req, res) => {
  const transaction = await Sequelize.transaction();

  try {
    const { cartId } = req.params;
    const { products } = req.body;

    // Validate cart exists and belongs to user
    const cart = await Cart.findOne({
      where: {
        id: cartId,
        userId: req.user.id,
        Approved: "Pending",
      },
      include: [
        {
          model: Product,
          as: "products_orders",
          attributes: ["id", "quantity"],
          through: {
            model: Order,
            as: "order",
            attributes: ["quantity"],
          },
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({
        message: "Panier non trouvé ou non modifiable",
      });
    }

    // Get all current orders to track changes
    const currentOrders = {};
    cart.products_orders.forEach((product) => {
      currentOrders[product.id] = {
        quantity: product.order.quantity,
      };
    });

    // Validate all products and quantities first
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

    const productMap = productDetails.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});

    // Validate products and calculate stock adjustments
    for (const item of products) {
      const product = productMap[item.productId];
      if (!product) {
        await transaction.rollback();
        return res.status(404).json({
          message: `Produit avec ID ${item.productId} non trouvé ou non disponible`,
        });
      }

      const currentOrder = currentOrders[item.productId];
      const quantityDiff = currentOrder
        ? item.quantity - currentOrder.quantity
        : item.quantity;

      if (product.quantity < quantityDiff) {
        await transaction.rollback();
        return res.status(400).json({
          message: `Quantité insuffisante pour le produit ${product.name}. Disponible: ${product.quantity}`,
          productId: item.productId,
          availableQuantity: product.quantity,
        });
      }
    }

    // Delete removed products
    const removedProductIds = Object.keys(currentOrders).filter(
      (id) => !products.find((p) => p.productId === parseInt(id))
    );

    if (removedProductIds.length) {
      await Order.destroy({
        where: {
          cartId: cart.id,
          productId: removedProductIds,
        },
        transaction,
      });

      // Restore stock for removed products
      for (const productId of removedProductIds) {
        const order = currentOrders[productId];
        await Product.increment(
          { quantity: order.quantity },
          {
            where: { id: productId },
            transaction,
          }
        );
      }
    }

    // Update existing and add new products
    await Promise.all(
      products.map(async (item) => {
        const product = productMap[item.productId];
        const currentOrder = currentOrders[item.productId];
        const quantityDiff = currentOrder
          ? item.quantity - currentOrder.quantity
          : item.quantity;

        // Update product stock
        await product.decrement({ quantity: quantityDiff }, { transaction });

        if (currentOrder) {
          // Update existing order
          await Order.update(
            {
              quantity: item.quantity,
              productId: item.productId, // Ensure productId is set
            },
            {
              where: {
                cartId: cart.id,
                productId: item.productId,
              },
              transaction,
              individualHooks: true, // Important: This ensures hooks run on update
            }
          );
        } else {
          // Create new order with all required fields
          await Order.create(
            {
              cartId: cart.id,
              productId: item.productId,
              quantity: item.quantity,
            },
            {
              transaction,
              validate: true, // Ensure validation runs
            }
          );
        }
      })
    );

    await transaction.commit();

    // Fetch updated cart
    const updatedCart = await Cart.findByPk(cart.id, {
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
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    // Send notification to admin
    try {
      if (updatedCart.user) {
        const userName = `${updatedCart.user.firstName} ${updatedCart.user.lastName}`;
        await sendEmail(process.env.EMAIL_USER, "cartUpdate", userName, null, {
          cart: updatedCart,
          products: updatedCart.products_orders,
        });
      }
    } catch (emailError) {
      console.error("Error sending cart update notification:", emailError);
      // Don't rollback transaction if email fails
    }

    return res.status(200).json({
      message: "Panier mis à jour avec succès",
      cart: updatedCart,
    });
  } catch (error) {
    await transaction.rollback();
    const { status, message } = handleSequelizeError(error);
    return res.status(status).json({ message });
  }
};

// Add new function to get all carts (admin)
const getAllCarts = async (req, res) => {
  try {
    const { page, size, status } = req.query;
    const { limit, offset } = getPagination(page, size);

    const whereClause = {};
    if (status) {
      whereClause.Approved = status;
    }

    const carts = await Cart.findAndCountAll({
      where: whereClause,
      limit,
      offset,
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
            attributes: [
              "quantity",
              "unitPrice",
              "discountPercentage",
              "total",
            ],
          },
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const response = getPagingData(carts, page, limit);

    return res.status(200).json({
      message: "Paniers récupérés avec succès",
      ...response,
    });
  } catch (error) {
    const { status, message } = handleSequelizeError(error);
    return res.status(status).json({ message });
  }
};

// Add this new function to cartController.js
const deleteCartOrders = async (req, res) => {
  const transaction = await Sequelize.transaction();

  try {
    const { cartId } = req.params;
    const userId = req.user.id;

    // Find cart with its orders and user info
    const cart = await Cart.findOne({
      where: {
        id: cartId,
        userId,
        Approved: "Pending",
      },
      include: [
        {
          model: Product,
          as: "products_orders",
          through: {
            model: Order,
            as: "order",
            attributes: ["quantity"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName", "email"],
        },
      ],
      transaction,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Panier non trouvé ou non modifiable",
      });
    }

    // Restore product quantities
    await Promise.all(
      cart.products_orders.map(async (product) => {
        await Product.increment(
          { quantity: product.order.quantity },
          {
            where: { id: product.id },
            transaction,
          }
        );
      })
    );

    // Delete all orders for this cart
    await Order.destroy({
      where: { cartId },
      transaction,
    });

    // Update cart totals
    await cart.update(
      {
        totalPrice: 0,
        totalSaved: 0,
      },
      { transaction }
    );

    // Send notification to admin
    try {
      if (cart.user) {
        const userName = `${cart.user.firstName} ${cart.user.lastName}`;
        await sendEmail(
          process.env.EMAIL_USER,
          "cartCancellation",
          userName,
          null,
          {
            cart: cart,
          }
        );
      }
    } catch (emailError) {
      console.error(
        "Error sending cart cancellation notification:",
        emailError
      );
      // Don't rollback transaction if email fails
    }

    await transaction.commit();

    return res.status(200).json({
      message: "Commandes du panier supprimées avec succès",
      cart: await Cart.findByPk(cartId, {
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
              attributes: [
                "quantity",
                "unitPrice",
                "discountPercentage",
                "total",
              ],
            },
          },
        ],
      }),
    });
  } catch (error) {
    await transaction.rollback();
    const { status, message } = handleSequelizeError(error);
    return res.status(status).json({ message });
  }
};

export {
  addToCart,
  getUserCarts,
  updateCart,
  updateCartStatus,
  getAllCarts,
  deleteCartOrders,
};
