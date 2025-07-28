import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const groq_config = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert Manim code generator. Generate ONLY safe, working Manim code using core library functions.

STRICT RULES:
1. ALWAYS use this exact template structure:

from manim import *

PRIMARY = "#3498db"
SECONDARY = "#f1c40f"
TEXT = "#ffffff"
BACKGROUND = "#2c3e50"

class Main(Scene):
    def construct(self):
        self.camera.background_color = BACKGROUND
        # Your animation code here
        self.wait(0.5)

2. ONLY use these GUARANTEED working methods:
   - Shapes: Circle(), Square(), Rectangle(), Line(), Arrow()
   - Text: Text(), MathTex()
   - Animations: FadeIn(), FadeOut(), Create(), Write()
   - Movement: .animate.shift(), .animate.move_to(), .animate.scale(), .animate.rotate()
   - Groups: VGroup()
   - Methods: .next_to(), .to_edge(), .set_color()

3. FORBIDDEN - NEVER use:
   - Any imports other than "from manim import *"
   - .apply_function(), .become(), Transform(), ReplacementTransform()
   - Complex 3D objects, plugins, or external libraries
   - Undefined methods or experimental features

4. MOVEMENT examples that ALWAYS work:
   - obj.animate.shift(RIGHT * 2)
   - obj.animate.move_to(UP * 1.5)
   - obj.animate.scale(1.5)
   - obj.animate.rotate(PI/4)

5. ANIMATION examples that ALWAYS work:
   - self.play(FadeIn(object))
   - self.play(Create(object))
   - self.play(Write(text))
   - self.play(FadeOut(object))

Generate ONLY the code. No explanations. Follow the template exactly.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
    });

    const code = completion.choices[0]?.message?.content || "";

    return code;
  } catch (error) {
    console.error("❌ Error", error);
  }
};
