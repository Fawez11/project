import { unlink } from "fs";
import { resolve as _resolve } from "path";
import models from "../models/models.js";
const { Media } = models;

const mediaController = {
  // Function to add a new media
  addMedia: async (req, res) => {
    try {
      const { params, file } = req;
      const { productId } = params;
      const { path } = file;

      // Validate request body
      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }
      if (!productId) {
        return res.status(400).json({
          error: "Missing required relation field (productId).",
        });
      }

      // Save media record to the database
      const newMedia = await Media.create({
        filePath: path,
        productId: productId,
      });

      res
        .status(201)
        .json({ message: "File uploaded successfully", media: newMedia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  },

  // Function to get all media
  getAllMedias: async (req, res) => {
    try {
      const product = await Media.findAll({
        order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
      });
      return res.status(200).json(product.map((media) => media.toJSON())); // Send product in the response
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ error: "Error fetching product" }); // Send an error response
    }
  },

  // Function to update a media
  updateMedia: async (req, res) => {
    const { id } = req.params; // Extract media ID from request parameters
    const updatedData = req.body; // Extract updated data from the request body
    try {
      const [updated] = await Media.update(updatedData, {
        where: { id },
      });

      if (updated) {
        const updatedMedia = await Media.findByPk(id);
        console.log("Media updated:", updatedMedia.toJSON());
        return res.status(200).json(updatedMedia); // Send the updated media in the response
      }
      console.log("Media not found");
      return res.status(404).json({ error: "Media not found" }); // Send a not found response
    } catch (error) {
      console.error("Error updating media:", error);
      return res.status(500).json({ error: "Error updating media" }); // Send an error response
    }
  },

  // Function to delete a media by its ID
  deleteMediaById: async (req, res) => {
    const { id } = req.params; // Extract media ID from request parameters
    try {
      // Find the media to delete
      const media = await Media.findByPk(id);
      if (!media) {
        console.log("Media not found");
        return res.status(404).json({ error: "Media not found" }); // Send a not found response
      }

      // Delete the file from the local folder
      const filePath = _resolve(media.filePath);
      unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully:", filePath);
        }
      });

      // Delete the media record from the database
      await Media.destroy({
        where: { id },
      });

      console.log("Media deleted successfully");
      return res.status(204).send(); // Send no content response
    } catch (error) {
      console.error("Error deleting media:", error);
      return res.status(500).json({ error: "Error deleting media" }); // Send an error response
    }
  },

  // Function to delete all media
  // !!ONLY FOR DEV PHASE!!
  // **it may not work**
  deleteAllMedia: async (req, res) => {
    try {
      // Find all media records
      const allMedia = await Media.findAll({
        order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
      });

      // Prepare an array of promises to delete each file
      const deleteFilePromises = allMedia.map((media) => {
        const fileName = media.filePath.split("/").pop();
        const filePath = _resolve(`uploads/${fileName}`);
        return new Promise((_resolve, reject) => {
          unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
              reject(err); // Reject the promise if an error occurs
            } else {
              console.log("File deleted successfully:", filePath);
              _resolve(); // Resolve the promise on success
            }
          });
        });
      });

      // Wait for all file deletions to complete
      await Promise.all(deleteFilePromises);

      // Delete all media records from the database
      await Media.destroy({ truncate: true });

      console.log("All media deleted successfully");
      return res.status(204).send(); // Send no content response
    } catch (error) {
      console.error("Error deleting all media:", error);
      return res.status(500).json({ error: "Error deleting all media" }); // Send an error response
    }
  },
};

export default mediaController;
