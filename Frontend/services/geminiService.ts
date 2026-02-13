
import { GoogleGenAI } from "@google/genai";
import { Property } from "../types";

export const generatePropertyDescription = async (property: Property): Promise<string> => {
  // Always use process.env.API_KEY directly for initialization as per guidelines
  if (!process.env.API_KEY) return "Servicio de IA no disponible actualmente.";
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Updated prompt to use Spanish field names from Property interface
  const prompt = `
    Escribe una descripción de marketing persuasiva, de alta gama y profesional para esta propiedad inmobiliaria:
    - Título: ${property.titulo}
    - Ubicación: ${property.ciudad}, ${property.direccion}
    - Tipo: ${property.tipo}
    - Detalles: ${property.habitaciones} habitaciones, ${property.banos} baños, ${property.area} m2.
    
    Asegúrate de que suene lujoso y atractivo para compradores potenciales. Mantén el texto en español y bajo 150 palabras.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    // Property access is correct according to SDK docs (response.text is a getter)
    return response.text || "No se pudo generar la descripción.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error al generar contenido de IA. Por favor, inténtelo de nuevo más tarde.";
  }
};

export const analyzeMarketTrends = async (properties: Property[]): Promise<string> => {
  // Always use process.env.API_KEY directly for initialization
  if (!process.env.API_KEY) return "Análisis de mercado no disponible.";

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Updated mapping to use Spanish field names
  const dataSummary = properties.map(p => `${p.titulo} en ${p.ciudad} por $${p.precio}`).join(', ');
  const prompt = `
    Analiza la siguiente lista de propiedades y proporciona un breve resumen ejecutivo de la salud del mercado y las tendencias de precios en español:
    ${dataSummary}
    
    Enfócate en los puntos de precio y distribución de propiedades. Usa un tono profesional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    // Accessing .text property directly
    return response.text || "Análisis completado.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "No se pudo realizar el análisis de mercado.";
  }
};
