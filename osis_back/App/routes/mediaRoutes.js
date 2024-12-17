import { Router } from "express";
import mediaController from "../controllers/mediaController.js";
import { uploadSingle } from "../middlewares/multerMiddleware.js";
const router = Router();

router.post("/add/userId/:userId", uploadSingle, mediaController.addMedia);
router.post("/add/adminId/:adminId", uploadSingle, mediaController.addMedia);
router.post(
  "/add/productId/:productId",
  uploadSingle,
  mediaController.addMedia
);
router.post(
  "/add/partnerId/:partnerId",
  uploadSingle,
  mediaController.addMedia
);
router.get("/getAll", mediaController.getAllMedias);
router.put("/update/:id", mediaController.updateMedia);
router.delete("/delete", mediaController.deleteAllMedia);
router.delete("/delete/:id", mediaController.deleteMediaById);

export default router;
