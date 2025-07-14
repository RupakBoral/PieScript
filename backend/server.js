import express from "express";
import dotenv from "dotenv";
import imageRouter from "./routes/imageRouter.js";
import videoRouter from "./routes/videoRouter.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5555;

app.use("/video", videoRouter);
app.use("/image", imageRouter);

app.listen(PORT, () => {
  console.log("Server is running in port " + PORT);
});
