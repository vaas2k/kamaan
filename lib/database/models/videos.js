import mongoose from "mongoose";

const { Schema } =  mongoose;


const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnail: { type: String, required: true },
    client: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Prevent model recompilation
const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

export default Video;