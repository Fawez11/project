import Sequelize from "../../config/database.js";

// Define the media model
const ProductSubCharacteristic = Sequelize.define(
  "productSubCharacteristic",
  {},
  {
    tableName: "productSubCharacteristic", // Explicit table name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default ProductSubCharacteristic;
