import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary_config.js";
import axios from "axios";

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
  console.log(fileUrl);

  if (!fileUrl) {
    return res.status(400).json({ message: "Missing fileUrl" });
  }

  try {
    const response = await axios.post(
      "https://api.murf.ai/v1/murfdub/jobs/create",
      {
        file_url: fileUrl,
        file_name: fileUrl.split("/").pop().split("?")[0],
        priority: "LOW",
        source_locale: "en_US",
        target_locales: ["hi_IN"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.MURF_API_KEY,
        },
      }
    );

    console.log("Murf response:", response.data);

    if (!response.data?.job_id) {
      return res.status(500).json({ message: "Murf job creation failed" });
    }

    res.status(200).json({ jobId: response.data.job_id });
  } catch (error) {
    console.error("Murf API error:", error.response?.data || error.message);
    res.status(500).json({ message: "Murf request failed" });
  }
});

export default audioRouter;
