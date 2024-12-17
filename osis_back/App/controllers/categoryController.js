// Create a new category
import models from "../models/models.js";
const { Category, SubCategory, SubSubCategory, Product } = models;
import dotenv from "dotenv";
dotenv.config();

const createCategory = async (req, res) => {
  try {
    const { body, file } = req;
    const { title, icon } = body;
    const category = await Category.create({
      title,
      icon: file ? `${DOMAIN_NAME}/api/uploads/${file?.filename}` : icon, //if it takes null as a value the default value from the model will be taken wich is noCategoryIcon.jpg
    });
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const { body, params, file } = req;
    const { id } = params;
    const { DOMAIN_NAME } = process.env;
    const updatedBody = file
      ? { ...body, icon: `${DOMAIN_NAME}/api/uploads/${file?.filename}` }
      : body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.update(updatedBody);
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
};

// Delete multiple categories
const deleteCategories = async (req, res) => {
  try {
    const { body } = req;
    const { ids } = body; // Expecting an array of IDs in the request body
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or empty IDs array" });
    }

    const deletedCount = await Category.destroy({
      where: {
        id: ids,
      },
    });

    if (deletedCount > 0) {
      res.status(200).json({ message: `${deletedCount} categories deleted` });
    } else {
      res
        .status(404)
        .json({ message: "No categories found for the given IDs" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting categories", error });
  }
};

// Get all categories with subcategories
const getAllCategoriesWithSubCategories = async (req, res) => {
  try {
    const response = await Category.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
      include: [
        {
          model: SubCategory, // Reference to the SubCategory model
          as: "subCategories", // Alias defined in the association
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

const handleEnable = async (req, res) => {
  const { body } = req;
  const { categoryIds } = body; // Assume IDs are sent in the request body
  if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
    return res.status(400).json({ message: "Invalid or missing category IDs" });
  }

  // Fetch all categories with the given IDs
  const categoriesFetched = await Category.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      id: categoryIds,
      disabled: true, // Only fetch categories that are currently disabled
    },
  });

  if (categoriesFetched.length === 0) {
    return res.status(404).json({ message: "No categories found to enable" });
  }

  // Update the `disabled` attribute to `false` for the fetched categories
  await Promise.all(
    categoriesFetched.map((category) => category.update({ disabled: false }))
  );

  const subCategoriesFetched = await SubCategory.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      categoryId: categoryIds,
    },
  });

  await Promise.all(
    subCategoriesFetched.map((subCategory) =>
      subCategory.update({ disabled: false })
    )
  );

  const subSubCategoriesFetched = await SubSubCategory.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      subCategoryId: subCategoriesFetched.map((subCategory) => subCategory.id),
    },
  });

  await Promise.all(
    subSubCategoriesFetched.map((subSubCategory) =>
      subSubCategory.update({ disabled: false })
    )
  );

  const productsFetched = await Product.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      subSubCategoryId: subSubCategoriesFetched.map(
        (subSubCategory) => subSubCategory.id
      ),
    },
  });

  await Promise.all(
    productsFetched.map((product) => product.update({ disabled: false }))
  );

  res.status(200).json({
    message: "Categories enabled successfully",
    enabledCategories: categoriesFetched.map((category) => category.id),
  });
};

const handleDisable = async (req, res) => {
  const { body } = req;
  const { categoryIds } = body; // Assume IDs are sent in the request body
  if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
    return res.status(400).json({ message: "Invalid or missing category IDs" });
  }

  // Fetch all categories with the given IDs
  const categoriesFetched = await Category.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      id: categoryIds,
      disabled: false, // Only fetch categories that are currently enabled
    },
  });

  // if (categoriesFetched.length === 0) {
  //   return res.status(404).json({ message: "No categories found to disable" });
  // }

  // Update the `disabled` attribute to `true` for the fetched categories
  await Promise.all(
    categoriesFetched.map((category) => category.update({ disabled: true }))
  );

  const subCategoriesFetched = await SubCategory.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      categoryId: categoryIds,
    },
  });

  await Promise.all(
    subCategoriesFetched.map((subCategory) =>
      subCategory.update({ disabled: true })
    )
  );

  const subSubCategoriesFetched = await SubSubCategory.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      subCategoryId: subCategoriesFetched.map((subCategory) => subCategory.id),
    },
  });

  await Promise.all(
    subSubCategoriesFetched.map((subSubCategory) =>
      subSubCategory.update({ disabled: true })
    )
  );

  const productsFetched = await Product.findAll({
    order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    where: {
      subSubCategoryId: subSubCategoriesFetched.map(
        (subSubCategory) => subSubCategory.id
      ),
    },
  });

  await Promise.all(
    productsFetched.map((product) => product.update({ disabled: true }))
  );

  res.status(200).json({
    message: "Categories disabled successfully",
    disabledCategories: categoriesFetched.map((category) => category.id),
  });
};

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategories,
  getAllCategoriesWithSubCategories,
  handleEnable,
  handleDisable,
};
