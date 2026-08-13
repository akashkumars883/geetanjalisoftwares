import { supabaseAdmin } from "@/lib/supabase";

export const STATIC_BLOG_POSTS = [];

// Fallback high quality topic images
const FALLBACK_IMAGES = {
  ai: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1000&auto=format&fit=crop",
  seo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  marketing: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop",
  web: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
};

function resolveBlogImage(url, title = "", category = "") {
  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    return url;
  }
  
  const text = (title + " " + category).toLowerCase();
  if (text.includes("ai") || text.includes("agent") || text.includes("predictive")) {
    return FALLBACK_IMAGES.ai;
  }
  if (text.includes("seo") || text.includes("search") || text.includes("analytics")) {
    return FALLBACK_IMAGES.seo;
  }
  if (text.includes("marketing") || text.includes("brand")) {
    return FALLBACK_IMAGES.marketing;
  }
  return FALLBACK_IMAGES.web;
}

// Helper to format Supabase DB record to Blog format
function formatDbPost(dbPost, index) {
  const formattedDate = dbPost.created_at
    ? new Date(dbPost.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "August 2026";

  const resolvedImage = resolveBlogImage(dbPost.image_url, dbPost.title, dbPost.category);

  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    category: dbPost.category || "Engineering",
    date: formattedDate,
    readTime: "5 min read",
    author: {
      name: dbPost.author || "Team Geetanjali Softwares",
      role: "Software Architect",
      avatar: "/logo.png",
    },
    description: dbPost.excerpt || dbPost.title,
    image: resolvedImage,
    imageAlt: dbPost.title,
    featured: index === 0, // Recent article as featured
    content: dbPost.content || "",
    tags: dbPost.tags || [],
  };
}

// Fetch all blogs directly from Supabase
export async function getBlogPosts() {
  try {
    const { data: dbPosts, error } = await supabaseAdmin
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error || !dbPosts) {
      console.error("Supabase blog fetch error:", error?.message);
      return [];
    }

    return dbPosts.map((post, idx) => formatDbPost(post, idx));
  } catch (err) {
    console.error("Error fetching blog posts from Supabase:", err);
    return [];
  }
}

// Backwards compatibility export
export const BLOG_POSTS = [];
