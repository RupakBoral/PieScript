import express from "express";
import videoUpload from "../utils/videoUpload.js";
import { groq_config } from "../utils/groq_config.js";
import fileCreation from "../utils/fileCreation.js";
const videoRouter = express.Router();

videoRouter.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("🤖 Generating code with Groq...");
    const code = await groq_config(prompt);

    console.log("📝 Creating and rendering video file...");
    await fileCreation(code);

    console.log("☁️ Starting Cloudinary upload...");
    const secure_url = await videoUpload();

    if (!secure_url) {
      throw new Error("Upload completed but no URL returned");
    }

    console.log("✅ Complete pipeline finished successfully!");
    res.status(200).json({
      secure_url: secure_url,
      message: "Video generated and uploaded successfully",
    });
  } catch (err) {
    console.error("❌ Error in video generation pipeline:", err.message);
    console.error("Full error stack:", err.stack);
    res.status(400).json({ error: err.message || "Unknown error occurred" });
  }
});

export default videoRouter;
