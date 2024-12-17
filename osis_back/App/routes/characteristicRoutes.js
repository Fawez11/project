import { Router } from "express";
const router = Router();
import {
  createCharacteristic,
  getAllCharacteristics,
  getCharacteristicById,
  updateCharacteristic,
  deleteCharacteristic,
  getCharacteristicsByProductId,
  getCharacteristicsBySubCategory,
  getCharacteristicsBySubSubCategory,
} from "../controllers/characteristicController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";

// Base routes
router.post("/add", verifyToken, checkAdminRole, createCharacteristic);
router.get("/getAll", getAllCharacteristics);
router.get("/getOne/:id", getCharacteristicById);
router.patch("/update/:id", verifyToken, checkAdminRole, updateCharacteristic);
router.delete("/delete/:id", verifyToken, checkAdminRole, deleteCharacteristic);

// Characteristics by category type routes
router.get("/subcategory/:subCategoryId", getCharacteristicsBySubCategory);
router.get(
  "/subsubcategory/:subSubCategoryId",
  getCharacteristicsBySubSubCategory
);

export default router;
