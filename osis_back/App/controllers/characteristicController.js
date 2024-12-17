import models from "../models/models.js";
import { Sequelize } from "sequelize";
const { Op } = Sequelize;
const { Characteristic, SubCharacteristic } = models;
import { characteristicsData } from "../../utils/faker/data/characteristics.js";

const createCharacteristic = async (req, res) => {
  try {
    const { title } = req.body;
    const { productId } = req.params;

    const newCharacteristic = await Characteristic.create({ title, productId });
    res.status(201).json({
      message: "Characteristic created successfully",
      characteristic: newCharacteristic,
    });
  } catch (error) {
    console.error("Error creating characteristic:", error);
    res
      .status(500)
      .json({ message: "Error creating characteristic", error: error.message });
  }
};

const getAllCharacteristics = async (req, res) => {
  try {
    const characteristics = await Characteristic.findAll({
      include: [
        {
          model: SubCharacteristic,
          as: "subCharacteristics",
        },
      ],
    });
    res.status(200).json({ characteristics });
  } catch (error) {
    console.error("Error fetching characteristics:", error);
    res.status(500).json({
      message: "Error fetching characteristics",
      error: error.message,
    });
  }
};

// Get a characteristic by ID
const getCharacteristicById = async (req, res) => {
  try {
    const { id } = req.params;

    const characteristic = await Characteristic.findByPk(id);
    if (!characteristic) {
      return res.status(404).json({ message: "Characteristic not found" });
    }

    res.status(200).json(characteristic);
  } catch (error) {
    console.error("Error fetching characteristic by ID:", error);
    res
      .status(500)
      .json({ message: "Error fetching characteristic", error: error.message });
  }
};

// Update a characteristic
const updateCharacteristic = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const characteristic = await Characteristic.findByPk(id);
    if (!characteristic) {
      return res.status(404).json({ message: "Characteristic not found" });
    }

    // Update only the fields provided in updatedData
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] !== undefined) {
        characteristic[key] = updatedData[key];
      }
    });

    // Save the updated characteristic
    await characteristic.save();

    res.status(200).json({
      message: "Characteristic updated successfully",
      characteristic,
    });
  } catch (error) {
    console.error("Error updating characteristic:", error);
    res
      .status(500)
      .json({ message: "Error updating characteristic", error: error.message });
  }
};

// Delete a characteristic
const deleteCharacteristic = async (req, res) => {
  try {
    const { id } = req.params;

    const characteristic = await Characteristic.findByPk(id);
    if (!characteristic) {
      return res.status(404).json({ message: "Characteristic not found" });
    }

    await characteristic.destroy();
    res.status(200).json({ message: "Characteristic deleted successfully" });
  } catch (error) {
    console.error("Error deleting characteristic:", error);
    res
      .status(500)
      .json({ message: "Error deleting characteristic", error: error.message });
  }
};

// Get characteristics by product ID
const getCharacteristicsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    const characteristics = await Characteristic.findAll({
      where: { productId },
    });
    if (!characteristics.length) {
      return res
        .status(404)
        .json({ message: "No characteristics found for this product" });
    }

    res.status(200).json({ characteristics });
  } catch (error) {
    console.error("Error fetching characteristics by product ID:", error);
    res.status(500).json({
      message: "Error fetching characteristics",
      error: error.message,
    });
  }
};

// Get characteristics for a SubCategory (including all its SubSubCategories)
const getCharacteristicsBySubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    if (!subCategoryId) {
      return res.status(400).json({
        success: false,
        error: "subCategoryId is required",
      });
    }

    const characteristics = await models.Characteristic.findAll({
      where: { subCategoryId },
      include: [
        {
          model: models.SubCharacteristic,
          as: "subCharacteristics",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      characteristics,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get characteristics for a SubSubCategory
const getCharacteristicsBySubSubCategory = async (req, res) => {
  try {
    const { subSubCategoryId } = req.params;

    if (!subSubCategoryId) {
      return res.status(400).json({
        success: false,
        error: "subSubCategoryId is required",
      });
    }

    const characteristics = await models.Characteristic.findAll({
      where: { subSubCategoryId },
      include: [
        {
          model: models.SubCharacteristic,
          as: "subCharacteristics",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      characteristics,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  createCharacteristic,
  getAllCharacteristics,
  getCharacteristicById,
  updateCharacteristic,
  deleteCharacteristic,
  getCharacteristicsByProductId,
  getCharacteristicsBySubCategory,
  getCharacteristicsBySubSubCategory,
};
