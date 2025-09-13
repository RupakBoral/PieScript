import cloudinary from "./cloudinary_config.js";
import fs from "fs";

const videoUpload = async () => {
  try {
    let videoPath = "C:/PieScript/backend/media/videos/main/480p15/Main.mp4";

    if (!fs.existsSync(videoPath)) {
      throw new Error("Video file not found");
    }

    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: "video",
      public_id: "Main",
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" },
        {
          width: 160,
          height: 100,
          crop: "crop",
          gravity: "south",
          audio_codec: "none",
        },
      ],
    });

    return result?.secure_url;
  } catch (err) {
    console.error("Cloudinary Error:", err.message);
    throw err;
  }
};

export default videoUpload;
