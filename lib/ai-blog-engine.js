import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

// Database Setup
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || "23102215-483401647597ecd040735b5ed";

// Categories for Random Rotation
const categories = [
  "AI & Future Tech",
  "SEO & Content Strategy",
  "Web Development",
  "Digital Marketing",
  "Website Builder Tips",
  "Business Growth"
];

/**
 * Main function to run the daily blog cycle
 */
export async function runAutoBlogCycle() {
  try {
    console.log("--- Starting Daily Auto-Blog Cycle ---");

    // 1. Pick a Random Category
    const category = categories[Math.floor(Math.random() * categories.length)];
    console.log(`Selected Category: ${category}`);

    // 2. Research Topic
    const topicData = await researchTopic(category);
    console.log(`Topic Researched: ${topicData.title}`);

    // 3. Generate Content (Humanized & E-E-A-T)
    const blogData = await generateBlogContent(topicData.title, category);
    console.log("Blog Content Generated.");

    // 4. Fetch Stock Image from Pixabay
    const imageUrl = await fetchPixabayImage(topicData.title, category);
    blogData.image_url = imageUrl;

    // 5. Save to Supabase
    const savedBlog = await saveBlogToDb(blogData);
    console.log(`Blog Successfully Saved! ID: ${savedBlog.id}`);

    return { success: true, blog: savedBlog };
  } catch (error) {
    console.error("Auto-Blog Cycle Failed:", error);
    throw error;
  }
}

async function researchTopic(category) {
  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
  const prompt = `
    You are a Digital Marketing Expert for "Geetanjali Softwares". 
    Research ONE trending and high-traffic blog topic for the category: "${category}".
    The topic should be fresh, highly relevant for today (2026), and solve a real problem for business owners.
    Return ONLY a JSON object:
    {
      "title": "A catchy, human-sounding topic title (CRITICAL: DO NOT use colons ':')",
      "category": "${category}"
    }
  `;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch ? jsonMatch[0] : text);
}

async function generateBlogContent(topic, category) {
  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
  
  const prompt = `
    You are a professional SEO copywriter for "Geetanjali Softwares".
    Write a high-quality, "Human-like" blog post about: "${topic}".
    Category: ${category}

    GUIDELINES:
    1. E-E-A-T: Be authoritative, use expert tone, and provide actionable value.
    2. HUMAN TOUCH (STRICT): 
       - Avoid ALL AI signatures: No "As an AI", "In the digital age", "Delve into", "Unleash", or "In summary".
       - Write like a seasoned business consultant. Use a natural, slightly informal but professional tone.
       - Use varying sentence lengths and structures to mimic human thought patterns.
       - NEVER use over-structured, repetitive list formats that look robotic.
    3. WEBSITE BUILDER PROMOTION: 
       - If relevant, naturally mention how a DIY Website Builder (like our Automixa/Studio tool) can help businesses.
    4. STRUCTURE: 
       - Catchy Title (50-60 chars). Avoid always putting years (like 2026) in every title. DO NOT use colons ':'.
       - Compelling Excerpt (100-130 chars).
       - Full HTML content with <h2>, <h3>, <ul>, <li>, and <strong> tags.
       - Min 800 words.
    
    Respond ONLY with JSON:
    {
      "title": "...",
      "excerpt": "...",
      "content": "Full HTML content...",
      "category": "${category}",
      "tags": ["tag1", "tag2", "tag3"]
    }
  `;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch ? jsonMatch[0] : text);
}

async function fetchPixabayImage(topic, category) {
  try {
    // Search keywords: combine topic and category
    const query = encodeURIComponent(`${category} technology business`);
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=3&safesearch=true`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.hits && data.hits.length > 0) {
      // Pick the first large image
      return data.hits[0].largeImageURL;
    }
    
    // Fallback images based on category
    const fallbacks = {
      "Web Development": "/images/website.png",
      "SEO & Content Strategy": "/images/seo_scanner_analytics.png",
      "Branding": "/images/branding.png"
    };
    return fallbacks[category] || "/images/marketing.png";
  } catch (error) {
    console.error("Pixabay Fetch Failed:", error);
    return "/images/marketing.png";
  }
}

async function saveBlogToDb(blogData) {
  const { title, excerpt, content, category, tags, image_url } = blogData;
  
  // Generate Slug
  const slug = title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  const { data, error } = await supabaseAdmin
    .from('blogs')
    .insert([{ 
      title, 
      slug, 
      excerpt, 
      content, 
      image_url, 
      category, 
      author: "Team Geetanjali Softwares",
      tags: tags || [],
      is_published: true
    }])
    .select();

  if (error) throw error;
  return data[0];
}
