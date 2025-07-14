import express from "express";
import videoUpload from "../utils/videoUpload.js";

const videoRouter = express.Router();

videoRouter.get("/", (req, res) => {
  try {
    // const path = generateVideo(req.body);
    // const secure_url = videoUpload(path);
  } catch (err) {
    console.log(err);
  }
});

export default videoRouter;
