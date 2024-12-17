import { STRING, BOOLEAN } from "sequelize";
import Sequelize from "../../config/database.js";

// Define the media model
const Partner = Sequelize.define(
  "partner",
  {
    name: {
      type: STRING,
      allowNull: false,
    },
    logo: {
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
    tableName: "partner", // Explicit table name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default Partner;
