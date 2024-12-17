import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategories,
  getAllCategoriesWithSubCategories,
  handleEnable,
  handleDisable,
} from "../controllers/categoryController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";
import { uploadSingle } from "../middlewares/multerMiddleware.js";
import comparePassword from "../middlewares/comparePassword.js";

const router = Router();

router.post(
  "/add",
  // verifyToken,
  // checkAdminRole,
  uploadSingle,
  createCategory
);
router.get("/getAll", getAllCategories);
router.get("/getOne/:id", getCategoryById);
router.patch(
  "/update/:id",
  // verifyToken,
  // checkAdminRole,
  uploadSingle,
  updateCategory
);
router.delete(
  "/delete",
  verifyToken,
  checkAdminRole,
  comparePassword,
  deleteCategories
);
router.get("/getAllWithSubCategories", getAllCategoriesWithSubCategories);
router.patch(
  "/handleEnable",
  // verifyToken,
  // checkAdminRole,
  handleEnable
);
router.patch(
  "/handleDisable",
  // verifyToken,
  // checkAdminRole,
  handleDisable
);
export default router;
