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

    // 2. Research Topic & SEO Keywords
    const topicData = await researchTopic(category);
    console.log(`Topic Researched: ${topicData.title}`);
    console.log(`Primary SEO Keyword: ${topicData.primary_keyword}`);

    // 3. Generate Content (Humanized, E-E-A-T, and Keyword-Mapped)
    const blogData = await generateBlogContent(
      topicData.title, 
      category, 
      topicData.primary_keyword, 
      topicData.lsi_keywords
    );
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
    You are a Digital Marketing Expert and Senior SEO strategist for "Geetanjali Softwares". 
    Research ONE high-traffic, trending blog topic for the category: "${category}" that solves a real-world problem for business owners today in 2026.
    Also, identify one primary SEO keyword and 4 high-relevance Latent Semantic Indexing (LSI) / supporting keywords for this topic to guarantee high Google Search ranking.
    
    Return ONLY a JSON object:
    {
      "title": "A catchy, human-sounding topic title (CRITICAL: DO NOT use colons ':')",
      "category": "${category}",
      "primary_keyword": "high-traffic primary search term",
      "lsi_keywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4"]
    }
  `;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch ? jsonMatch[0] : text);
}

async function generateBlogContent(topic, category, primaryKeyword = '', lsiKeywords = []) {
  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
  
  const keywordsString = lsiKeywords.join(', ');
  const prompt = `
    You are a Senior SEO Copywriter and Marketing Director for "Geetanjali Softwares".
    Write a high-quality, fully optimized, "Human-like" blog post about: "${topic}".
    Category: ${category}

    SEO TARGETS:
    - Primary Keyword: "${primaryKeyword}" (Must appear naturally in title, within the first 150 words of intro, in at least one H2 heading, and in the conclusion)
    - LSI / Supporting Keywords to naturally weave: "${keywordsString}"
    - Keyword density must feel completely natural, smooth, and informative (strictly NO keyword stuffing).

    GUIDELINES:
    1. E-E-A-T (STRICT):
       - Authoritative, professional expert tone providing actionable, high-value solutions.
       - Cite at least one realistic case scenario or industry data statistic with percentages (e.g., "According to global studies, 88% of clients...").
    2. HUMAN TOUCH (STRICT): 
       - Avoid ALL AI signatures: No "As an AI", "In the digital age", "Delve into", "Unleash", "In summary", "demystify", "testament", "pave the way", or "look no further".
       - Start with a compelling hook or quick anecdote rather than generic definitions.
       - Write like a seasoned business consultant. Use a natural, professional but conversational tone.
       - Vary sentence lengths dynamically (e.g., short punchy statements mixed with deeper descriptive points).
       - NEVER use over-structured, repetitive list formats that look robotic. Use elegant subheadings (<h2>, <h3>) to break up sections.
    3. LOCAL CONTEXT & CTA PROMOTION: 
       - If relevant, naturally mention trends in the Faridabad, Delhi NCR, and Indian digital market to build high local authority.
       - Naturally promote Geetanjali Softwares as the leading website development and SEO partner, including how our specialized services or custom DIY tools (like Automixa / Studio builder) help companies scale.
    4. STRUCTURE: 
       - Catchy Title (50-60 chars). DO NOT use colons ':'.
       - Compelling Excerpt (100-130 chars).
       - Full HTML content with <h2>, <h3>, <ul>, <li>, <strong>, and a clean comparative HTML <table> comparing parameters or options (Google Featured Snippets love this!).
       - 3-4 structured Frequently Asked Questions (FAQ) with answers at the very end of the content under an <h2> FAQ section.
       - Min 1000 words of deeply researched, high-value content.
    
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
