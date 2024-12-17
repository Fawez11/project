// config/database.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import configs from "./config.js";
dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = configs[env];

const sequelize = new Sequelize(config.url, config);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database connection established successfully in ${env} mode.`);
    await sequelize.query(
      "CREATE TABLE IF NOT EXISTS connection_test (id SERIAL PRIMARY KEY, test VARCHAR(50))"
    );
    await sequelize.query("INSERT INTO connection_test (test) VALUES ('test')");
    await sequelize.query("DELETE FROM connection_test WHERE test = 'test'");
    console.log("Write permissions verified successfully.");
  } catch (error) {
    console.error("Database connection error:", {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint,
      where: error.where,
    });
    setTimeout(testConnection, 5000);
  }
};

testConnection();

export default sequelize;
