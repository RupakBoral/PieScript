import express from "express";
import videoUpload from "../utils/videoUpload.js";
import { groq_config } from "../utils/groq_config.js";
import fileCreation from "../utils/fileCreation.js";
const videoRouter = express.Router();

videoRouter.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const code = await groq_config(prompt);

    await fileCreation(code);

    const secure_url = await videoUpload();

    res.status(200).json({ secure_url: secure_url, message: "Ok tested" });
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

export default videoRouter;
