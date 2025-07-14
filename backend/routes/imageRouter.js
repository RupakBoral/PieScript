import imageUpload from "../utils/imageUpload.js";
import express from "express";

const imageRouter = express.Router();

imageRouter.get("/", (req, res) => {
  try {
    // const path = generateImage(req.body);
    // const secure_url = imageUpload(path);
  } catch (err) {
    console.log(err);
  }
});

export default imageRouter;
