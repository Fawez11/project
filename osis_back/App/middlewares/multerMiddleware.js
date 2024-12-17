import multer, { diskStorage } from "multer";
import { extname } from "path";

const storage = diskStorage({
  destination: (req, file, cb) => {
    console.log("Multer destination called with file:", file);
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log("Multer filename called with file:", file);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  console.log("Multer fileFilter called with:", {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype,
  });

  const allowedTypes = /jpeg|jpg|png|gif|mp4|mkv|avi/;
  const extnames = allowedTypes.test(extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extnames && mimetype) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Got mimetype: ${file.mimetype}`), false);
  }
};

// Create multer instance with more detailed error handling
const uploadConfig = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1,
  },
  fileFilter,
}).single("image"); // Changed from 'file' to 'image'

export const uploadSingle = (req, res, next) => {
  console.log("Starting file upload process");
  console.log("Request headers:", req.headers);

  uploadConfig(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(400).json({
        message: "File upload error",
        error: err.message,
        code: err.code,
      });
    } else if (err) {
      console.error("Unknown error:", err);
      return res.status(500).json({
        message: "Unknown upload error",
        error: err.message,
      });
    }

    console.log("File upload result:", {
      file: req.file,
      body: req.body,
    });

    next();
  });
};

export const uploadMultiple = (req, res, next) => {
  const multiUpload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter,
  }).array("files", 10);

  multiUpload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        message: "Files upload failed",
        error: err.message,
      });
    }
    next();
  });
};
