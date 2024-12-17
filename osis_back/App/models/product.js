import { STRING, TEXT, DECIMAL, INTEGER, BOOLEAN } from "sequelize";
import Sequelize from "../../config/database.js";
// import { productHooks } from "./hooks/product.js";

// Define the product model
const Product = Sequelize.define(
  "product",
  {
    name: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: TEXT,
    },
    price: {
      type: DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    quantity: {
      type: INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    discountPercentage: {
      type: INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 100,
      },
    },
    finalPrice: {
      type: DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    availability: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isTopSeller: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isOnSale: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    ref: {
      type: STRING,
      allowNull: false,
    },
    disabled: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "product",
    timestamps: true,
    indexes: [
      {
        name: "idx_product_availability",
        fields: ["availability", "disabled", "quantity"],
      },
      {
        name: "idx_product_search",
        fields: ["name", "ref"],
      },
      {
        name: "idx_product_filters",
        fields: ["isTopSeller", "isOnSale"],
      },
      {
        name: "idx_product_price",
        fields: ["price", "finalPrice", "isOnSale"],
      },
    ],
    // hooks: productHooks,
  }
);

// Add instance method to get current price
Product.prototype.getCurrentPrice = function () {
  return this.finalPrice || this.price;
};

export default Product;
