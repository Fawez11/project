import models from "../models/models.js";
const {
  Product,
  Media,
  User,
  SubCharacteristic,
  Partner,
  ProductSubCharacteristic,
  SubSubCategory,
} = models;
import dotenv from "dotenv";
dotenv.config();
import { Op, Sequelize } from "sequelize";
const searchOneProduct = async (req, res) => {
  const { query } = req.query;
  const products = await Product.findAll({
    where: { name: { [Op.like]: `%${query}%` } },
  });
  return res.status(200).json(products);
};
// Function to add a new product
const addProduct = async (req, res) => {
  const { body, params, files } = req;
  const { name, description, price, quantity } = body;
  const { subSubCategoryId, partnerId } = params;
  const { DOMAIN_NAME, PORT } = process.env;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      subSubCategoryId,
      partnerId,
      ref: `${name}-${partnerId}`,
    });
    const productAdded = product.dataValues;
    const { id } = productAdded;
    await Media.bulkCreate(
      files.map((file) => {
        const { filename } = file;
        return {
          filePath: `${DOMAIN_NAME}/api/uploads/${filename}`,
          productId: id,
        };
      })
    );
    return res.status(201).json(productAdded);
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ error: "Error adding product" });
  }
};

// Function to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      // loggedInUserId: req.user.id,
      include: [
        {
          model: Media,
          as: "media",
          attributes: ["id", "filePath"],
        },
      ],
    });

    // Cache will be handled by middleware
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Error fetching products" });
  }
};

// Function to update a product
const updateProduct = async (req, res) => {
  const { id } = req.params; // Extract product ID from request parameters
  const updatedData = req.body; // Extract updated data from the request body

  try {
    const product = await Product.findByPk(id); // Find the product by ID
    if (!product) {
      return res.status(404).json({ error: "Product not found" }); // Send a not found response
    }

    // Update only the fields that are provided in updatedData
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] !== undefined) {
        product[key] = updatedData[key]; // Update each field
      }
    });

    await product.save(); // Save the updated product

    console.log("Product updated:", product.toJSON());
    return res.status(200).json(product); // Send the updated product in the response
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Error updating product" }); // Send an error response
  }
};

// Function to delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ error: "Product not found" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Error deleting product" });
  }
};

const getAllProductsBySubSubCategoryId = async (req, res) => {
  const { subSubCategoryId } = req.params;
  try {
    const products = await Product.findAll({ where: { subSubCategoryId } });
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by sub-sub category:", error);
    return res.status(500).json({ message: "Error fetching products", error });
  }
};

const handleEnable = async (req, res) => {
  const { body } = req;
  const { productsIds } = body; // Assume IDs are sent in the request body
  if (!Array.isArray(productsIds) || productsIds.length === 0) {
    return res.status(400).json({ message: "Invalid or missing products IDs" });
  }

  const productsFetched = await Product.findAll({
    where: {
      id: productsIds,
      disabled: true,
    },
  });

  await Promise.all(
    productsFetched.map((product) => product.update({ disabled: false }))
  );

  res.status(200).json({
    message: "Products enabled successfully",
    enabledProducts: productsFetched.map((product) => product.id),
  });
};

const handleDisable = async (req, res) => {
  const { body } = req;
  const { productsIds } = body; // Assume IDs are sent in the request body
  if (!Array.isArray(productsIds) || productsIds.length === 0) {
    return res.status(400).json({ message: "Invalid or missing products IDs" });
  }

  // Fetch all products with the given IDs
  const productsFetched = await Product.findAll({
    where: {
      id: productsIds,
      disabled: false, // Only fetch products that are currently enabled
    },
  });

  if (productsFetched.length === 0) {
    return res.status(404).json({ message: "No products found to disable" });
  }

  // Update the `disabled` attribute to `true` for the fetched categories
  await Promise.all(
    productsFetched.map((product) => product.update({ disabled: true }))
  );

  res.status(200).json({
    message: "Products disabled successfully",
    disabledProducts: productsFetched.map((product) => product.id),
  });
};

const deleteProducts = async (req, res) => {
  try {
    const { body } = req;
    const { ids } = body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or empty IDs array" });
    }
    const deletedCount = await Product.destroy({ where: { id: ids } });
    if (deletedCount > 0) {
      res.status(200).json({ message: `${deletedCount} products deleted` });
    } else {
      res.status(404).json({ message: "No products found for the given IDs" });
    }
  } catch (error) {
    console.error("Error deleting products:", error);
    return res.status(500).json({ error: "Error deleting products" });
  }
};

// Function to get all products by partner ID
const getAllProductsByPartnerId = async (req, res) => {
  const { partnerId } = req.params;
  try {
    const products = await Product.findAll({ where: { partnerId } });
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by partner ID:", error);
    return res.status(500).json({ message: "Error fetching products", error });
  }
};

// bookmarks functions
const addBookmark = async (req, res) => {
  const { params, user } = req;
  const { productId } = params;

  try {
    const fetchedUser = await User.findByPk(user.id);
    if (!fetchedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await fetchedUser.addProduct(product);
    return res.status(201).json({ message: "Bookmark added successfully" });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return res.status(500).json({ error: "Error adding bookmark" });
  }
};

const getAllBookmarksByUserId = async (req, res) => {
  const { user } = req;

  try {
    const fetchedUser = await User.findByPk(user.id, {});
    console.log(fetchedUser);
    if (!fetchedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const bookmarks = await fetchedUser.getProduct();
    return res.status(200).json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks by fetchedUser ID:", error);
    return res.status(500).json({ error: "Error fetching bookmarks" });
  }
};

const removeBookmark = async (req, res) => {
  const { params, user } = req;
  const { productId } = params;
  try {
    const fetchedUser = await User.findByPk(user.id);
    if (!fetchedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await fetchedUser.removeProduct(product);
    return res.status(200).json({ message: "Bookmark removed successfully" });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return res.status(500).json({ error: "Error removing bookmark" });
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    const {
      subSubCategoryId,
      subCategoryId,
      subCharacteristics,
      minPrice,
      maxPrice,
      isOnSale,
      isTopSeller,
      inStock,
      hasDiscount,
    } = req.query;

    // Base query options
    const queryOptions = {
      where: {
        disabled: false,
      },
      include: [
        {
          model: Media,
          as: "media",
          attributes: ["filePath"],
        },
      ],
    };

    // Context-specific filtering (subCategory or subSubCategory)
    if (subSubCategoryId) {
      queryOptions.where.subSubCategoryId = subSubCategoryId;
    } else if (subCategoryId) {
      queryOptions.include.push({
        model: SubSubCategory,
        as: "subSubCategory",
        where: { subCategoryId },
        attributes: [],
      });
    }

    // Price range filter
    if (minPrice !== undefined && maxPrice !== undefined) {
      queryOptions.where.finalPrice = {
        [Op.between]: [minPrice, maxPrice],
      };
    }

    // Boolean filters
    if (isOnSale === "true") {
      queryOptions.where.isOnSale = true;
      // When on sale, can't be top seller
      queryOptions.where.isTopSeller = false;
    }

    if (isTopSeller === "true") {
      queryOptions.where.isTopSeller = true;
      // Top sellers can't be on sale and don't have discounts
      queryOptions.where.isOnSale = false;
      queryOptions.where.discountPercentage = null;
    }

    if (inStock === "true") {
      queryOptions.where.availability = true;
      queryOptions.where.quantity = {
        [Op.gt]: 0,
      };
    }

    if (hasDiscount === "true") {
      queryOptions.where.discountPercentage = {
        [Op.not]: null,
        [Op.gt]: 0,
      };
      // Items with discount should be marked as on sale
      queryOptions.where.isOnSale = true;
    }

    // Add characteristics filtering if selected
    if (subCharacteristics?.length > 0) {
      queryOptions.include.push({
        model: SubCharacteristic,
        as: "characteristics",
        where: {
          id: {
            [Op.in]: Array.isArray(subCharacteristics)
              ? subCharacteristics
              : [subCharacteristics],
          },
        },
        through: { attributes: [] },
      });
    }

    const products = await Product.findAll(queryOptions);

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error in getFilteredProducts:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Add this new function
const getPriceRange = async (req, res) => {
  try {
    const { subCategoryId, subSubCategoryId } = req.params;

    let whereClause = {
      disabled: false,
    };

    if (subSubCategoryId) {
      whereClause.subSubCategoryId = subSubCategoryId;
    } else if (subCategoryId) {
      // For subCategory, we need to include all its subSubCategories
      const subSubCategories = await SubSubCategory.findAll({
        where: { subCategoryId },
        attributes: ["id"],
      });

      whereClause.subSubCategoryId = {
        [Op.in]: subSubCategories.map((sub) => sub.id),
      };
    }

    const priceRange = await Product.findAll({
      where: whereClause,
      attributes: [
        [Sequelize.fn("MIN", Sequelize.col("finalPrice")), "minPrice"],
        [Sequelize.fn("MAX", Sequelize.col("finalPrice")), "maxPrice"],
      ],
      raw: true,
    });

    return res.status(200).json({
      success: true,
      minPrice: Math.floor(priceRange[0].minPrice),
      maxPrice: Math.ceil(priceRange[0].maxPrice),
    });
  } catch (error) {
    console.error("Error getting price range:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Add this new function
const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { id },
      include: [
        {
          model: Media,
          as: "media",
          attributes: ["id", "filePath", "primary"],
        },
        {
          model: SubCharacteristic,
          as: "characteristics",
          through: ProductSubCharacteristic,
          attributes: ["id", "title"],
        },
        {
          model: Partner,
          as: "partner",
          attributes: ["id", "name"],
        },
        {
          model: SubSubCategory,
          as: "subSubCategory",
          attributes: ["id", "title"],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Add this new function
const getSimilarProducts = async (req, res) => {
  const { productId } = req.params;
  try {
    console.log("Fetching similar products for productId:", productId);

    const currentProduct = await Product.findByPk(productId, {
      include: [
        {
          model: SubSubCategory,
          as: "subSubCategory",
        },
      ],
    });

    if (!currentProduct) {
      console.log("Current product not found");
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // First try to find products in the same subSubCategory
    let similarProducts = await Product.findAll({
      where: {
        id: { [Op.ne]: productId },
        subSubCategoryId: currentProduct.subSubCategoryId,
        disabled: false,
      },
      include: [
        {
          model: Media,
          as: "media",
          attributes: ["id", "filePath"],
        },
      ],
      limit: 4,
    });

    // If no products found in same subSubCategory, find products in similar price range
    if (similarProducts.length === 0) {
      const priceRange = {
        min: currentProduct.price * 0.7, // 30% below current price
        max: currentProduct.price * 1.3, // 30% above current price
      };

      similarProducts = await Product.findAll({
        where: {
          id: { [Op.ne]: productId },
          disabled: false,
          price: {
            [Op.between]: [priceRange.min, priceRange.max],
          },
        },
        include: [
          {
            model: Media,
            as: "media",
            attributes: ["id", "filePath"],
          },
        ],
        limit: 4,
      });
    }

    console.log("Found similar products:", similarProducts.length);

    return res.status(200).json({
      success: true,
      products: similarProducts,
    });
  } catch (error) {
    console.error("Detailed error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Add this new search function to your productController
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.status(200).json({
        success: true,
        products: [],
      });
    }

    const products = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            "$subSubCategory.title$": {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            "$characteristics.title$": {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
      include: [
        {
          model: Media,
          as: "media",
          attributes: ["filePath"],
          required: false,
        },
        {
          model: SubCharacteristic,
          as: "characteristics",
          attributes: ["title"],
          through: { attributes: [] },
          required: false,
        },
        {
          model: SubSubCategory,
          as: "subSubCategory",
          attributes: ["title"],
          required: false,
        },
      ],
      distinct: true,
    });

    // Only limit if we have more than 5 products
    const limitedProducts =
      products.length > 5 ? products.slice(0, 5) : products;

    return res.status(200).json({
      success: true,
      products: limitedProducts,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      error: "Error searching products",
      details: error.message,
    });
  }
};

export {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllProductsBySubSubCategoryId,
  getAllProductsByPartnerId,
  addBookmark,
  getAllBookmarksByUserId,
  removeBookmark,
  getFilteredProducts,
  handleEnable,
  handleDisable,
  deleteProducts,
  getPriceRange,
  getOneProduct,
  getSimilarProducts,
  searchProducts,
  searchOneProduct,
};
