import { electronicCompanies } from "./data/partners.js"; // Import the fake partner data

import models from "../../App/models/models.js";
const seedPartners = async () => {
  const Partner = models.Partner;
  const Product = models.Product;
  try {
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    });

    if (products.length === 0) {
      console.log("No products found to update.");
      return;
    }
    // Remove existing partners if needed
    await Partner.destroy({ where: {} }); // Deletes all existing records in the Partner table

    // Insert fake partners into the database
    const partners = await Partner.bulkCreate(electronicCompanies);
    // Update each product with a random partnerId
    for (const product of products) {
      const randomPartnerId =
        partners[Math.floor(Math.random() * partners.length)].id; // Pick a random partner ID
      await product.update({ partnerId: randomPartnerId }); // Update the product in the database
      console.log(
        `Updated Product ID ${product.id} with Partner ID ${randomPartnerId}`
      );
    }

    console.log("All products updated with random partner IDs successfully!");
    console.log("Partners seeded successfully!");
  } catch (error) {
    console.error("Error seeding partners:", error);
  }
};

export default seedPartners;
