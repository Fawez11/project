import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express, { json, urlencoded, static as serveStatic } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./App/routes/userRoutes.js";
import productRoutes from "./App/routes/productRoutes.js";
import categoryRoutes from "./App/routes/categoryRoutes.js";
import mediaRoutes from "./App/routes/mediaRoutes.js";
import partnerRoutes from "./App/routes/partnerRoutes.js";
import cartRoutes from "./App/routes/cartRoutes.js";
import subCategoryRoutes from "./App/routes/subCategoryRoutes.js";
import subsubCategoriesRoutes from "./App/routes/subSubCategoryRoutes.js";
import characteristicsRoutes from "./App/routes/characteristicRoutes.js";
import subcharacteristicsRoutes from "./App/routes/subCharacteristicRoutes.js";
import sliderRoutes from "./App/routes/sliderRoutes.js";

// Fixing __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

// Middleware
// CORS Configuration
const corsOptions = {
  origin: "*",
  // origin: [process.env.ADMIN_DOMAIN_NAME, process.env.CLIENT_DOMAIN_NAME], // Replace with your frontend domain in production
  // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  // credentials: true,
  // maxAge: 86400,
  // preflightContinue: false,
  // optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Handle preflight requests
// app.options("*", cors(corsOptions));

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
    // contentSecurityPolicy: {
    //   directives: {
    //     defaultSrc: ["'self'"],
    //     connectSrc: ["'self'", "*"],
    //     frameSrc: ["'self'"],
    //     childSrc: ["'self'"],
    //     scriptSrc: ["'self'", "'unsafe-inline'"],
    //     styleSrc: ["'self'", "'unsafe-inline'"],
    //     imgSrc: ["'self'", "data:", "https:"],
    //   },
    // },
  })
);

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Add headers middleware
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");

//   // Handle OPTIONS method
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }
//   next();
// });
app.use(morgan("dev"));

// Static folder for uploaded files
app.use("/api/uploads", serveStatic(join(__dirname, "./Uploads")));

// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to the OSIS");
});

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subCategory", subCategoryRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/subSubCategory", subsubCategoriesRoutes);
app.use("/api/characteristics", characteristicsRoutes);
app.use("/api/subcharacteristics", subcharacteristicsRoutes);
app.use("/api/slider", sliderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

export default app;
