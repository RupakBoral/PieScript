import { exec } from "child_process";
import fs from "fs";
import { validateManimCode, sanitizeManimCode } from "./codeValidator.js";

const fileCreation = async (code) => {
  return new Promise((resolve, reject) => {
    try {
      const dir = "generation";
      const path = `${dir}/Main.py`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Clean and validate the generated code
      let cleanCode = code
        .replace(/```python\s*/g, "")
        .replace(/```/g, "")
        .replace(/`/g, "")
        .trim();

      // Validate the code for safety and compatibility
      const validation = validateManimCode(cleanCode);
      if (!validation.isValid) {
        console.error("❌ Code validation failed:", validation.errors);
        return reject(new Error(`Invalid code generated: ${validation.errors.join(', ')}`));
      }

      if (validation.warnings.length > 0) {
        console.warn("⚠️ Code warnings:", validation.warnings);
      }

      // Sanitize the code to ensure safety
      cleanCode = sanitizeManimCode(cleanCode);
      console.log("✅ Code validated and sanitized");

      fs.writeFileSync(path, cleanCode);
      console.log("✅ Generated code written to:", path);

      // Use more robust manim command with error handling
      const manimCommand = `manim -pql "${path}" Main`;
      console.log("🎬 Running manim command:", manimCommand);

      exec(manimCommand, { timeout: 120000 }, (error, stdout, stderr) => {
        if (error) {
          console.error("❌ Manim execution failed:");
          console.error("Error message:", error.message);
          console.error("Stderr:", stderr);
          
          // Provide more specific error messages
          if (stderr.includes('AttributeError')) {
            return reject(new Error("Code contains invalid Manim methods. Please try a different prompt."));
          }
          if (stderr.includes('ImportError') || stderr.includes('ModuleNotFoundError')) {
            return reject(new Error("Missing required dependencies. Please ensure Manim is properly installed."));
          }
          if (stderr.includes('SyntaxError')) {
            return reject(new Error("Generated code has syntax errors. Please try a different prompt."));
          }
          
          return reject(new Error(`Video generation failed: ${error.message}`));
        }
        
        console.log("✅ Manim execution successful!");
        console.log("Output:", stdout);
        resolve();
      });
    } catch (err) {
      console.error("❌ Unexpected error in fileCreation:", err);
      reject(err);
    }
  });
};

export default fileCreation;
