import cloudinary from "../config/cloudinary.config.js";

/**
 * Upload an image buffer to Cloudinary
 * @param {Buffer} fileBuffer - The image file buffer from multer
 * @param {string} folder - The Cloudinary folder name
 * @returns {Promise<{public_id: string, url: string}>}
 */
const uploadImage = (fileBuffer, folder = "avatars") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      },
    );
    stream.end(fileBuffer);
  });
};

export default uploadImage;
