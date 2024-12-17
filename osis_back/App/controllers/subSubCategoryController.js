import models from "../models/models.js";
const { SubCategory, SubSubCategory, Product } = models;

// Controller for creating a new SubSubCategories
const createSubSubCategory = async (req, res) => {
  const { body, params } = req;
  const { title } = body;
  const { subCategoryId } = params;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!subCategoryId) {
    return res.status(400).json({ message: "SubCategory ID is required" });
  }

  try {
    const response = await SubSubCategory.create({
      title,
      subCategoryId,
    });
    return res.status(201).json({
      message: "SubSubCategory created successfully",
      subSubCategory: response,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating SubSubCategory", error });
  }
};

// Get all SubSubCategories
const getAllSubSubCategories = async (req, res) => {
  try {
    const response = await SubSubCategory.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    });
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching SubSubCategories", error });
  }
};

// Get a single SubSubCategory by ID
const getSubSubCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await SubSubCategory.findByPk(id);
    if (!response) {
      return res.status(404).json({ message: "SubSubCategory not found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching SubSubCategory", error });
  }
};

// Update a SubSubCategory by ID
const updateSubSubCategory = async (req, res) => {
  const { id } = req.params; // Extract sub-sub-category ID from request parameters
  const updatedData = req.body; // Extract updated data from the request body

  try {
    const response = await SubSubCategory.findByPk(id); // Find the sub-sub-category by ID
    if (!response) {
      return res.status(404).json({ message: "SubSubCategory not found" }); // Send a not found response
    }

    // Update only the fields that are provided in updatedData
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] !== undefined) {
        response[key] = updatedData[key]; // Update each field
      }
    });

    await response.save(); // Save the updated sub-sub-category
    return res.status(200).json({
      message: "SubSubCategory updated successfully",
      response,
    });
  } catch (error) {
    console.error("Error updating SubSubCategory:", error);
    return res
      .status(500)
      .json({ message: "Error updating SubSubCategory", error: error.message });
  }
};

// Delete multiple categories
const deleteSubSubCategories = async (req, res) => {
  try {
    const { body } = req;
    const { ids } = body; // Expecting an array of IDs in the request body

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or empty IDs array" });
    }

    const deletedCount = await SubSubCategory.destroy({
      where: {
        id: ids,
      },
    });

    if (deletedCount > 0) {
      res
        .status(200)
        .json({ message: `${deletedCount} subSubCategories deleted` });
    } else {
      res
        .status(404)
        .json({ message: "No subSubCategories found for the given IDs" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting subSubCategories", error });
  }
};

// Get all SubSubCategories by subCategoryId
const getAllSubSubCategoriesBySubCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching subsubcategories for subcategory ID:", id);

    const subSubCategories = await SubSubCategory.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
      where: { subCategoryId: id },
      include: [
        {
          model: models.Product,
          as: "products",
        },
      ],
    });

    return res.status(200).json(subSubCategories);
  } catch (error) {
    console.error("Error in getAllSubSubCategoriesBySubCategoryId:", error);
    return res.status(500).json({
      message: "Error fetching subsubcategories",
      error: error.message,
      stack: error.stack, // Add stack trace for debugging
    });
  }
};

const handleEnable = async (req, res) => {
  const { body } = req;
  const { subSubCategoryIds } = body; // Assume IDs are sent in the request body
  if (!Array.isArray(subSubCategoryIds) || subSubCategoryIds.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid or missing subSubCategory IDs" });
  }

  // Fetch all categories with the given IDs
  const subSubCategoriesFetched = await SubSubCategory.findAll({
    where: {
      id: subSubCategoryIds,
      disabled: true, // Only fetch categories that are currently disabled
    },
  });

  // if (subSubCategoriesFetched.length === 0) {
  //   return res
  //     .status(404)
  //     .json({ message: "No subSubCategories found to enable" });
  // }

  // Update the `disabled` attribute to `false` for the fetched categories
  await Promise.all(
    subSubCategoriesFetched.map((subSubCategory) =>
      subSubCategory.update({ disabled: false })
    )
  );

  const productsFetched = await Product.findAll({
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
    message: "SubSubCategories enabled successfully",
    enabledSubSubCategories: subSubCategoriesFetched.map(
      (subSubCategory) => subSubCategory.id
    ),
  });
};

const handleDisable = async (req, res) => {
  const { body } = req;
  const { subSubCategoryIds } = body; // Assume IDs are sent in the request body
  if (!Array.isArray(subSubCategoryIds) || subSubCategoryIds.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid or missing subSubCategory IDs" });
  }

  // Fetch all categories with the given IDs
  const subSubCategoriesFetched = await SubSubCategory.findAll({
    where: {
      id: subSubCategoryIds,
      disabled: false, // Only fetch categories that are currently enabled
    },
  });

  if (subSubCategoriesFetched.length === 0) {
    return res
      .status(404)
      .json({ message: "No subSubCategories found to disable" });
  }

  // Update the `disabled` attribute to `true` for the fetched categories
  await Promise.all(
    subSubCategoriesFetched.map((subSubCategory) =>
      subSubCategory.update({ disabled: true })
    )
  );

  await Promise.all(
    subSubCategoriesFetched.map((subSubCategory) =>
      subSubCategory.update({ disabled: true })
    )
  );

  const productsFetched = await Product.findAll({
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
    message: "SubSubCategories disabled successfully",
    disabledSubSubCategories: subSubCategoriesFetched.map(
      (subSubCategory) => subSubCategory.id
    ),
  });
};

export {
  createSubSubCategory,
  getAllSubSubCategories,
  getSubSubCategoryById,
  updateSubSubCategory,
  deleteSubSubCategories,
  getAllSubSubCategoriesBySubCategoryId,
  handleEnable,
  handleDisable,
};
