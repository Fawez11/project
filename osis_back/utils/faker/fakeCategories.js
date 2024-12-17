import { categories } from "./data/categories.js"; // Adjust the path as necessary
import createProduct from "./fakeProducts.js";
import models from "../../App/models/models.js";

const seedCategories = async () => {
  const Category = models.Category;
  const SubCategory = models.SubCategory;
  const SubSubCategory = models.SubSubCategory;
  try {
    await SubSubCategory.destroy({ where: {} });
    await SubCategory.destroy({ where: {} });
    await Category.destroy({ where: {} });

    for (const categoryData of categories) {
      const category = await Category.create({
        title: categoryData.category,
        icon: `${process.env.DOMAIN_NAME}/api/uploads/${categoryData.icon}`,
      });

      for (const subcategoryData of categoryData.subcategories) {
        console.log("Creating subcategory:", subcategoryData.subcategory); // Debug log
        const subcategory = await SubCategory.create({
          title: subcategoryData.subcategory,
          categoryId: category.id, // Associate with the category
        });

        for (const subsubcategory of subcategoryData.subsubcategories) {
          // Check if subsubcategory is an object or a string
          if (typeof subsubcategory === "string") {
            console.log("Creating subsubcategory:", subsubcategory); // Debug log
            const subsubData = await SubSubCategory.create({
              title: subsubcategory,
              subCategoryId: subcategory.id,
            });
            await createProduct(
              subsubData.id,
              subsubcategory,
              `${categoryData.category} ${subcategoryData.subcategory} ${subsubcategory}`,
              subsubData.id
            );
          } else if (typeof subsubcategory === "object") {
            console.log(
              "Creating nested subcategory:",
              subsubcategory.subcategory
            ); // Debug log
            const nestedSubcategory = await SubCategory.create({
              title: subsubcategory.subcategory,
              categoryId: category.id,
            });

            for (const nestedSubsub of subsubcategory.subsubcategories) {
              console.log("Creating nested subsubcategory:", nestedSubsub); // Debug log
              const nestsubsubData = await SubSubCategory.create({
                title: nestedSubsub,
                subCategoryId: nestedSubcategory.id,
              });
              await createProduct(
                nestsubsubData.id,
                nestedSubsub,
                `${categoryData.category} ${subcategoryData.subcategory} ${nestedSubsub}`,
                nestsubsubData.id
              );
            }
          }
        }
      }
    }
    console.log("Categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};

export default seedCategories;
// Create a product for the created subsubcategory
// await createProduct(
//   nestedSubcategory.id,
//   subsubcategory.subcategory,
//   `${categoryData} ${subcategoryData} ${subsub}`,
//   nestedSubcategory.id
// );
