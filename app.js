const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 8080;

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
app.use("/public/images", express.static(path.join(__dirname, "Public", "images")))    

app.get("/api/images", async (req, res) => {
    try {
        const imagesPath = path.join(__dirname, "Public", "images");
        const files = await fs.promises.readdir(imagesPath);

        // Filter out .gitkeep and create full URLs
        const imageUrls = files
            .filter((file) => file !== ".gitkeep")
            .map((file) => `http://localhost:${PORT}/Public/images/${file}`)
            

        res.json({
            isSuccess: true,
            message: "All images fetched",
            data: imageUrls,
        })
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "Error reading image directory",
            data: [],
        })
    }
})
app.post("/api/upload"  , upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            isSuccess: false,
            message: "No file uploaded",
        });
    }

    const imageUrl = `http://localhost:${PORT}/public/images/${req.file.filename}`;
    res.json({
        isSuccess: true,
        message: "Image uploaded successfully",
        data: imageUrl,
    })
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
