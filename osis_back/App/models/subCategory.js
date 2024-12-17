import { STRING, BOOLEAN } from "sequelize";
import Sequelize from "../../config/database.js";

const SubCategory = Sequelize.define(
  "subCategory",
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
    tableName: "subCategory", // Explicit table name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default SubCategory;
