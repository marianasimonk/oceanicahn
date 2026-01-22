
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { ConservationFact, GroundingChunk } from '../types';

// Ensure TypeScript recognizes process.env in the client-side context
declare const process: {
  env: {
    API_KEY: string;
  }
};

const apiKey = process.env.API_KEY;

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

// Robust error message extractor that handles nested objects and stringified JSON
const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') return error;
    
    // Check for nested error object from Google API (e.g. { error: { code: 429, message: ... } })
    if (error?.error?.message) {
        return error.error.message;
    }
    
    // Check standard error message
    if (error?.message) {
        // Sometimes the message itself is a JSON string
        try {
             const parsed = JSON.parse(error.message);
             if (parsed?.error?.message) return parsed.error.message;
             if (parsed?.message) return parsed.message;
        } catch {
            // Not JSON, just use the string
        }
        return error.message;
    }

    try {
        return JSON.stringify(error);
    } catch {
        return "Unknown error occurred";
    }
};

// Helper to retry operations with exponential backoff
const retryWithBackoff = async <T>(operation: () => Promise<T>, retries = 3, baseDelay = 2000): Promise<T> => {
    let lastError: any;
    for (let i = 0; i < retries; i++) {
        try {
            return await operation();
        } catch (error: any) {
            lastError = error;
            
            const msg = getErrorMessage(error).toLowerCase();
            const errorCode = error?.status || error?.code || error?.error?.code;

            // Fail fast for Quota Exceeded (Long term limit) to avoid wasting retries
            if (msg.includes("quota") || msg.includes("plan and billing")) {
                throw error; 
            }

            const isRateLimit = 
                errorCode === 429 || 
                msg.includes("429") || 
                msg.includes("resource_exhausted") ||
                msg.includes("too many requests");
                
            const isServerOverloaded = 
                errorCode === 503 || 
                msg.includes("503") || 
                msg.includes("overloaded");
            
            // Only retry on transient errors (rate limit or server overload)
            if (isRateLimit || isServerOverloaded) {
                if (i < retries - 1) {
                    const delay = baseDelay * Math.pow(2, i); // 2s, 4s, 8s
                    console.warn(`Gemini API busy (Attempt ${i + 1}/${retries}). Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }
            }
            // Throw immediately for other errors
            throw error;
        }
    }
    throw lastError;
};

export const askOceanQuestion = async (prompt: string): Promise<{ text: string, sources: GroundingChunk[] }> => {
  if (!apiKey || apiKey === "BUILD_TIME_DUMMY_KEY") {
     const errorMsg = "API Key is missing. Please ensure API_KEY is set in your Vercel Project Settings.";
     console.error(errorMsg);
     throw new Error(errorMsg);
  }
  
  console.log("Oceanica AI: Sending request to Gemini 3 Flash Preview...");

  try {
    const response: GenerateContentResponse = await retryWithBackoff(() => ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a marine biologist and oceanographer named Oceanica. Answer the following question about the ocean in an engaging and informative way. Question: "${prompt}"`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    }));
    
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
    const msg = getErrorMessage(error);
    const lowerMsg = msg.toLowerCase();

    // Handle expected operational errors with Warnings instead of Errors to avoid console noise
    if (lowerMsg.includes("quota") || lowerMsg.includes("resource_exhausted")) {
        console.warn("Gemini Chat Quota Exceeded:", msg);
        throw new Error("I've reached my daily data limit (Quota Exceeded). Please try again later.");
    }

    if (lowerMsg.includes("api key")) {
        console.error("Gemini API Key Error:", msg);
        throw new Error("Invalid API Key. Please check your configuration in Vercel.");
    }
    
    if (lowerMsg.includes("429")) {
        console.warn("Gemini API Rate Limited:", msg);
        throw new Error("I'm overwhelmed with questions right now. Please wait a moment and try again.");
    }
    
    // Unexpected errors
    console.error("Gemini Chat Unexpected Error:", msg);
    throw new Error(msg || "Failed to get a response from the depths of the AI ocean.");
  }
};

export const getOceanFacts = async (): Promise<ConservationFact[]> => {
  if (!apiKey || apiKey === "BUILD_TIME_DUMMY_KEY") {
      console.warn("API Key missing, returning fallback facts.");
      return getFallbackFacts();
  }

  try {
    const response: GenerateContentResponse = await retryWithBackoff(() => ai.models.generateContent({
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
    }));

    const jsonText = response.text?.trim();
    if (!jsonText) {
        throw new Error("No text returned from API");
    }
    const facts = JSON.parse(jsonText);
    return facts as ConservationFact[];
    
  } catch (error) {
    const msg = getErrorMessage(error);
    // If it's a quota error, just warn and use fallback. Don't error out the whole app.
    if (msg.toLowerCase().includes("quota")) {
        console.warn("Ocean Facts Quota Exceeded. Using fallback data.");
    } else {
        console.error("Error fetching ocean facts:", msg);
    }
    // Fallback to static facts if API fails
    return getFallbackFacts();
  }
};

export const generateOceanImage = async (prompt: string): Promise<string> => {
  if (!apiKey || apiKey === "BUILD_TIME_DUMMY_KEY") throw new Error("API Key not found");

  try {
    const response: GenerateContentResponse = await retryWithBackoff(() => ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
            aspectRatio: '16:9',
        }
      },
    }));

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
    }
    
    throw new Error("No image was generated by the API.");

  } catch (error: any) {
    const msg = getErrorMessage(error);
    
    if (msg.toLowerCase().includes("quota")) {
        console.warn("Image Generation Quota Exceeded:", msg);
        throw new Error("Image generation quota exceeded. Please try again later.");
    }
    
    console.error("Gemini Image API Error:", msg);
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
