import mongoose from "mongoose";
// Create the schema
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
// Create the model
const Image = mongoose.model("Image", imageSchema);
export default Image;
