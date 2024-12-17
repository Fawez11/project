import { STRING, BOOLEAN } from "sequelize";
import Sequelize from "../../config/database.js";
// dotenv
import dotenv from "dotenv";
dotenv.config();

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const PORT = process.env.PORT;

// Define the media model
const Media = Sequelize.define(
  "media",
  {
    filePath: {
      type: STRING,
      allowNull: false,
    },
    primary: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "media", // Explicit table name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default Media;
