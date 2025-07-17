import { exec } from "child_process";
import fs from "fs";

const fileCreation = async (code) => {
  return new Promise((resolve, reject) => {
    try {
      const dir = "generation";
      const path = `${dir}/Main.py`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(path, code);

      const manimCommand = `manim -pql ${path} Main`;

      exec(manimCommand, (error, stdout, stderr) => {
        if (error) {
          console.error("❌ Manim execution failed:", error.message);
          return reject(error);
        }
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default fileCreation;
