import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
category: {
  type: String,
  required: true,
  enum: ['nature', 'science', 'travel', 'sports', 'technology']
},
  tags: [String],
  isPublic: { type: Boolean, default: false },
  imageUrl: { type: String, required: true },
});

export default mongoose.model("Image", imageSchema);