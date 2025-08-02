import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({{ apiKey: "YOUR_API_KEY" }});

const gemini_config = async(prompt) {
	  const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
        content: prompt,
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
	console.log(response);

	return response?.code;
}

export default gemini_config;