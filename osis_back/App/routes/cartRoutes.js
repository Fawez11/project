import express from "express";
import {
  addToCart,
  getUserCarts,
  updateCartStatus,
  updateCart,
  getAllCarts,
  deleteCartOrders,
} from "../controllers/cartController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";

const router = express.Router();
// Get user carts with pagination
// GET /api/carts/user-carts?page=1&size=10&status=Pending

// Get all carts (admin)
// GET /api/carts/all?page=1&size=10&status=Accepted
// User routes
router.post("/add", verifyToken, addToCart);
router.get("/user-carts", verifyToken, getUserCarts);
router.put("/:cartId", verifyToken, updateCart);
router.get("/all", verifyToken, checkAdminRole, getAllCarts);
router.patch("/:cartId/status", checkAdminRole, verifyToken, updateCartStatus);
router.delete("/:cartId/orders", verifyToken, deleteCartOrders);

export default router;
