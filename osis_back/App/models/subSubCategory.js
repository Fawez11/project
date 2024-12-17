import { STRING, BOOLEAN } from "sequelize";
import Sequelize from "../../config/database.js";

// Define the SubSubCategory model
const SubSubCategory = Sequelize.define(
  "subSubCategory",
  {
    title: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    disabled: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    tableName: "subSubCategory", // Explicitly define the table name
  }
);

export default SubSubCategory;
