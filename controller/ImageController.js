import Image from "../models/Image.js";
import path from "path";
import fs from "fs";
const Categories = ['nature', 'travel', 'science', 'technology', 'sports'];

export const uploadImage = async (req, res) => {
  const { title, category, tags } = req.body;
 
  if (!req.file || !title || !category) {
    return res.status(400).json({
      isSuccess: false,
      message: "Image, title, and category are required"
    });
  }

  try {
    const tagArray = tags ? tags.split(",").map(tag => tag.trim()) : [];
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
      data: newImage
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: "An error occurred while uploading the image"
    });
  }
};
export const getImages= async (req, res) => {
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
    console.log("Filter:", filter); 
    const images = await Image.find(filter);

    const Data = images.map(img => ({
      ...img._doc,
      imageUrl: `http://localhost:${PORT}${img.imageUrl}`
    }));

    res.json({
      isSuccess: true,
      message: "Filtered images fetched",
      data: Data
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: "Error fetching images",
      data: []
    });
  }
};
export const updateImage = async (req, res) => {
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
};

export const toggleImage = async (req, res) => {
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
};

export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ isSuccess: false, message: 'Image not found' });
    }

    const filePath = path.join(__dirname, "../" + image.imageUrl);
    fs.unlink(filePath, async (err) => {
      if (err && err.code !== 'ENOENT') {
        return res.status(500).json({ isSuccess: false, message: 'Failed to delete image file' });
      }

      await Image.findByIdAndDelete(req.params.id);
      res.json({ isSuccess: true, message: 'Image deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: 'Server error' });
  }
};
export const getCategories = (req, res) => {
  res.json({
    isSuccess: true,
    message: 'Available categories fetched successfully',
    data: Categories
  });
};

