import { GoogleGenerativeAI } from "@google/generative-ai";
import { services } from "@/lib/services";
import { createClient } from "@supabase/supabase-js";

// Server-side admin client to avoid RLS issues
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    // 1. Fetch current settings with admin privileges
    let city = "Delhi NCR & Bihar";
    let siteTitle = "Geetanjali Softwares";

    try {
      const { data: settings } = await supabaseAdmin
        .from('settings')
        .select('local_focus, site_title')
        .eq('id', 1)
        .single();
      
      if (settings) {
        city = settings.local_focus || city;
        siteTitle = settings.site_title || siteTitle;
      }
    } catch (e) {
      console.warn("Could not fetch settings for AI context, using defaults.");
    }

    // 2. Prepare System Prompt (Expert Brain + Service Data)
    const systemPrompt = `
      You are an expert Digital Business Consultant at ${siteTitle}. 
      
      BRAIN & STYLE:
      - Use your own expert brain to suggest creative and effective digital growth strategies.
      - **STRICT LANGUAGE RULE**: Match the user's language 100%. 
        - If the user writes in English, you MUST respond in 100% formal, expert English.
        - If the user writes in Hinglish/Hindi, you MUST respond in friendly Hinglish.
      - Don't be robotic. Be a real, high-level consultant.



      PRODUCT DATA (ONLY use these for specific services):
      - Use exactly these services and descriptions: ${JSON.stringify(services)}

      GOAL:
      - Deeply understand the user's business and suggest how to scale it using the above services.
      - **STRICT CONVERSATION RULE**: Ask only **ONE** question at a time.
      - Never send a list of questions. Be conversational and wait for the user to answer before moving to the next point.
      - Keep responses short (1-2 sentences).

    `;



    // 3. Robust History Mapping (Gemini requires alternating user/model roles)
    const chatMessages = messages.slice(0, -1);
    
    // Start history with system instructions
    const history = [
      {
        role: "user",
        parts: [{ text: `INSTRUCTION: ${systemPrompt}\n\nUnderstood. I am your G-AI Consultant.` }],
      },
      {
        role: "model",
        parts: [{ text: "Confirmed. I am now acting as G-AI, your Senior Digital Growth Consultant." }],
      }
    ];

    // Add remaining messages, ensuring we don't have consecutive roles
    chatMessages.forEach(m => {
      const role = m.role === 'user' ? 'user' : 'model';
      // Only add if it's different from the last role in history
      if (history.length === 0 || history[history.length - 1].role !== role) {
        history.push({
          role,
          parts: [{ text: m.content }]
        });
      }
    });

    const model = genAI.getGenerativeModel(
      { model: "gemini-3.1-flash-lite-preview" }
    );


    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    return Response.json({ content: text });







  } catch (error) {
    console.error("AI Consultant API Error:", error);
    return Response.json({ 
      error: "Connection issue.", 
      details: error.message 
    }, { status: 500 });
  }
}

