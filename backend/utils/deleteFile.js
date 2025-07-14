import { unlink } from "fs/promises";

async function deleteMyFile(path) {
  try {
    await unlink(path);
    console.log("File deleted successfully!");
  } catch (err) {
    console.error("Error deleting file:", err);
  }
}

export default deleteMyFile;
