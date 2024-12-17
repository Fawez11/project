import models from "../models/models.js";
const { Slider, Product } = models;
import { Op } from "sequelize";

const createSlider = async (req, res) => {
  try {
    const { title, description, bannerType, tag, productId } = req.body;

    if (!req.file) {
      console.log("Fichier manquant dans la requête");
      return res.status(400).json({
        message: "L'image est requise",
        requestDetails: {
          contentType: req.headers["content-type"],
          hasFile: !!req.file,
          bodyKeys: Object.keys(req.body),
        },
      });
    }

    const photoUrl = `${process.env.DOMAIN_NAME}/api/uploads/${req.file.filename}`;

    if (!productId) {
      return res.status(400).json({
        message: "Le produit n'a pas été trouvé",
      });
    }
    if (productId) {
      const existingProduct = await Product.findOne({
        where: { id: productId },
      });
      console.log("existingProduct", existingProduct);
      if (!existingProduct) {
        return res.status(400).json({
          message: "Le produit n'a pas été trouvé",
        });
      }
    }

    const slider = await Slider.create({
      title,
      description,
      photoUrl,
      bannerType,
      tag,
      productId,
    });

    const response = await Slider.findByPk(slider.id, {
      include: [
        {
          model: Product,
          as: "product",
          attributes: [
            "id",
            "name",
            "price",
            "finalPrice",
            "isOnSale",
            "discountPercentage",
          ],
        },
      ],
    });

    res.status(201).json({ message: "Bannière créée avec succès", response });
  } catch (error) {
    console.error("Erreur lors de la création de la bannière:", error);
    res.status(500).json({
      message: "Erreur lors de la création de la bannière",
      error: error.message,
    });
  }
};

const getAllSlider = async (req, res) => {
  try {
    const { bannerType, tag, isActive } = req.query;
    const where = {};

    if (bannerType) where.bannerType = bannerType;
    if (tag) where.tag = tag;
    if (isActive) where.isActive = isActive;
    const response = await Slider.findAll({
      where,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Product,
          as: "product",
          attributes: [
            "id",
            "name",
            "price",
            "finalPrice",
            "isOnSale",
            "discountPercentage",
          ],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    throw error;
    res.status(500).json({
      message: "Erreur lors de la récupération des bannières",
      error,
    });
  }
};

const updateSliderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, bannerType, isActive, tag, productId } =
      req.body;

    console.log("Fichier de mise à jour:", req.file);

    const slider = await Slider.findByPk(id);
    if (!slider) {
      return res.status(404).json({ message: "Bannière non trouvée" });
    }

    const photoUrl = req.file
      ? `${process.env.DOMAIN_NAME}/api/uploads/${req.file.filename}`
      : slider.photoUrl;

    if (productId && slider.productId && productId !== slider.productId) {
      const existingSlider = await Product.findOne({
        where: {
          id: productId,
        },
      });

      if (!existingSlider) {
        return res.status(400).json({
          message: "Le produit n'a pas été trouvé",
        });
      }
    }

    const updateData = {
      title,
      description,
      bannerType,
      tag,
      productId,
      isActive: isActive ?? slider.isActive,
      photoUrl,
    };

    await slider.update(updateData);

    const updatedSlider = await Slider.findByPk(id, {
      include: [
        {
          model: Product,
          as: "product",
          attributes: [
            "id",
            "name",
            "price",
            "finalPrice",
            "isOnSale",
            "discountPercentage",
          ],
        },
      ],
    });

    res.status(200).json({
      message: "Bannière mise à jour avec succès",
      slider: updatedSlider,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la bannière",
      error,
    });
  }
};

const deleteSliderById = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findByPk(id);

    if (!slider) {
      return res.status(404).json({ message: "Bannière non trouvée" });
    }

    await slider.destroy();
    res.status(200).json({ message: "Bannière supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la bannière",
      error,
    });
  }
};

const activateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findByPk(id);

    if (!slider) {
      return res.status(404).json({ message: "Bannière non trouvée" });
    }

    await slider.update({ isActive: !slider.isActive });

    const updatedSlider = await Slider.findByPk(id, {
      include: [
        {
          model: Product,
          as: "product",
          attributes: [
            "id",
            "name",
            "price",
            "finalPrice",
            "isOnSale",
            "discountPercentage",
          ],
        },
      ],
    });

    res.status(200).json({
      message: "Statut de la bannière modifié avec succès",
      slider: updatedSlider,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la modification du statut de la bannière",
      error,
    });
  }
};

export {
  createSlider,
  getAllSlider,
  updateSliderById,
  deleteSliderById,
  activateSlider,
};
