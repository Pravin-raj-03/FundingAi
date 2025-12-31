import { GoogleGenAI, Type, Modality } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize client (safe even if key is missing, handle errors at call site)
const ai = new GoogleGenAI({ apiKey });

export const chatWithFundingAI = async (message: string, history: any[] = []) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are Funding Intelligence AI, an expert in startup funding, government schemes, and venture capital in India. 
        Answer questions concisely. 
        Structure your answers with Markdown. 
        If asked about specific schemes, provide amounts and eligibility if known.
        Support languages: English, Tamil, Hindi.`,
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to the funding database right now. Please check your API key or try again later.";
  }
};

export const analyzeDocument = async (base64Image: string, mimeType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: `Analyze this document/image. Identify if it contains information about funding, grants, or subsidies. 
            Extract the following fields and return ONLY a JSON object:
            {
              "title": "Name of the scheme/funding",
              "amount": "The financial value mentioned",
              "investor": "Who is providing the funds",
              "tags": ["Array of relevant keywords"],
              "summary": "A 1 sentence summary"
            }
            If no funding info is found, return null.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            amount: { type: Type.STRING },
            investor: { type: Type.STRING },
            summary: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const generateSpeech = async (text: string, language: string) => {
  try {
    // Note: 'gemini-2.5-flash-preview-tts' is the model for TTS
    // We map 'ta' (Tamil) requests to the same voice but the model handles the language script.
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No audio generated");
    
    return base64Audio;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};