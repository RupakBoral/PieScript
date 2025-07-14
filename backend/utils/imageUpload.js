import { v2 as cloudinary } from "cloudinary";
import deleteMyFile from "./deleteFile.js";

const imageUpload = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      public_id: "sinewave",
    });
    console.log(result);
    // delete the file from the local
    await deleteMyFile(path);
  } catch (err) {
    console.log(err);
  }
};

export default imageUpload;
