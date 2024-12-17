import models from "../../App/models/models.js";

const associateCharacteristicWithProduct = async (
  subcategoryName,
  characteristicId
) => {
  try {
    const ProductSubCharacteristic = models.ProductSubCharacteristic;
    const SubSubCategory = models.SubSubCategory;
    const Product = models.Product;

    const subcategory = await SubSubCategory.findOne({
      where: { title: subcategoryName },
    });

    if (!subcategory) {
      console.error(`SubSubCategory with name ${subcategoryName} not found.`);
      return;
    }

    const products = await Product.findAll({
      where: { subSubCategoryId: subcategory.id },
    });

    if (products.length === 0) {
      console.log(`No products found for SubSubCategory: ${subcategoryName}`);
      return;
    }

    for (const product of products) {
      await ProductSubCharacteristic.create({
        subCharacteristicId: characteristicId,
        productId: product.id,
      });
      console.log(
        `Associated Product ID ${product.id} with SubCharacteristic ID ${characteristicId}`
      );
    }
  } catch (error) {
    console.error("Error associating characteristic with product:", error);
  }
};

export default associateCharacteristicWithProduct;
