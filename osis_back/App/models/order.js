import Sequelize from "../../config/database.js";
import { DECIMAL, INTEGER } from "sequelize";

const Order = Sequelize.define(
  "order",
  {
    quantity: {
      type: INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    unitPrice: {
      type: DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    originalPrice: {
      type: DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    discountPercentage: {
      type: INTEGER,
      allowNull: true,
    },
    savedAmount: {
      type: DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: "order",
    timestamps: true,
    indexes: [
      {
        name: "idx_order_cart",
        fields: ["cartId"],
      },
      {
        name: "idx_order_product",
        fields: ["productId"],
      },
      {
        name: "idx_order_cart_product",
        fields: ["cartId", "productId"],
        unique: true,
      },
    ],
  }
);

export default Order;
