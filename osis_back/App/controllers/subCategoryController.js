import models from "../models/models.js";
const { SubCategory, SubSubCategory, Product } = models;

// Controller for handling SubCategories operations
const subCategoriesController = {
  // Create a new SubCategories
  createSubCategories: async (req, res) => {
    try {
      const { body, params } = req;
      const { title } = body;
      const { categoryId } = params;
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }

      const response = await SubCategory.create({ title, categoryId });

      return res.status(201).json({
        message: "subCategories created successfully",
        subCategory: response,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating SubCategories", error });
    }
  },

  // Get all SubCategories
  getAllSubCategories: async (req, res) => {
    try {
      const response = await SubCategory.findAll({
        order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
      });
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching subcategory", error });
    }
  },

  // Get a single SubCategories by ID
  getSubCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await SubCategory.findByPk(id);

      if (!response) {
        return res.status(404).json({ message: "subCategory not found" });
      }

      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching SubCategories", error });
    }
  },

  // Update a SubCategories by ID
  updateSubCategory: async (req, res) => {
    try {
      const { body, params } = req;
      const { id } = params;
      const { title } = body;

      const response = await SubCategory.update({ title }, { where: { id } });

      return res
        .status(200)
        .json({ message: "subCategories updated successfully", response });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating SubCategories", error });
    }
  },

  // Delete multiple categories
  deleteSubCategories: async (req, res) => {
    try {
      const { body } = req;
      const { ids } = body; // Expecting an array of IDs in the request body

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Invalid or empty IDs array" });
      }

      const deletedCount = await SubCategory.destroy({
        where: {
          id: ids,
        },
      });

      if (deletedCount > 0) {
        res
          .status(200)
          .json({ message: `${deletedCount} subCategories deleted` });
      } else {
        res
          .status(404)
          .json({ message: "No subCategories found for the given IDs" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting subCategories", error });
    }
  },

  getAllSubCategoriesByCategoryId: async (req, res) => {
    try {
      const { categoryId } = req.params;
      console.log("Fetching subcategories for categoryId:", categoryId);

      const response = await SubCategory.findAll({
        order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
        where: { categoryId },
        include: [
          {
            model: models.SubSubCategory,
            as: "subSubCategories",
            attributes: ["id", "title"],
          },
        ],
      });
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error details:", error);
      return res.status(500).json({
        message: "Error fetching subcategories by categoryId",
        error: error.message,
      });
    }
  },

  handleEnable: async (req, res) => {
    const { body } = req;
    const { subCategoryIds } = body; // Assume IDs are sent in the request body
    if (!Array.isArray(subCategoryIds) || subCategoryIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or missing subCategory IDs" });
    }

    // Fetch all categories with the given IDs
    const subCategoriesFetched = await SubCategory.findAll({
      where: {
        id: subCategoryIds,
        disabled: true, // Only fetch categories that are currently disabled
      },
    });

    if (subCategoriesFetched.length === 0) {
      return res
        .status(404)
        .json({ message: "No subCategories found to enable" });
    }

    // Update the `disabled` attribute to `false` for the fetched categories
    await Promise.all(
      subCategoriesFetched.map((subCategory) =>
        subCategory.update({ disabled: false })
      )
    );

    const subSubCategoriesFetched = await SubSubCategory.findAll({
      where: {
        subCategoryId: subCategoriesFetched.map(
          (subCategory) => subCategory.id
        ),
      },
    });

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
      message: "SubCategories enabled successfully",
      enabledSubCategories: subCategoriesFetched.map(
        (subCategory) => subCategory.id
      ),
    });
  },

  handleDisable: async (req, res) => {
    const { body } = req;
    const { subCategoryIds } = body; // Assume IDs are sent in the request body
    if (!Array.isArray(subCategoryIds) || subCategoryIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or missing subCategory IDs" });
    }

    // Fetch all categories with the given IDs
    const subCategoriesFetched = await SubCategory.findAll({
      where: {
        id: subCategoryIds,
        disabled: false, // Only fetch categories that are currently enabled
      },
    });

    if (subCategoriesFetched.length === 0) {
      return res
        .status(404)
        .json({ message: "No subCategories found to disable" });
    }

    // Update the `disabled` attribute to `true` for the fetched categories
    await Promise.all(
      subCategoriesFetched.map((subCategory) =>
        subCategory.update({ disabled: true })
      )
    );

    await Promise.all(
      subCategoriesFetched.map((subCategory) =>
        subCategory.update({ disabled: true })
      )
    );

    const subSubCategoriesFetched = await SubSubCategory.findAll({
      where: {
        subCategoryId: subCategoriesFetched.map(
          (subCategory) => subCategory.id
        ),
      },
    });

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
      message: "Categories disabled successfully",
      disabledCategories: subCategoriesFetched.map(
        (subCategory) => subCategory.id
      ),
    });
  },
};

export default subCategoriesController;
