// Code validation utility for Manim scripts
// Ensures only safe, core Manim functions are used

const ALLOWED_IMPORTS = [
  'from manim import *',
  'import manim',
  'from manim import'
];

const SAFE_MANIM_CLASSES = [
  // Basic shapes
  'Circle', 'Square', 'Rectangle', 'Line', 'Arrow', 'Polygon', 'Triangle',
  'RegularPolygon', 'Ellipse', 'Annulus', 'AnnularSector', 'Sector',
  
  // Text
  'Text', 'MathTex', 'Tex', 'Title',
  
  // Groups
  'VGroup', 'Group',
  
  // 3D (basic)
  'Sphere', 'Cube', 'Cylinder', 'Surface',
  
  // Graphs and plots (basic)
  'Axes', 'NumberLine', 'NumberPlane'
];

const SAFE_ANIMATIONS = [
  'Write', 'FadeIn', 'FadeOut', 'Transform', 'Create', 'DrawBorderThenFill',
  'ReplacementTransform', 'ShowCreation', 'GrowFromCenter', 'SpiralIn',
  'Unwrite', 'Uncreate', 'ShowIncreasingSubsets', 'ShowSubmobjectsOneByOne'
];

const SAFE_METHODS = [
  'shift', 'move_to', 'rotate', 'scale', 'set_color', 'set_fill',
  'set_stroke', 'arrange', 'next_to', 'to_edge', 'to_corner',
  'add', 'remove', 'play', 'wait', 'add_sound'
];

const FORBIDDEN_PATTERNS = [
  // Plugin-specific imports
  /from manim_data_structures/,
  /import.*data_structures/,
  /from manim_slides/,
  /import.*slides/,
  
  // Experimental or deprecated functions
  /\.become\(/,
  /\.apply_function\(/,
  /ShowCreationThenDestruction/,
  /ShowCreationThenFadeOut/,
  
  // File operations that could be dangerous
  /open\(/,
  /file\(/,
  /import os/,
  /import sys/,
  /subprocess/,
  /exec\(/,
  /eval\(/
];

export const validateManimCode = (code) => {
  const errors = [];
  const warnings = [];
  
  // Validate input
  if (!code || typeof code !== 'string') {
    errors.push('Invalid code input: expected a non-empty string');
    return {
      isValid: false,
      errors,
      warnings
    };
  }
  
  // Check for forbidden patterns
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(code)) {
      errors.push(`Forbidden pattern detected: ${pattern.source}`);
    }
  }
  
  // Check if it has required structure
  if (!code.includes('class Main(Scene):')) {
    errors.push('Missing required Main(Scene) class');
  }
  
  if (!code.includes('def construct(self):')) {
    errors.push('Missing required construct() method');
  }
  
  // Check for valid imports
  const hasValidImport = ALLOWED_IMPORTS.some(imp => code.includes(imp));
  if (!hasValidImport) {
    errors.push('Missing valid Manim import statement');
  }
  
  // Basic syntax validation
  const lines = code.split('\n');
  let inClass = false;
  let inMethod = false;
  let indentLevel = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Ensure line is a string before calling trim()
    const lineStr = String(line || '');
    const trimmed = lineStr.trim();
    
    if (trimmed.startsWith('class Main(Scene):')) {
      inClass = true;
      indentLevel = 1;
    } else if (inClass && trimmed.startsWith('def construct(self):')) {
      inMethod = true;
      indentLevel = 2;
    }
    
    // Check for proper indentation in construct method
    if (inMethod && trimmed.length > 0 && !trimmed.startsWith('#')) {
      const spaces = lineStr.length - lineStr.trimStart().length;
      if (spaces < indentLevel * 4 && !trimmed.startsWith('def') && !trimmed.startsWith('class')) {
        warnings.push(`Line ${i + 1}: Potential indentation issue`);
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const sanitizeManimCode = (code) => {
  // Validate input
  if (!code || typeof code !== 'string') {
    return '';
  }
  
  // Remove any potentially dangerous imports or functions
  let sanitized = code;
  
  // Remove file operations
  sanitized = sanitized.replace(/import\s+os.*?\n/g, '');
  sanitized = sanitized.replace(/import\s+sys.*?\n/g, '');
  sanitized = sanitized.replace(/import\s+subprocess.*?\n/g, '');
  
  // Ensure proper imports
  if (!sanitized.includes('from manim import *')) {
    sanitized = 'from manim import *\n\n' + sanitized;
  }
  
  return sanitized;
};
