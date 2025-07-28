import cloudinary from "./cloudinary_config.js";
import fs from "fs";

const videoUpload = async () => {
  try {
    const possiblePaths = [
      "C:/PieScript/backend/media/videos/main/480p15/Main.mp4",
      "C:/PieScript/backend/media/videos/Main/480p15/Main.mp4",
      "media/videos/main/480p15/Main.mp4",
      "media/videos/Main/480p15/Main.mp4"
    ];
    
    let videoPath = null;
    
    for (const path of possiblePaths) {
      if (fs.existsSync(path)) {
        videoPath = path;
        break;
      }
    }
    
    if (!videoPath) {
      const findVideoFile = (dir, depth = 0) => {
        if (depth > 3 || videoPath) return;
        try {
          const items = fs.readdirSync(dir);
          for (const item of items) {
            const fullPath = `${dir}/${item}`;
            const stats = fs.statSync(fullPath);
            if (stats.isFile() && item.endsWith('.mp4') && item.includes('Main')) {
              videoPath = fullPath;
              return;
            } else if (stats.isDirectory()) {
              findVideoFile(fullPath, depth + 1);
            }
          }
        } catch (e) {}
      };
      
      if (fs.existsSync("C:/PieScript/backend/media")) {
        findVideoFile("C:/PieScript/backend/media");
      }
      if (!videoPath && fs.existsSync("media")) {
        findVideoFile("media");
      }
    }

    if (!videoPath) {
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
          audio_codec: "none"
        }
      ]
    });

    return result?.secure_url;
  } catch (err) {
    console.error("Cloudinary Error:", err.message);
    throw err;
  }
};

export default videoUpload;
