import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getCurentUser,
  resetPassword,
  requestPasswordChange,
  updateUser,
  requestEmailVerification,
  verifyEmail,
  changePassword,
} from "../controllers/userController.js";
import resetPasswordLimiter from "../middlewares/resetPasswordLimiter.js";
import verificationEmailLimiter from "../middlewares/verificationEmail.js";

import {
  registerValidation,
  loginValidation,
  validateRequest,
  updateValidation,
  resetPasswordValidation,
  changePasswordValidation,
} from "../middlewares/validationMiddleware.js";
import loginLimiter from "../middlewares/loginLimiter.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadSingle } from "../middlewares/multerMiddleware.js";
const router = Router();

router.post(
  "/register",
  uploadSingle,
  registerValidation,
  validateRequest,
  registerUser
);
router.post("/login", loginLimiter, loginUser);
router.get("/currentuser", verifyToken, getCurentUser);
router.get(
  "/getAll",
  verifyToken, //checks if the user adding the new user is logged in
  checkAdminRole, // checks if the user adding the new user is an admin
  getAllUsers
);
router.put(
  "/update",
  uploadSingle,
  verifyToken,
  updateValidation,
  validateRequest,
  updateUser
);
router.post(
  "/request-password-change",
  verificationEmailLimiter,
  requestPasswordChange
); // New route for requesting password change
router.post(
  "/reset-password",
  verifyToken,
  resetPasswordLimiter,
  resetPasswordValidation,
  validateRequest,
  resetPassword
); // New route for resetting the password
router.post(
  "/request-email-verification",
  verificationEmailLimiter,
  requestEmailVerification
); // New route for requesting email verification
router.post("/verify-email", verificationEmailLimiter, verifyEmail); // New route for verifying email

router.put(
  "/change-password",
  verifyToken,
  changePasswordValidation,
  validateRequest,
  changePassword
);
export default router;
