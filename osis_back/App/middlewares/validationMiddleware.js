import { body, validationResult } from "express-validator";
// Add to validationMiddleware.js
export const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Le mot de passe actuel est requis"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Le nouveau mot de passe doit contenir au moins 6 caractères")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)
    .withMessage(
      "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
    ),
];
const registerValidation = [
  body("taxNumber")
    .optional() // Make the taxNumber check optional
    .isLength({ min: 8 })
    .withMessage(
      "Le numéro de taxe doit comporter au moins 8 caractères 12345678-123-12."
    ) // Updated message
    .matches(/^(\d{8}|\d{8}-\d{3}-\d{2})$/),
  body("firstName").notEmpty().withMessage("Le prénom est requis."),
  body("lastName").notEmpty().withMessage("Le nom de famille est requis."),
  body("email")
    .isEmail()
    .withMessage("Veuillez fournir un email valide.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8, max: 30 })
    .withMessage("Le mot de passe doit contenir entre 8 et 30 caractères.")
    .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}:;"'<>,.?/]).*$/)
    .withMessage(
      "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial."
    ),
];

const updateValidation = [
  body("taxNumber")
    .optional() // Make the taxNumber check optional
    .isLength({ min: 8 })
    .withMessage(
      "Le numéro de taxe doit comporter au moins 8 caractères 12345678-123-12."
    ) // Updated message
    .matches(/^(\d{8}|\d{8}-\d{3}-\d{2})$/),
  body("firstName").optional().notEmpty().withMessage("Le prénom est requis."),
  body("lastName")
    .optional()
    .notEmpty()
    .withMessage("Le nom de famille est requis."),
  body("password")
    .optional()
    .isLength({ min: 8, max: 30 })
    .withMessage("Le mot de passe doit contenir entre 8 et 30 caractères.")
    .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}:;"'<>,.?/]).*$/)
    .withMessage(
      "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial."
    ),
];

const loginValidation = [
  body("email").isEmail().withMessage("Veuillez fournir un email valide."),
  body("password").notEmpty().withMessage("Le mot de passe est requis."),
];
const resetPasswordValidation = [
  body("newPassword")
    .isLength({ min: 8, max: 30 })
    .withMessage("Le mot de passe doit contenir entre 8 et 30 caractères.")
    .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}:;"'<>,.?/]).*$/)
    .withMessage(
      "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial."
    ),
];
const sliderValidation = [
  body("title").notEmpty().withMessage("Le titre est requis."),
  body("description").notEmpty().withMessage("La description est requise."),
  body("bannerType").notEmpty().withMessage("Le type de bannière est requis."),
];

const updateSliderProductValidation = [
  body("productIds")
    .isArray({ min: 1 })
    .withMessage("Le tableau des IDs des produits est requis."),
];
const validateRequest = (req, res, next) => {
  // Extract validation errors from the request object
  const errors = validationResult(req);
  // Check if there are any validation errors
  if (!errors.isEmpty()) {
    // If errors exist, respond with a 400 status and a string of error messages
    const errorMessages = errors
      .array()
      .map((error) => error.msg)
      .join(", ");
    return res.status(400).json({ message: errorMessages });
  }

  // If no errors, proceed to the next middleware or route handler
  next();
};

export {
  registerValidation,
  loginValidation,
  validateRequest,
  resetPasswordValidation,
  updateValidation,
  sliderValidation,
  updateSliderProductValidation,
};
