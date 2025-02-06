const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "uploads", // Cloudinary folder
    format: file.mimetype.split("/")[1], // Dynamically set format (jpg, png, pdf, etc.)
    public_id: Date.now() + "-" + file.originalname, // Unique filename
  }),
});

// Set up Multer with Cloudinary storage
const upload = multer({ storage });

module.exports = upload;
