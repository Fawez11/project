import jwt from "jsonwebtoken";
import models from "../models/models.js";
const { User } = models;

// This middleware checks if the user is an admin
const checkAdminRole = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "L'utilisateur du tableau de bord n'est pas authentifié !",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    console.log("role: ", user.role);
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Interdit : Réservé aux administrateurs" });
    }
    req.user = { id, role: user.role }; // Ensure the user object is correctly set
    next();
  } catch (error) {
    return res.status(403).json({ message: "Session invalide ou expiré." });
  }
};

// Export the middleware function
export { checkAdminRole };
