import express from "express";
import dotenv from "dotenv";
import imageRouter from "./routes/imageRouter.js";
import videoRouter from "./routes/videoRouter.js";
import audioRouter from "./routes/audioRouter.js";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());

app.use("/video", videoRouter);
app.use("/image", imageRouter);
app.use("/audio", audioRouter);

app.listen(PORT, () => {
  console.log("Server is running in port " + PORT);
});
