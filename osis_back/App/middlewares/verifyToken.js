import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// This middleware checks if the user is authenticated
const verifyToken = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Non autorisé" }); // Unauthorized
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "session invalide ou expiré." }); // Invalid token
  }
};

export default verifyToken;
