import express from "express";
import videoUpload from "../utils/videoUpload.js";
import { groq_config } from "../utils/groq_config.js";

const videoRouter = express.Router();

videoRouter.post("/", (req, res) => {
  try {
    const { prompt } = req.body;
    groq_config(prompt);
    res.status(200).json({ data: req?.body?.prompt, message: "Ok tested" });
    // const path = generateVideo(req.body);
    // const secure_url = videoUpload(path);
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

export default videoRouter;
