import cloudinary from "./cloudinary_config.js";
import deleteMyFile from "./deleteFile.js";
import fs from "fs";

const videoUpload = async () => {
  try {
    const path = "C:/ChatManim/backend/media/videos/main/480p15/Main.mp4";

    if (!fs.existsSync(path)) {
      throw new Error("❌ Video file does not exist at: " + path);
    }

    const result = await cloudinary.uploader.upload(path, {
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
    console.log("Cloudinary Error: " + err);
  }
};

export default videoUpload;
