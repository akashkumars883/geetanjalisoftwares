import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";

// Load .env.local variables
if (existsSync(".env.local")) {
  const envConfig = readFileSync(".env.local", "utf8");
  envConfig.split("\n").forEach(line => {
    const splitIndex = line.indexOf("=");
    if (splitIndex !== -1) {
      const key = line.substring(0, splitIndex).trim();
      let value = line.substring(splitIndex + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function enhanceExistingBlogs() {
  try {
    console.log("--- Starting Existing Blogs Enhancement ---");
    
    // Fetch all blogs
    const { data: blogs, error } = await supabaseAdmin
      .from("blogs")
      .select("id, title, content, category");
      
    if (error) throw error;
    
    console.log(`Found ${blogs.length} total blogs in database.`);
    
    for (const blog of blogs) {
      const hasFaq = blog.content && (
        blog.content.includes("<h2>Frequently Asked Questions") || 
        blog.content.includes("<h2>FAQ") || 
        blog.content.includes("<h3>Frequently Asked Questions")
      );
      
      if (hasFaq) {
        console.log(`[SKIPPED] Blog ID ${blog.id}: "${blog.title}" already has FAQs.`);
        continue;
      }
      
      console.log(`[ENHANCING] Blog ID ${blog.id}: "${blog.title}"...`);
      
      // Use Gemini to generate FAQs & clean table tailored to this content
      const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
      
      const prompt = `
        You are an expert SEO content optimizer.
        I am giving you the HTML content of a blog post titled "${blog.title}".
        Your task is to generate:
        1. An HTML comparative table (<table>, <th>, <td>) comparing 2-3 strategic parameters/options/tools relevant to the topic of "${blog.title}" (styled naturally with clean semantic tags).
        2. A structured FAQ section starting with "<h2>Frequently Asked Questions</h2>" containing 3-4 business-focused, high-converting Frequently Asked Questions (using <h3> for questions and <p> for answers).
        
        Write this in an authoritative, highly professional expert tone (E-E-A-T compliant), and naturally promote Geetanjali Softwares or our specialized web services where relevant.
        Ensure you do NOT include any AI signatures or conversational filler in your response.
        
        Return ONLY the raw HTML chunk consisting of:
        - The comparative table block
        - The <h2> FAQ section and Q&As
        
        Original Content context:
        ${blog.content.substring(0, 3000)}
      `;
      
      const result = await model.generateContent(prompt);
      const htmlAppend = (await result.response.text()).trim();
      
      // Clean up markdown block wraps if model outputs ```html ... ```
      const cleanedAppend = htmlAppend
        .replace(/^```html\s*/i, "")
        .replace(/```$/, "")
        .trim();
        
      const updatedContent = `${blog.content}\n\n<!-- Enhanced SEO Sections -->\n${cleanedAppend}`;
      
      // Save back to DB
      const { error: updateError } = await supabaseAdmin
        .from("blogs")
        .update({ content: updatedContent })
        .eq("id", blog.id);
        
      if (updateError) {
        console.error(`[ERROR] Failed to update Blog ID ${blog.id}:`, updateError.message);
      } else {
        console.log(`[SUCCESS] Enhanced Blog ID ${blog.id} with rich FAQs and comparative tables.`);
      }
      
      // Add a small delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    console.log("--- Enhancement Finished Successfully! ---");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

enhanceExistingBlogs();
