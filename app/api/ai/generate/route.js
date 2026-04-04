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
          You are a professional SEO copywriter for "Geetanjali Softwares", a premium digital agency specializing in website design, development, and marketing.
          Write a high-quality, "Helpful Content" blog post for search engines like Google about the following topic: "${topic}".
          
          Guidelines for Google SEO (E-E-A-T):
          1. Tone: Professional, authoritative, and trustworthy. 
          2. Structure: 
             - Short, engaging introduction.
             - At least 3 main sections using <h2> and <h3> tags.
             - Use bullet points (<ul>, <li>) for better readability.
             - Use <strong> for key terms.
             - A strong conclusion with a subtle call-to-action for "Geetanjali Softwares".
          3. Value: Focus on being helpful to the reader. Provide actionable insights.
          4. Local Context: Where applicable, mention the business landscape in Bihar and across India to show local expertise.
          5. Human-centric Content: 
             - Style: Use a "Human" and "Natural" writing style. Avoid typical robotic AI-generated patterns and clichés.
             - Tone: Consultative, friendly, and expert. Speak directly to the business owner as a trusted partner.
             - Authenticity: Use conversational language, avoid overly complex words, and make it sound like a real person from Geetanjali Softwares wrote it.
          6. Limits: 
             - Title: 50-60 characters precisely.
             - Excerpt: 100-130 characters precisely.
             - Content: 800-1200 words precisely.
          
          Respond ONLY with a JSON object:
          {
            "title": "SEO Optimized Title (50-60 chars)",
            "excerpt": "Compelling Meta Description (100-130 chars)",
            "content": "Full HTML content starting with an intro...",
            "category": "e.g., Business Strategy"
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
