import cloudinary from "../config/cloudinary.config.js";

/**
 * Delete an image from Cloudinary by public_id
 * @param {string} publicId - The Cloudinary public_id of the image
 * @returns {Promise<object>}
 */
const deleteImage = async (publicId) => {
  if (!publicId) return null;
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
};

export default deleteImage;
