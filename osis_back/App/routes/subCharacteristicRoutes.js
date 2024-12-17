import { Router } from "express";
const router = Router();
import {
  createSubCharacteristic,
  getAllSubCharacteristics,
  getSubCharacteristicById,
  updateSubCharacteristic,
  deleteSubCharacteristic,
  getAllSubCharacteristicsByCharacteristicId,
} from "../controllers/subCharacteristicController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";

router.post("/add", verifyToken, checkAdminRole, createSubCharacteristic);
router.get("/getAll", getAllSubCharacteristics);
router.get("/getOne/:id", getSubCharacteristicById);
router.patch(
  "/update/:id",
  verifyToken,
  checkAdminRole,
  updateSubCharacteristic
);
router.delete(
  "/delete/:id",
  verifyToken,
  checkAdminRole,
  deleteSubCharacteristic
);
router.get("/getCharbyid/:id", getAllSubCharacteristicsByCharacteristicId);

export default router;
