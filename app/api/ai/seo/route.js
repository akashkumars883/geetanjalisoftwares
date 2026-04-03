import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { site_title, site_description, local_focus } = await req.json();

    const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
    let lastError = null;
    let text = "";

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `
          You are a professional SEO expert for "Geetanjali Softwares", a premium web development and digital marketing agency.
          Optimize the website's SEO metadata for maximum search engine performance.
          
          Current Settings:
          - Name/Title: "${site_title}"
          - Description: "${site_description}"
          - Local Focus Area: "${local_focus || 'Global'}"
          
          Requirements:
          1. Suggested Site Title: Catchy, High-CTR, between 50-60 characters.
          2. Meta Description: Compelling, includes a call to action, between 150-160 characters.
          3. Suggested Keywords: Provide a list of 15 high-ranking keywords. 
             - Mix Strategy: 70% Global/General Tech Industry terms (e.g., custom software, web design agency) 
             - Mix Strategy: 30% Localized terms based on "${local_focus}" (e.g., in Patna, Bihar).
          
          Exclusion: Do NOT only focus on Bihar. Ensure a broad global/national appeal as well.
          
          Respond WITH A JSON object:
          {
            "site_title": "Optimized Title Here",
            "site_description": "Optimized Description Here",
            "keywords": "keyword1, keyword2, keyword3..."
          }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();
        if (text) break; // Success!
      } catch (err) {
        console.warn(`Model ${modelName} failed for SEO, trying next...`);
        lastError = err;
      }
    }

    if (!text && lastError) throw lastError;
    
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : text;
      const data = JSON.parse(jsonString);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error("Parse Error:", parseError, "Text:", text);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }
  } catch (error) {
    console.error("AI SEO Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate SEO settings" }, { status: 500 });
  }
}
