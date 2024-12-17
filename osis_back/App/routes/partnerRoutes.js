import { Router } from "express";
import {
  addPartner,
  getAllPartners,
  updatePartner,
  deletePartner,
  handleDisable,
  handleEnable,
} from "../controllers/partnerController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";
import { uploadSingle } from "../middlewares/multerMiddleware.js";
const router = Router();

router.post("/add", verifyToken, checkAdminRole, uploadSingle, addPartner);
router.get("/getAll", getAllPartners);
router.patch(
  "/update/:id",
  verifyToken,
  checkAdminRole,
  uploadSingle,
  updatePartner
);
router.delete("/delete/:id", verifyToken, checkAdminRole, deletePartner);
router.patch("/handleDisable", verifyToken, checkAdminRole, handleDisable);
router.patch("/handleEnable", verifyToken, checkAdminRole, handleEnable);

export default router;
