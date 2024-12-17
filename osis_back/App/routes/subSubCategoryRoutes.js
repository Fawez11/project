import { Router } from "express";
const router = Router();
import {
  createSubSubCategory,
  getAllSubSubCategories,
  getSubSubCategoryById,
  updateSubSubCategory,
  deleteSubSubCategories,
  getAllSubSubCategoriesBySubCategoryId,
  handleEnable,
  handleDisable,
} from "../controllers/subSubCategoryController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";
import comparePassword from "../middlewares/comparePassword.js";

router.post(
  "/add/:subCategoryId",
  // verifyToken,
  // checkAdminRole,
  createSubSubCategory
);
router.get("/getAll", getAllSubSubCategories);
router.get("/getOne/:id", getSubSubCategoryById);
router.patch(
  "/update/:id",
  // verifyToken,
  // checkAdminRole,
  updateSubSubCategory
);
router.delete(
  "/delete",
  verifyToken,
  checkAdminRole,
  comparePassword,
  deleteSubSubCategories
);
router.get("/getAll/subCategoryId/:id", getAllSubSubCategoriesBySubCategoryId);
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
