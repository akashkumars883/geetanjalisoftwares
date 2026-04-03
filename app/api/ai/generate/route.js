import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

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
          You are a professional blog writer for "Geetanjali Softwares", a premium web development and digital marketing agency.
          Write a high-quality, SEO-friendly blog post about the following topic: "${topic}".
          
          Requirements:
          1. Use a professional yet engaging tone.
          2. The content should be in HTML format, suitable for a rich-text editor (use <h2>, <p>, <ul>, <li>, <strong>, etc.).
          3. Include an introduction, at least 3 main sections with subheadings, and a conclusion.
          4. Suggest a catchy title, a short excerpt (max 150 characters), and a suitable category.
          
          Respond WITH A JSON object:
          {
            "title": "Blog Title",
            "excerpt": "Short summary of the blog",
            "content": "Full HTML content...",
            "category": "e.g., Web Development"
          }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();
        if (text) break; // Success!
      } catch (err) {
        console.warn(`Model ${modelName} failed, trying next...`);
        lastError = err;
      }
    }

    if (!text && lastError) throw lastError;
    
    try {
      // Find JSON block more reliably
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : text;
      const data = JSON.parse(jsonString);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error("Parse Error:", parseError, "Text received:", text);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }
  } catch (error) {
    console.error("AI Generation Error:", error);
    if (!process.env.GEMINI_API_KEY) {
       return NextResponse.json({ error: "GEMINI_API_KEY is missing in your .env.local" }, { status: 500 });
    }
    return NextResponse.json({ error: error.message || "Failed to generate blog content" }, { status: 500 });
  }
}
