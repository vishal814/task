const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const mongoose = require("mongoose");
require("dotenv").config();



const app = express();
const PORT = 8080;

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECT_STRING);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}
connectDB();
const Image = require("./models/Image");
app.use(express.json());


// Serve static files from the public directory under /public
app.use("/public", express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "public", "images");
    fs.mkdirSync(uploadPath, { recursive: true }); // Creates the folder if it doesn't exist
    cb(null, uploadPath); // Set destination
  },
   filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // Create a unique filename using timestamp
    cb(null, uniqueName); // Rename file to avoid duplicates
  }
})
  const upload = multer({ storage });

app.post("/api/upload"  , upload.single("image"), async(req, res) => {
    const { title, category, tags } = req.body;
    if (!req.file || !title || !category) {
    return res.status(400).json({
      isSuccess: false,
      message: "Image, title, and category are required"
    });
  }
try{
const tagArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];
const newImage = new Image({
  title,
  category,
  tags: tagArray,
  imageUrl: `/public/images/${req.file.filename}`
});

 await newImage.save();
 res.status(201).json({
    isSuccess: true,
    message: "Image uploaded successfully",
    image: newImage
  });
}
catch (error) {
  console.error(error);
  res.status(500).json({
    isSuccess: false,
    message: "An error occurred while uploading the image"
  });
}
});

app.get("/api/images", async (req, res) => {
  const { cat, tags } = req.query;

  let filter = {};

  if (cat) {
    filter.category = cat;
  }

  if (tags) {
    const tagArray = tags.split(",").map(tag => tag.trim());
    filter.tags = { $in: tagArray };
  }

  try {
    const images = await Image.find(filter);

    const fullData = images.map(img => ({
      ...img._doc,
      imageUrl: `http://localhost:${PORT}${img.imageUrl}`
    }));

    res.json({
      isSuccess: true,
      message: "Filtered images fetched",
      data: fullData
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: "Error fetching images",
      data: []
    });
  }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
