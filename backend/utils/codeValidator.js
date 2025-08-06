const ALLOWED_IMPORTS = [
  "from manim import *",
  "import manim",
  "from manim import",
];

const SAFE_MANIM_CLASSES = [
  "Circle",
  "Square",
  "Rectangle",
  "Line",
  "Arrow",
  "Polygon",
  "Triangle",
  "RegularPolygon",
  "Ellipse",
  "Annulus",
  "AnnularSector",
  "Sector",

  "Text",
  "MathTex",
  "Tex",
  "Title",

  "VGroup",
  "Group",

  "Sphere",
  "Cube",
  "Cylinder",
  "Surface",

  "Axes",
  "NumberLine",
  "NumberPlane",
];

const SAFE_ANIMATIONS = [
  "Write",
  "FadeIn",
  "FadeOut",
  "Transform",
  "Create",
  "DrawBorderThenFill",
  "ReplacementTransform",
  "ShowCreation",
  "GrowFromCenter",
  "SpiralIn",
  "Unwrite",
  "Uncreate",
  "ShowIncreasingSubsets",
  "ShowSubmobjectsOneByOne",
];

const SAFE_METHODS = [
  "shift",
  "move_to",
  "rotate",
  "scale",
  "set_color",
  "set_fill",
  "set_stroke",
  "arrange",
  "next_to",
  "to_edge",
  "to_corner",
  "add",
  "remove",
  "play",
  "wait",
  "add_sound",
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

  const lines = code.split("\n");
  let inClass = false;
  let inMethod = false;
  let indentLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineStr = String(line || "");
    const trimmed = lineStr.trim();

    if (trimmed.startsWith("class Main(Scene):")) {
      inClass = true;
      indentLevel = 1;
    } else if (inClass && trimmed.startsWith("def construct(self):")) {
      inMethod = true;
      indentLevel = 2;
    }

    if (inMethod && trimmed.length > 0 && !trimmed.startsWith("#")) {
      const spaces = lineStr.length - lineStr.trimStart().length;
      if (
        spaces < indentLevel * 4 &&
        !trimmed.startsWith("def") &&
        !trimmed.startsWith("class")
      ) {
        warnings.push(`Line ${i + 1}: Potential indentation issue`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

export const sanitizeManimCode = (code) => {
  if (!code || typeof code !== "string") {
    return "";
  }

  // Remove any potentially dangerous imports or functions
  let sanitized = code;

  // Remove file operations
  sanitized = sanitized.replace(/import\s+os.*?\n/g, "");
  sanitized = sanitized.replace(/import\s+sys.*?\n/g, "");
  sanitized = sanitized.replace(/import\s+subprocess.*?\n/g, "");

  // Ensure proper imports
  if (!sanitized.includes("from manim import *")) {
    sanitized = "from manim import *\n\n" + sanitized;
  }

  return sanitized;
};
