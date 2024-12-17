import { Router } from "express";
import { uploadMultiple } from "../middlewares/multerMiddleware.js";
const router = Router();

import {
  getAllProducts,
  addProduct,
  getAllProductsBySubSubCategoryId,
  getAllProductsByPartnerId,
  getFilteredProducts,
  searchProducts,
  addBookmark,
  getAllBookmarksByUserId,
  removeBookmark,
  handleEnable,
  handleDisable,
  deleteProducts,
  getPriceRange,
  getOneProduct,
  getSimilarProducts,
  searchOneProduct,
} from "../controllers/productController.js";

import verifyToken from "../middlewares/verifyToken.js";
import comparePassword from "../middlewares/comparePassword.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";

router.get("/filter", getFilteredProducts);
router.get("/getAll", getAllProducts);
router.post("/add/:subSubCategoryId/:partnerId", uploadMultiple, addProduct);
router.get(
  "/subSubCategory/:subSubCategoryId",
  getAllProductsBySubSubCategoryId
);
router.get("/partner/:partnerId", getAllProductsByPartnerId);
router.get("/getAllBookmarks", verifyToken, getAllBookmarksByUserId);
router.delete("/removeBookmark/:productId", verifyToken, removeBookmark);
router.patch("/handleEnable", verifyToken, checkAdminRole, handleEnable);
router.patch("/handleDisable", verifyToken, checkAdminRole, handleDisable);
router.delete(
  "/delete",
  verifyToken,
  checkAdminRole,
  comparePassword,
  deleteProducts
);
router.get("/priceRange/subCategory/:subCategoryId", getPriceRange);
router.get("/priceRange/subSubCategory/:subSubCategoryId", getPriceRange);
router.get("/getOne/:id", getOneProduct);
router.get("/similar/:productId", getSimilarProducts);
router.get("/search", searchProducts);
router.get("/searchOne", searchOneProduct);

export default router;
