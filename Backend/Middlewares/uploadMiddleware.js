import multer from "multer";
import path from "path";
import fs from "fs";

// Check if we're on Vercel (serverless environment)
const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

// Use memory storage for Vercel (serverless), disk storage for local
let storage;

if (isVercel) {
  // Vercel: Use memory storage (files are processed in memory, not saved to disk)
  storage = multer.memoryStorage();
} else {
  // Local: Use disk storage
  const uploadPath = "uploads/csv";
  try {
    // Only create directory if it doesn't exist and we're not on Vercel
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
  } catch (error) {
    console.warn("Could not create upload directory:", error.message);
  }

  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
}

const allowedMimeTypes = new Set([
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
]);

const allowedExtensions = [".csv", ".xls", ".xlsx"];

// Allow only CSV or Excel files
const fileFilter = (req, file, cb) => {
  console.log("Multer: FileFilter function called, file mimetype:", file.mimetype);
  const normalizedName = file.originalname.toLowerCase();
  if (allowedMimeTypes.has(file.mimetype) || allowedExtensions.some((ext) => normalizedName.endsWith(ext))) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV or Excel files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
