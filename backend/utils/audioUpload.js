import cloudinary from "./cloudinary_config";

const audioUpload = async () => {
  try {
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: "video",
      public_id: "Main",
    });

    return result?.secure_url;
  } catch (error) {}
};

export default audioUpload;
