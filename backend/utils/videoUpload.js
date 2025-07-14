import { v2 as cloudinary } from "cloudinary";
import deleteMyFile from "./deleteFile.js";

const videoUpload = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      resource_type: "video",
      public_id: "sinewave",
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
    console.log(result);
    // delete the file from the local
    await deleteMyFile(path);
  } catch (err) {
    console.log(err);
  }
};

export default videoUpload;
