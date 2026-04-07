import { GoogleGenAI, Type } from "@google/genai";
import { SoilData, RecommendationResult } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert Agricultural Data Scientist specializing in Indian crops. 
Your task is to act as a Crop Recommendation ML Model (simulating a Random Forest classifier trained on the Kaggle Crop Recommendation dataset).

Input Features:
- Nitrogen (N): 0-140
- Phosphorus (P): 5-145
- Potassium (K): 5-205
- Temperature: 8-45 °C
- Humidity: 14-100 %
- pH: 3.5-9.9
- Rainfall: 20-300 mm

Typical Crops in your training data:
Rice, Maize, Chickpea, Kidneybeans, Pigeonpeas, Mothbeans, Mungbean, Blackgram, Lentil, Pomegranate, Banana, Mango, Grapes, Watermelon, Muskmelon, Apple, Orange, Papaya, Coconut, Cotton, Jute, Coffee.

When provided with soil and climate data, you must:
1. Recommend the most suitable crop.
2. Provide a confidence score (0-100).
3. Explain why this crop is suitable based on the input features (e.g., "Rice requires high rainfall and humidity").
4. Mention the typical season (Kharif/Rabi) for this crop in India.
5. List 3-5 Indian states where this crop is commonly grown.
6. Provide the average yield (e.g., "2.5 - 3.5 tons per hectare").
7. List 2-3 common pests and diseases for this crop.
8. List 2-3 optimal soil types for this crop.

Return the result in JSON format.
`;

export async function getCropRecommendation(data: SoilData): Promise<RecommendationResult> {
  // Try to get key from multiple sources:
  // 1. window.process (injected by server in production)
  // 2. process.env (baked in by Vite in development)
  // 3. process.env.API_KEY (platform default)
  const apiKey = 
    (globalThis as any).process?.env?.GEMINI_API_KEY || 
    process.env.GEMINI_API_KEY || 
    (process.env as any).API_KEY;
  
  // If no key is found at all, throw a specific error
  if (!apiKey || apiKey === "") {
    throw new Error("API_KEY_MISSING: No Gemini API key found in environment.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview";
  
  const prompt = `
  Recommend a crop for these parameters:
  N: ${data.n}
  P: ${data.p}
  K: ${data.k}
  Temperature: ${data.temperature}°C
  Humidity: ${data.humidity}%
  pH: ${data.ph}
  Rainfall: ${data.rainfall}mm
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          crop: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
          seasonalContext: { type: Type.STRING },
          stateSuitability: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          averageYield: { type: Type.STRING },
          commonPests: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          optimalSoilTypes: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: [
          "crop", 
          "confidence", 
          "reasoning", 
          "seasonalContext", 
          "stateSuitability",
          "averageYield",
          "commonPests",
          "optimalSoilTypes"
        ]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}") as RecommendationResult;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to get recommendation");
  }
}
