import { ENUM, STRING, BOOLEAN, DATE } from "sequelize";
import Sequelize from "../../config/database.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const { DOMAIN_NAME, PORT } = process.env;

// Define the User model
const User = Sequelize.define(
  "user",
  {
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    titreSocial: {
      type: STRING,
      allowNull: true,
    },
    enterprise: {
      type: STRING,
      allowNull: true,
    },
    taxNumber: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    photoUrl: {
      type: STRING,
      allowNull: true,
    },
    role: {
      type: ENUM,
      allowNull: false,
      values: ["admin", "user"],
      defaultValue: "user",
    },
    isValid: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isBlocked: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verificationToken: {
      type: STRING,
      allowNull: true,
    },
    blockedUntil: {
      type: DATE,
      allowNull: true,
    },
    blockReason: {
      type: STRING,
      allowNull: true,
    },
  },
  {
    tableName: "user",
    timestamps: true, // Adds createdAt and updatedAt fields
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
    indexes: [
      {
        name: "idx_blocked_until",
        fields: ["isBlocked", "blockedUntil"],
      },
    ],
  }
);

// Method to validate password
User.prototype.validPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Export the model
export default User;
