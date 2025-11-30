// lib/database/models/videos.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    categories: [{ type: String, required: true }], // Changed from category to categories (array)
    description: { type: String, required: true },
    duration: { type: String, required: true },
    videoUrl: { type: String, },
    thumbnail: { type: String, required: true },
    client: { type: String, required: true },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent model recompilation
const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

export default Video;