import seedCategories from "./fakeCategories.js"; // Import the seed function for categories
import seedPartners from "./fakePartners.js"; // Import the seed function for partners
import seedCharacteristics from "./fakeCharacteristics.js"; // Import the seed function for characteristics
import { generateFakeUsers } from "./fakeUsers.js";
const seedAll = async () => {
  try {
    // Seed categories
    generateFakeUsers(3);
    await seedCategories();

    // Seed characteristics
    await seedCharacteristics();
    // Seed partners
    await seedPartners();

    console.log("All data seeded successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seedAll()
  .then(() => {
    console.log("Seeding completed successfully!");
  })
  .catch((error) => {
    console.error("Error during seeding:", error);
  });
