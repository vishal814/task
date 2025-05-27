const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Image", imageSchema);