import { Router } from "express";

const router = Router();
import { validateRequest } from "../middlewares/validationMiddleware.js";
import { sliderValidation } from "../middlewares/validationMiddleware.js";
import {
  createSlider,
  getAllSlider,
  updateSliderById,
  deleteSliderById,
  activateSlider,
} from "../controllers/sliderController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";
import { uploadSingle } from "../middlewares/multerMiddleware.js";
router.post(
  "/add",
  verifyToken,
  checkAdminRole,
  uploadSingle,
  sliderValidation,
  validateRequest,
  createSlider
);
router.get("/getAll", getAllSlider);
router.patch(
  "/updateOne/:id",
  verifyToken,
  checkAdminRole,
  uploadSingle,
  updateSliderById
);
router.delete("/deleteOne/:id", verifyToken, checkAdminRole, deleteSliderById);
router.patch("/:id/activate", verifyToken, checkAdminRole, activateSlider);

export default router;
