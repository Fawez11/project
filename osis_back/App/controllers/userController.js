import jwt from "jsonwebtoken";
import models from "../models/models.js";
import bcrypt from "bcrypt"; // Ensure bcrypt is imported
import { sendEmail } from "../../utils/mailing/index.js"; // Ensure this import is present
import crypto from "crypto"; // Import crypto for token generation

const { User } = models;
// ... existing code ...
// Add this to userController.js
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Verify current password
    const isValidPassword = await user.validPassword(currentPassword);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Mot de passe actuel incorrect." });
    }

    // Check if new password is same as current
    const isSamePassword = await user.validPassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        message: "Le nouveau mot de passe doit être différent de l'ancien.",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      message: "Mot de passe modifié avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const registerUser = async (req, res) => {
  const { body, file } = req;
  const {
    firstName,
    socialTitle,
    lastName,
    enterprise,
    taxNumber,
    titreSocial,
    email,
    password,
  } = body;
  // const { filename } = file;
  const { DOMAIN_NAME, PORT } = process.env;

  try {
    let commonFile = { filename: "", path: "", mimetype: "" };
    if (req?.file) {
      let { file } = req;
      let { filename, path, mimetype } = req.file;
      commonFile = { ...file };
    }
    const { filename, path, mimetype } = commonFile;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        error:
          "Le numéro de taxe existe déjà. Chaque utilisateur doit avoir un numéro de taxe unique.",
      });
    }

    const newUser = await User.create({
      socialTitle,
      firstName,
      lastName,
      enterprise,
      taxNumber,
      titreSocial,
      email,
      password,
      photoUrl: path
        ? `${process.env.DOMAIN_NAME}/api/uploads/${filename}`
        : `${process.env.DOMAIN_NAME}/api/uploads/avatar.png`,
      blockedUntil: null,
      blockReason: null,
    });

    return res.status(201).json({
      message: "Utilisateur enregistré avec succès",
      user: newUser,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      const errorMessage = "L'email existe déjà.";
      return res.status(400).json({ error: errorMessage });
    }

    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Log in an existing user
const loginUser = async (req, res) => {
  const { role, email, password, rememberMe } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    // Check if user exists
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      if (user.blockedUntil && new Date() < new Date(user.blockedUntil)) {
        return res.status(403).json({
          message:
            "Compte temporairement bloqué en raison de trop de tentatives échouées.",
          blockedUntil: user.blockedUntil,
        });
      }
      // If block duration has passed, unblock user
      await User.update(
        {
          isBlocked: false,
          blockedUntil: null,
          blockReason: null,
        },
        { where: { id: user.id } }
      );
    }

    if (role !== user.role) {
      return res.status(400).json({ message: "Rôle inconnu !" });
    }

    const tokenExpiration = rememberMe ? "30d" : "7d";
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: tokenExpiration,
    });

    user.password = undefined;
    return res.status(200).json({
      message: "Connexion réussie",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get current user
const getCurentUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = (await User.findByPk(id)) || null;
    return res.status(200).json({
      message: "Utilisateur trouvé",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    });
    return res
      .status(200)
      .json({ message: "Utilisateurs récupérés avec succès", users: response });
  } catch (error) {
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
// Update user information
const updateUser = async (req, res) => {
  const { id } = req.user; // Assuming the user ID is stored in the request object after authentication
  let commonFile = { filename: "", path: "", mimetype: "" };
  if (req?.file) {
    let { file } = req;
    let { filename, path, mimetype } = req.file;
    commonFile = { ...file };
  }
  const { filename, path, mimetype } = commonFile;
  const {
    socialTitle,
    firstName,
    lastName,
    enterprise,
    taxNumber,
    titreSocial,
    password,
  } = req.body;

  try {
    // Find the user by ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Check if the email is already in use by another user
    const existingUser = await User.findOne({
      where: { id: id },
    });
    if (!existingUser) {
      return res.status(400).json({
        message: "Utilisateur n'existe pas.",
      });
    }

    // Update user information
    user.socialTitle = socialTitle || user.socialTitle;
    user.password = password || user.password;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.enterprise = enterprise || user.enterprise;
    user.taxNumber = taxNumber || user.taxNumber;
    user.titreSocial = titreSocial || user.titreSocial;
    // user.email = email || user.email;
    user.photoUrl = path || user.photoUrl;

    await user.save(); // Save the updated user information

    return res.status(200).json({
      message: "Informations utilisateur mises à jour avec succès.",
      user,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations utilisateur :",
      error
    );
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
// Request password change
const requestPasswordChange = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    if (!user.isValid) {
      return res.status(404).json({ message: "Email non valid" });
    }
    // Check if user is blocked
    if (user.isBlocked) {
      if (user.blockedUntil && new Date() < new Date(user.blockedUntil)) {
        return res.status(403).json({
          message:
            "Compte temporairement bloqué en raison de trop de tentatives échouées.",
          blockedUntil: user.blockedUntil,
        });
      }
    }
    // Generate a token with a 5-minute expiration
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    let domain =
      user.role === "user"
        ? process.env.CLIENT_DOMAIN_NAME
        : process.env.ADMIN_DOMAIN_NAME;
    let url = `${domain}/resetPassword?token=${token}`;
    sendEmail(user.email, "changePassword", user.firstName, url);

    return res.status(200).json({
      message: "Lien de changement de mot de passe envoyé par email.",
    });
  } catch (error) {
    console.error(
      "Erreur lors de la demande de changement de mot de passe :",
      error
    );
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    // Verify the token
    const { id } = req.user;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    if (!user.isValid) {
      return res.status(404).json({ message: "Email n'est pas valide" });
    }
    user.password = newPassword; // Update the user's password
    await user.save();

    return res
      .status(200)
      .json({ message: "Mot de passe changé avec succès." });
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation du mot de passe :",
      error
    );
    return res.status(400).json({ message: "Token invalide ou expiré." });
  }
};

// Verify email
const verifyEmail = async (req, res) => {
  const { email, token } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Check if the token matches the user's verification token
    if (user.verificationToken !== token) {
      return res
        .status(400)
        .json({ message: "Token de vérification invalide." });
    }

    // Mark the user as verified
    user.isValid = true;
    user.verificationToken = null; // Clear the token after verification
    await user.save();

    return res.status(200).json({ message: "Email vérifié avec succès." });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Request email verification
const requestEmailVerification = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Generate a verification token
    const token = crypto.randomBytes(20).toString("hex");
    user.verificationToken = token; // Store the token in the user record
    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.CLIENT_DOMAIN_NAME}/verify-email?token=${token}&email=${email}`;
    sendEmail(user.email, "verifyEmail", user.firstName, verificationUrl);

    return res.status(200).json({
      message: "Lien de vérification envoyé par email.",
    });
  } catch (error) {
    console.error(
      "Erreur lors de la demande de vérification de l'email :",
      error
    );
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export {
  registerUser,
  loginUser,
  getAllUsers,
  getCurentUser,
  requestPasswordChange,
  resetPassword,
  updateUser,
  requestEmailVerification,
  verifyEmail,
  changePassword,
};
