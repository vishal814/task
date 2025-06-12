import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the Image document
export interface image  {
  title: string;
  category: 'nature' | 'science' | 'travel' | 'sports' | 'technology';
  tags: string[];
  isPublic: boolean;
  imageUrl: string;
}

// Create the schema
const imageSchema: Schema = new mongoose.Schema({
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

// Create the model
const Image: Model<image> = mongoose.model<image>("Image", imageSchema);

export default Image;
