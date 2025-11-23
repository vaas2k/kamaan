import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    hero: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      author: {
        name: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String, required: true },
      },
      featuredImage: { type: String, required: true },
    },
    metadata: {
      date: { type: Date, default: Date.now },
      readTime: { type: String, required: true },
    },
    content: [
      {
        type: {
          type: String,
          required: true,
          enum: ["paragraph", "image", "blockquote"],
        },
        data: {
          heading: String,
          text: String,
          url: String,
          caption: String,
        },
      },
    ],
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent model recompilation
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;