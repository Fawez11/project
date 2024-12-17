import { DECIMAL, ENUM } from "sequelize";
import Sequelize from "../../config/database.js";

const Cart = Sequelize.define(
  "cart",
  {
    totalPrice: {
      type: DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    totalSaved: {
      type: DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    Approved: {
      type: ENUM,
      allowNull: false,
      values: ["Accepted", "Rejected", "Pending"],
      defaultValue: "Pending",
    },
  },
  {
    tableName: "cart",
    timestamps: true,
    indexes: [
      {
        name: "idx_cart_user",
        fields: ["userId"],
      },
      {
        name: "idx_cart_status",
        fields: ["Approved"],
      },
      {
        name: "idx_cart_user_status",
        fields: ["userId", "Approved"],
      },
      {
        name: "idx_cart_created",
        fields: ["createdAt"],
      },
    ],
  }
);

export default Cart;
