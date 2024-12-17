import { STRING } from "sequelize";
import Sequelize from "../../config/database.js";

const SubCharacteristic = Sequelize.define(
  "subCharacteristic",
  {
    title: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "subCharacteristic",
  }
);

export default SubCharacteristic;
