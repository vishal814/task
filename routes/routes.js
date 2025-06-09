import express from "express";

const router = express.Router();
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  uploadImage,
  getImages,
  getCategories,
  updateImage,
  toggleImage,
  deleteImage
} from "../controller/ImageController.js";

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

export default router;
