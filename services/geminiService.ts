
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { ConservationFact, GroundingChunk } from '../types';

// Ensure TypeScript recognizes process.env in the client-side context
declare const process: {
  env: {
    API_KEY: string;
  }
};

const apiKey = process.env.API_KEY;

// Debug logging to help troubleshoot Vercel deployment issues
console.log("Oceanica AI Service Initializing...");
if (!apiKey) {
    console.error("CRITICAL: process.env.API_KEY is undefined in the browser. The build process failed to inject the key.");
} else if (apiKey === "BUILD_TIME_DUMMY_KEY") {
    console.warn("WARNING: Using dummy build-time key. Real API calls will fail.");
} else {
    console.log("SUCCESS: API Key appears to be configured.");
}

// Use a dummy key if apiKey is missing during build time to allow instantiation without crashing.
// In production, the valid API_KEY must be provided via environment variables.
const ai = new GoogleGenAI({ apiKey: apiKey || "BUILD_TIME_DUMMY_KEY" });

export const askOceanQuestion = async (prompt: string): Promise<{ text: string, sources: GroundingChunk[] }> => {
  if (!apiKey || apiKey === "BUILD_TIME_DUMMY_KEY") {
     const errorMsg = "API Key is missing. Please ensure API_KEY is set in your Vercel Project Settings.";
     console.error(errorMsg);
     throw new Error(errorMsg);
  }
  
  console.log("Oceanica AI: Sending request to Gemini 3 Flash Preview...");

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a marine biologist and oceanographer named Oceanica. Answer the following question about the ocean in an engaging and informative way. Question: "${prompt}"`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    console.log("Oceanica AI: Response received.");

    const text = response.text || "I couldn't find an answer to that question in the ocean's depths.";
    
    // Extract grounding chunks safely
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const rawChunks = groundingMetadata?.groundingChunks;
    
    // Cast to unknown then to our local type to satisfy TypeScript
    const sources = (rawChunks || []) as unknown as GroundingChunk[];

    return { text, sources };

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    // Return a more user-friendly error message based on common issues
    if (error.message?.includes("API key")) {
        throw new Error("Invalid API Key. Please check your configuration in Vercel.");
    } else if (error.message?.includes("429")) {
        throw new Error("I'm overwhelmed with questions right now. Please try again in a moment.");
    }
    throw new Error(error.message || "Failed to get a response from the depths of the AI ocean.");
  }
};

export const getOceanFacts = async (): Promise<ConservationFact[]> => {
  if (!apiKey || apiKey === "BUILD_TIME_DUMMY_KEY") {
      console.warn("API Key missing, returning fallback facts.");
      return getFallbackFacts();
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Provide 6 important facts about ocean conservation and preservation. For each fact, provide a topic and a detailed explanation.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              topic: {
                type: Type.STRING,
                description: "The topic of the ocean conservation fact (e.g., Plastic Pollution).",
              },
              fact: {
                type: Type.STRING,
                description: "An important fact about the conservation topic.",
              },
            },
            required: ["topic", "fact"],
          },
        },
      },
    });

    const jsonText = response.text?.trim();
    if (!jsonText) {
        throw new Error("No text returned from API");
    }
    const facts = JSON.parse(jsonText);
    return facts as ConservationFact[];
    
  } catch (error) {
    console.error("Error fetching ocean facts from Gemini API:", error);
    return getFallbackFacts();
  }
};

export const generateOceanImage = async (prompt: string): Promise<string> => {
  if (!apiKey || apiKey === "BUILD_TIME_DUMMY_KEY") throw new Error("API Key not found");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
            aspectRatio: '16:9',
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
    }
    
    throw new Error("No image was generated by the API.");

  } catch (error) {
    console.error("Error calling Gemini Image API:", error);
    throw new Error("Failed to generate an image from the AI ocean's depths.");
  }
};

const getFallbackFacts = (): ConservationFact[] => {
    return [
      { topic: "Plastic Pollution", fact: "Over 8 million tons of plastic enter the oceans each year, harming marine life and ecosystems. It's estimated that by 2050, there could be more plastic than fish in the ocean by weight." },
      { topic: "Overfishing", fact: "More than a third of the world's fish stocks are being fished at biologically unsustainable levels, threatening marine biodiversity and the livelihoods of millions of people." },
      { topic: "Coral Bleaching", fact: "Rising ocean temperatures due to climate change are causing widespread coral bleaching, where corals expel the algae living in their tissues, turning them white and vulnerable to disease and death." },
      { topic: "Ocean Acidification", fact: "The ocean absorbs about 30% of the CO2 released into the atmosphere, leading to increased acidity. This harms organisms like corals and shellfish by hindering their ability to build shells and skeletons." },
      { topic: "Marine Protected Areas (MPAs)", fact: "MPAs are crucial for conservation. They are designated areas where human activities are restricted to protect nature. Currently, only about 8% of the world's ocean is protected." },
      { topic: "Sustainable Seafood", fact: "Consumers can help protect the ocean by choosing sustainably sourced seafood. Look for certifications from groups like the Marine Stewardship Council (MSC) to make an informed choice." }
    ];
};
