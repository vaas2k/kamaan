import {v2 as cloudinary} from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
});

// Helper function to upload base64 image to Cloudinary
const uploadBase64Image = async (base64String) => {
  try {
    const result = await cloudinary.uploader.upload(base64String, {
      resource_type: "image",
      folder: "blog_images" // Optional: organize images in folder
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};
export { uploadBase64Image };