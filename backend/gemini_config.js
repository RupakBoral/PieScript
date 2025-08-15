import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

const gemini_config = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    content:
      prompt +
      ". Avoid using * in the response, keep it consice and explanatory.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        item: {
          type: Type.OBJECT,
          properties: {
            code: {
              type: Type.STRING,
            },
            description: {
              type: Type.STRING,
            },
          },
          propertyOrdering: ["code", "description"],
        },
      },
    },
  });

  return response?.code;
};

export default gemini_config;
