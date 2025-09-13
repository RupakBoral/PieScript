import { exec } from "child_process";
import fs from "fs";
import { validateManimCode } from "./codeValidator.js";

const fileCreation = async (code) => {
  return new Promise((resolve, reject) => {
    try {
      const dir = "generation";
      const path = `${dir}/Main.py`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      let cleanCode = code
        .replace(/```python\s*/g, "")
        .replace(/```/g, "")
        .replace(/`/g, "")
        .trim();

      const validation = validateManimCode(cleanCode);

      if (!validation.isValid) {
        return reject(
          new Error(`Invalid code generated: ${validation.errors.join(", ")}`)
        );
      }

      fs.writeFileSync(path, cleanCode);

      const manimCommand = `manim -pql "${path}" Main`;

      exec(manimCommand, { timeout: 120000 }, (error, stdout, stderr) => {
        if (error) {
          if (stderr.includes("AttributeError")) {
            return reject(
              new Error(
                "Code contains invalid Manim methods. Please try a different prompt."
              )
            );
          }
          if (
            stderr.includes("ImportError") ||
            stderr.includes("ModuleNotFoundError")
          ) {
            return reject(
              new Error(
                "Missing required dependencies. Please ensure Manim is properly installed."
              )
            );
          }
          if (stderr.includes("SyntaxError")) {
            return reject(
              new Error(
                "Generated code has syntax errors. Please try a different prompt."
              )
            );
          }

          return reject(new Error(`Video generation failed: ${error.message}`));
        }

        const expectedVideoPath =
          "C:/PieScript/backend/media/videos/main/480p15/Main.mp4";
        if (!fs.existsSync(expectedVideoPath)) {
          return reject(
            new Error(
              "Video file not found at expected path after Manim execution."
            )
          );
        }

        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default fileCreation;
