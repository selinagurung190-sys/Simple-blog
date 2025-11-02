
import { GoogleGenAI } from "@google/genai";

const getAi = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateReflection = async (postContent: string): Promise<string> => {
  try {
    const ai = getAi();
    const prompt = `Based on the following journal entry, provide one short, thoughtful, and positive question or affirmation to encourage reflection. Keep it under 20 words. The entry is: "${postContent}"`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating reflection:", error);
    return "Could not generate reflection. Please try again later.";
  }
};

export const getDailyQuote = async (): Promise<string> => {
  try {
    const ai = getAi();
    const prompt = "Generate one short, unique, and uplifting motivational quote.";
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching daily quote:", error);
    return "The best way to predict the future is to create it.";
  }
};
