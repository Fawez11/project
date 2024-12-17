import { STRING, BOOLEAN } from "sequelize";
import Sequelize from "../../config/database.js";
import dotenv from "dotenv";
dotenv.config();
const { DOMAIN_NAME } = process.env;

// Define the Category model
const Category = Sequelize.define(
  "category", // Model name
  {
    title: {
      type: STRING,
      allowNull: false,
    },
    icon: {
      type: STRING,
      allowNull: false,
      defaultValue: `${DOMAIN_NAME}/api/uploads/noCategoryIcon.jpg`,
    },
    disabled: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "category", // Explicit table name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default Category;
