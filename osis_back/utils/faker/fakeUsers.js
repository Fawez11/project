import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import models from "../../App/models/models.js";

const generateFakeUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  enterprise: faker.company.name(),
  taxNumber: faker.finance.accountNumber(10), // Example: Generates a 10-digit tax number
  role: faker.helpers.arrayElement(["admin", "user"]),
  email: faker.internet.email(),
  password: bcrypt.hashSync("password123", 10),
  photoUrl: `${process.env.DOMAIN_NAME}/api/uploads/avatar.png`,
});

export const generateFakeUsers = async (length) => {
  try {
    const User = models.User;
    for (let i = 0; i < length; i++) {
      const newUser = generateFakeUser();
      const user = await User.create(newUser);
      console.log(`new user ${user.firstName} is created`);
    }
  } catch (error) {
    console.log("user creation failed");
  }
};
