import { Router } from "express";
const router = Router();
import subCategoriesController from "../controllers/subCategoryController.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";
import verifyToken from "../middlewares/verifyToken.js";
import comparePassword from "../middlewares/comparePassword.js";

router.get(
  "/getAll/categoryId/:categoryId",
  // verifyToken,
  // checkAdminRole,
  subCategoriesController.getAllSubCategoriesByCategoryId
);
router.post(
  "/add/:categoryId",
  // verifyToken,
  // checkAdminRole,
  subCategoriesController.createSubCategories
);
router.get("/getAll", subCategoriesController.getAllSubCategories);
router.get("/getOne/:id", subCategoriesController.getSubCategoryById);
router.patch(
  "/update/:id",
  // verifyToken,
  // checkAdminRole,
  subCategoriesController.updateSubCategory
);
router.delete(
  "/delete",
  verifyToken,
  checkAdminRole,
  comparePassword,
  subCategoriesController.deleteSubCategories
);
router.patch(
  "/handleEnable",
  // verifyToken,
  // checkAdminRole,
  subCategoriesController.handleEnable
);
router.patch(
  "/handleDisable",
  // verifyToken,
  // checkAdminRole,
  subCategoriesController.handleDisable
);
export default router;
