import models from "../models/models.js";
const { SubCharacteristic } = models;

const createSubCharacteristic = async (req, res) => {
  try {
    const { title } = req.body;
    const { characteristicId } = req.params;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!characteristicId) {
      return res.status(400).json({ message: "Characteristic ID is required" });
    }

    const newSubCharacteristic = await SubCharacteristic.create({
      title,
      characteristicId,
    });
    return res.status(201).json({
      message: "SubCharacteristic created successfully",
      newSubCharacteristic,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating SubCharacteristic", error });
  }
};

// Get all SubCharacteristic
const getAllSubCharacteristics = async (req, res) => {
  try {
    const response = await SubCharacteristic.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    });
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching sub-characteristics", error });
  }
};

// Get a single SubCharacteristic by ID
const getSubCharacteristicById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await SubCharacteristic.findByPk(id);

    if (!response) {
      return res.status(404).json({ message: "SubCharacteristic not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching SubCharacteristic", error });
  }
};

// Update a SubCharacteristic by ID
const updateSubCharacteristic = async (req, res) => {
  try {
    const { id } = req.params; // Extract sub-characteristic ID from request parameters
    const updatedData = req.body; // Extract updated data from the request body

    const response = await SubCharacteristic.findByPk(id); // Find the sub-characteristic by ID
    if (!response) {
      return res.status(404).json({ message: "SubCharacteristic not found" }); // Send a not found response
    }

    // Update only the fields that are provided in updatedData
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] !== undefined) {
        response[key] = updatedData[key]; // Update each field
      }
    });

    await response.save(); // Save the updated sub-characteristic
    return res.status(200).json({
      message: "SubCharacteristic updated successfully",
      response,
    });
  } catch (error) {
    console.error("Error updating SubCharacteristic:", error);
    return res.status(500).json({
      message: "Error updating SubCharacteristic",
      error: error.message,
    });
  }
};

// Delete a sub-characteristic
const deleteSubCharacteristic = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await SubCharacteristic.findByPk(id);
    if (!response) {
      return res.status(404).json({ message: "Sub-characteristic not found" });
    }
    await SubCharacteristic.destroy();
    res.status(204).json({ message: "Sub-characteristic deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting SubCharacteristic", error });
  }
};

// Get all SubCharacteristics by characteristicId
const getAllSubCharacteristicsByCharacteristicId = async (req, res) => {
  try {
    const { characteristicId } = req.params;
    const response = await SubCharacteristic.findAll({
      where: { characteristicId },
    });

    if (response.length === 0) {
      return res.status(404).json({
        message: "No sub-characteristics found for this characteristic",
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching sub-characteristics by characteristicId",
      error,
    });
  }
};

export {
  createSubCharacteristic,
  getAllSubCharacteristics,
  getSubCharacteristicById,
  updateSubCharacteristic,
  deleteSubCharacteristic,
  getAllSubCharacteristicsByCharacteristicId,
};
