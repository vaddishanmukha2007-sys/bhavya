
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisParams, AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    analysisText: {
      type: Type.OBJECT,
      properties: {
        overview: { type: Type.STRING, description: "A brief summary of the vegetation bloom analysis for the given location and time." },
        phenologyTrends: { type: Type.STRING, description: "Detailed analysis of the vegetation's seasonal cycles and long-term changes observed." },
        ecologicalImpacts: { type: Type.STRING, description: "Insights on pollen release, ecosystem productivity, and other ecological factors." },
        predictions: { type: Type.STRING, description: "A data-driven forecast of future bloom phases and potential changes." },
      },
      required: ["overview", "phenologyTrends", "ecologicalImpacts", "predictions"],
    },
    timeSeriesData: {
      type: Type.ARRAY,
      description: "An array of 24 data points representing the vegetation index over the specified period.",
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING, description: "The date for the data point in 'YYYY-MM-DD' format." },
          value: { type: Type.NUMBER, description: "The vegetation index value, typically between 0.0 and 1.0." },
        },
        required: ["date", "value"],
      },
    },
  },
  required: ["analysisText", "timeSeriesData"],
};

export const analyzeBloomData = async (params: AnalysisParams): Promise<AnalysisResult> => {
  if (!params.location) {
    throw new Error('Location is required for analysis');
  }

  const prompt = `
    Act as an expert in remote sensing and vegetation phenology from NASA.
    Analyze the plant blooming event for the following parameters:
    - Location: Latitude ${params.location.lat.toFixed(4)}, Longitude ${params.location.lng.toFixed(4)}
    - Time Period: ${params.dateRange.start} to ${params.dateRange.end}
    - Vegetation Index: ${params.vegetationIndex}
    - User Perspective: ${params.userRole}

    Your tasks:
    1.  Generate a realistic, simulated time-series dataset of the ${params.vegetationIndex} index for this period. The dataset must contain exactly 24 data points, evenly spaced throughout the date range. The values should reflect a plausible seasonal bloom cycle for the general climate associated with the given latitude (e.g., northern hemisphere temperate, tropical, etc.).
    2.  Provide a detailed textual analysis tailored to a ${params.userRole}. The analysis should be structured into four sections: Overview, Phenology Trends, Ecological Impacts, and Predictions. Ensure the tone and content are appropriate for the specified user role. For example, a farmer might care more about crop flowering, while a conservationist would be interested in invasive species.

    Return the entire response as a single JSON object matching the provided schema. Do not include any markdown formatting like \`\`\`json.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.5,
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Validate the structure just in case
    if (!result.analysisText || !result.timeSeriesData) {
        throw new Error("Invalid response structure from AI model.");
    }
    
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};
