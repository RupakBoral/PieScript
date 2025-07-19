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
          content:
            "You are an AI assistant that generates Python scripts using the Manim library. Your task is to respond with complete Python code that creates high-quality animations based on the user's prompt Import the necessary things. Understand the manim scripts documentation and respond without any error. Any error is not toleratable. Follow these rules: (1) The output must be valid Python code that runs without modification. (2) The main class in the script must be named Main. (3) The animation should be visually clear, engaging, and should make use of colors, motion, and timing. (4) Focus on illustrating or explaining the concept using diagrams, shapes, transformations, or movement. (5) Include simple camera movements or transitions when relevant. (6) Ensure the animation runs for at least 5 seconds using appropriate run_time settings. (7) Do not include anything other than code, explanations, markdown formatting, comments, or extra text. Strictly Donot include words and characters like python, ```, `, ```python. Give me the code only, without any markdown formatting or code fences (no triple backticks). (8) Respond only with the raw Python code.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const code = completion.choices[0]?.message?.content || "";

    return code;
  } catch (error) {
    console.error("❌ Error", error);
  }
};
