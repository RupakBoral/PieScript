const ALLOWED_IMPORTS = [
  "from manim import *",
  "import manim",
  "from manim import",
];

const FORBIDDEN_PATTERNS = [
  /from manim_data_structures/,
  /import.*data_structures/,
  /from manim_slides/,
  /import.*slides/,
  /\.become\(/,
  /\.apply_function\(/,
  /ShowCreationThenDestruction/,
  /ShowCreationThenFadeOut/,
  /open\(/,
  /file\(/,
  /import os/,
  /import sys/,
  /subprocess/,
  /exec\(/,
  /eval\(/,
];

export const validateManimCode = (code) => {
  const errors = [];
  const warnings = [];

  if (!code || typeof code !== "string") {
    errors.push("Invalid code input: expected a non-empty string");
    return {
      isValid: false,
      errors,
      warnings,
    };
  }

  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(code)) {
      errors.push(`Forbidden pattern detected: ${pattern.source}`);
    }
  }

  if (!code.includes("class Main(Scene):")) {
    errors.push("Missing required Main(Scene) class");
  }

  if (!code.includes("def construct(self):")) {
    errors.push("Missing required construct() method");
  }

  const hasValidImport = ALLOWED_IMPORTS.some((imp) => code.includes(imp));
  if (!hasValidImport) {
    errors.push("Missing valid Manim import statement");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};
