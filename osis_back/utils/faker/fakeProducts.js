import models from "../../App/models/models.js";
import { faker } from "@faker-js/faker";

import { getUnsplashImages } from "../unsplash/unsplash.js";
const createProduct = async (
  subSubCategoryId,
  baseProductName,
  query,
  index
) => {
  try {
    const Media = models.Media;
    const Product = models.Product;
    // await Media.destroy({ where: {} });
    // await Product.destroy({ where: {} });
    const quantity = faker.number.int({ min: 0, max: 100 });
    const discountPercentage = faker.number.int({ min: 10, max: 100 });
    const productName = `${baseProductName} Product ${index}`; // Construct the product name
    const newProduct = {
      name: productName,
      description: "This is a sample product description.", // You can customize this as needed
      price: parseFloat((Math.random() * 100).toFixed(2)), // Random price
      quantity: quantity, // Random quantity between 1 and 100
      discountPercentage: faker.helpers.arrayElement([
        discountPercentage,
        null,
      ]), // Random discount percentage
      availability: quantity > 0, // Set availability to true
      isTopSeller: Math.random() < 0.5, // Randomly set as top seller
      isOnSale: discountPercentage && discountPercentage > 0, // Randomly set as on sale
      subSubCategoryId: subSubCategoryId, // Associate with the subsubcategory
      ref: "#123456",
    };

    // Create the product in the database
    const createdProduct = await Product.create(newProduct);
    console.log(`Product created: ${productName}`);

    // Create Media for the product

    // Fetch an image based on the product name
    const image = [
      `${process.env.DOMAIN_NAME}/api/uploads/image_1.png`,
      `${process.env.DOMAIN_NAME}/api/uploads/image_2.png`,
      `${process.env.DOMAIN_NAME}/api/uploads/image_3.png`,
      `${process.env.DOMAIN_NAME}/api/uploads/image_4.png`,
    ]; // Fallback image
    for (let i = 0; i < image.length; i++) {
      await Media.create({ productId: createdProduct.id, filePath: image[i] });
    }
    console.log(`Product created: ${productName}`);
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

export default createProduct;
