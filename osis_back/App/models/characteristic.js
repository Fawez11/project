import { STRING } from "sequelize";
import Sequelize from "../../config/database.js";

const Characteristic = Sequelize.define(
  "characteristic",
  {
    title: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "characteristic",
  }
);

export default Characteristic;
