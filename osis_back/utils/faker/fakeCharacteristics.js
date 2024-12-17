import { characteristicsData } from "../../utils/faker/data/characteristics.js"; // Adjust the path as necessary
import associateCharacteristicWithProduct from "./fakeAssociatedproductCharac.js";
import models from "../../App/models/models.js";

const seedCharacteristics = async () => {
  const Characteristic = models.Characteristic;
  const SubCharacteristic = models.SubCharacteristic;
  const SubCategory = models.SubCategory; // Import SubCategory
  const SubSubCategory = models.SubSubCategory; // Import SubSubCategory
  try {
    for (const subcategory of characteristicsData) {
      const findSubcategory = await SubSubCategory.findOne({
        where: { title: subcategory.subsubcategory },
      });
      console.log("here the subsubCategory id ", findSubcategory.subCategoryId);

      const subCategoryInstance = await SubCategory.findOne({
        where: { id: findSubcategory.subCategoryId },
      });
      console.log("here the subcategory ", findSubcategory.subCategoryId);

      for (const characteristicData of subcategory.characteristics) {
        // Create the characteristic
        const characteristic = await Characteristic.create({
          subSubCategoryId: findSubcategory.id,
          title: characteristicData.characteristic,
          subCategoryId: subCategoryInstance.id, // Associate with the SubCategory
        });

        // Create the subcharacteristics for the created characteristic
        for (const subcharacteristic of characteristicData.subcharacteristics) {
          const createdSubCharacteristic = await SubCharacteristic.create({
            title: subcharacteristic,
            characteristicId: characteristic.id, // Associate with the characteristic
          });

          // Associate the created subcharacteristic with products based on subcategory name
          await associateCharacteristicWithProduct(
            subcategory.subsubcategory,
            createdSubCharacteristic.id
          );
        }
      }
    }
    console.log("Characteristics seeded successfully!");
  } catch (error) {
    console.error("Error seeding characteristics:", error);
  }
};

export default seedCharacteristics;
