import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET() {
  try {
    const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
    let lastError = null;
    let text = "";

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: modelName,
        });

        const prompt = `
          You are a professional Business Growth Consultant for "Geetanjali Softwares", a premium web development and digital marketing agency based in India.
          Provide ONE powerful, actionable "Daily Secret Tip" to help the agency grow.
          
          Categories to choose from (pick one randomly):
          1. Local SEO: How to rank higher in Patna/Bihar/India.
          2. Client Trust: How to get more reviews or high-ticket clients.
          3. Tech Advantage: A new service (like AI integration) to offer clients.
          4. Content Strategy: How to use blogs to get leads.
          
          Requirements:
          - Keep it short, professional, and inspiring (max 3-4 sentences).
          - Use a bold headline for the tip.
          - Make it feel like an expert advice.
          
          Format: 
          **Tip Title**: [The Tip Content]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();
        if (text) break; 
      } catch (err) {
        console.warn(`Model ${modelName} failed for Tips, trying next...`);
        lastError = err;
      }
    }

    if (!text && lastError) throw lastError;
    
    return NextResponse.json({ tip: text });
  } catch (error) {
    console.error("AI Tips Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate growth tip" }, { status: 500 });
  }
}
