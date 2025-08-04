import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary_config.js";
import axios from "axios";
import checkJobStatus from "../utils/dub/checkJobStatus.js";

const audioRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

audioRouter.post("/", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Error: No audio file provided" });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          timeout: 420000,
        },
        (err, result) => {
          if (err) {
            console.error("Cloudinary upload error:", err);
            return reject(err);
          }
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    res.status(200).json({ audioUrl: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: error?.message || "Upload failed",
      code: error?.http_code || 500,
    });
  }
});

audioRouter.post("/murf/job", async (req, res) => {
  const { fileUrl } = req.body;

  if (!fileUrl) {
    return res.status(400).json({ message: "Missing fileUrl" });
  }

  try {
    const formData = new FormData();
    formData.append("file_url", fileUrl);
    formData.append("target_locales", "ko_KR");
    const response = await axios.post(
      "https://api.murf.ai/v1/murfdub/jobs/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "api-key": process.env.MURF_DUB_API_KEY,
        },
      }
    );

    const job_id = response.data?.job_id;

    if (job_id !== null) {
      const download_audio_url = await checkJobStatus(job_id);

      res.status(200).json({
        message: "Audio generated successfully",
        download_audio_url: download_audio_url,
      });
    } else {
      res.status(204).json({ message: "Failed to dub the audio" });
    }
  } catch (error) {
    console.error("Murf API error:", error.response?.data || error.message);
    res.status(500).json({ message: "Murf request failed" });
  }
});

export default audioRouter;
