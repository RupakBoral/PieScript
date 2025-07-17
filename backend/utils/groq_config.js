import Groq from "groq-sdk";
import dotenv from "dotenv";
import fileCreation from "./fileCreation.js";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const groq_config = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant specialized in generating Python code using the Manim library. Your main task is to generate Python scripts that create animated videos with Manim. First, ask the user what topic they want the video to be about. Then, based on the topic, respond only with the appropriate Python code that creates the animation using Manim. Do not explain the code or output anything else — just provide the Manim script. Make the response so that i can directly write the code in a python file. Keep the classname main. Only provide the python code no additional information. Donot include python word and ` characters",
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
