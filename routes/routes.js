const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  uploadImage,
  getImages,
  getCategories,
  updateImage,
  toggleImage,
  deleteImage
} = require("../controller/ImageController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/images");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post("/images", upload.single("image"), uploadImage);
router.get("/images", getImages);
router.get("/category", getCategories);
router.put("/images/:id", updateImage);
router.patch("/images/:id/toggle", toggleImage);
router.delete("/images/:id", deleteImage);

module.exports = router;
