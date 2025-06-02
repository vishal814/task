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
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
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

app.post("/api/image"  , upload.single("image"), async(req, res) => {
    const { title, category, tags } = req.body;
    if (!req.file || !title || !category) 
      {
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
  const { cat, tags,showPrivate } = req.query;

  let filter = {};

  if (cat) {
    filter.category = cat;
  }

  if (tags) {
    const tagArray = tags.split(",").map(tag => tag.trim());
    filter.tags = { $in: tagArray };
  }

  if (showPrivate === "true") {
    filter.isPublic = false; // Show private images
  }
  else {
    filter.isPublic = true; // Show only public images
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

app.put('/api/images/:id', async (req, res) => {
  const { title, category, tags } = req.body;

  const updateFields = {};
  if (title) updateFields.title = title;
  if (category) updateFields.category = category;
  if (tags) updateFields.tags = tags;

  try {
    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ isSuccess: false, message: 'Image not found' });
    }

    res.json({ isSuccess: true, message: 'Image updated', data: updatedImage });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: 'Update failed' });
  }
}); 

app.patch('/api/images/:id/toggle', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ isSuccess: false, message: 'Image not found' });
    }

    image.isPublic = !image.isPublic;
    await image.save();

    res.json({
      isSuccess: true,
      message: `Image is now ${image.isPublic ? 'public' : 'private'}`,
      data: image
    });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: 'Toggle failed' });
  }
});

app.delete('/api/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ isSuccess: false, message: 'Image not found' });
    }

    // Delete the image file from the filesystem
    const filePath = path.join(__dirname, image.imageUrl);
    fs.unlink(filePath, async (err) => {
      if (err && err.code !== 'ENOENT') {
        return res.status(500).json({ isSuccess: false, message: 'Failed to delete image file' });
      }

      // Delete from MongoDB
      await Image.findByIdAndDelete(req.params.id);

      res.json({ isSuccess: true, message: 'Image deleted successfully' });
    });

  } catch (error) {
    res.status(500).json({ isSuccess: false, message: 'Server error' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
