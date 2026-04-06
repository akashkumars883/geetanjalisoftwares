import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

    const prompt = `
      You are a Digital Marketing Expert. Suggest ONE trending and high-traffic blog topic for a digital marketing agency called "Geetanjali Softwares".
      
      The agency provides services like: SEO, Web Development, Social Media Marketing, PPC, and Branding.
      Focus on the Indian market (Bihar, Delhi, etc.) but also global trends.
      
      Return the response in EXACTLY this JSON format:
      {
        "title": "Topic title here",
        "category": "Category like SEO/Web Design/Marketing",
        "description": "Short 1-sentence reason why this is trending today",
        "tags": ["tag1", "tag2"]
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Clean JSON if needed
    const jsonStr = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(jsonStr);

    return Response.json(data);
  } catch (error) {
    console.error("AI Blog Suggester Error:", error);
    return Response.json({ 
      title: "How AI is changing Digital Marketing in 2024",
      category: "Marketing",
      description: "AI tools are becoming essential for every small business to scale.",
      tags: ["AI", "Tech"]
    });
  }
}
