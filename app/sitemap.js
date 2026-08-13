import { getBlogPosts } from "@/lib/blogData";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolioData";

export default async function sitemap() {
  const BASE_URL = "https://geetanjalisoftwares.com";
  const now = new Date().toISOString();

  // Static core pages
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE_URL}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/case-studies`, priority: 0.85, changeFrequency: "weekly" },
    { url: `${BASE_URL}/pricing`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contact`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE_URL}/privacy-policy`, priority: 0.5, changeFrequency: "yearly" },
    { url: `${BASE_URL}/terms-of-service`, priority: 0.5, changeFrequency: "yearly" },
    { url: `${BASE_URL}/refund-policy`, priority: 0.5, changeFrequency: "yearly" },
    { url: `${BASE_URL}/sitemap`, priority: 0.6, changeFrequency: "monthly" },
  ];

  // Case Study pages
  const caseStudyPages = PORTFOLIO_PROJECTS.map((project) => ({
    url: `${BASE_URL}/case-studies/${project.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  // Fetch ALL blog posts directly from Supabase (Includes current & all future published blogs)
  let blogPosts = [];
  try {
    blogPosts = await getBlogPosts();
  } catch (e) {
    console.error("Error loading blog posts for sitemap:", e);
  }

  const blogPages = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  // Services pages
  const servicesSlugs = [
    "business-website",
    "web-applications",
    "landing-pages",
    "ecommerce",
    "branding",
    "seo",
    "local-seo",
    "ecommerce-seo",
    "technical-seo",
    "content-strategist",
    "ai-chatbot",
    "business-automation",
    "crm-custom-software",
    "api-integration",
  ];

  const servicePages = servicesSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    priority: 0.9,
    changeFrequency: "monthly",
  }));

  // Solutions pages
  const solutionsSlugs = [
    "ecommerce-retail",
    "healthcare-medical",
    "real-estate",
    "fintech-finance",
    "edtech-education",
    "startups-mvp",
    "smb",
    "enterprise",
    "customer-portals",
    "inventory-systems",
    "business-intelligence",
    "cloud-saas",
  ];

  const solutionPages = solutionsSlugs.map((slug) => ({
    url: `${BASE_URL}/solutions/${slug}`,
    priority: 0.85,
    changeFrequency: "monthly",
  }));

  // Combine all and add lastModified
  const allPages = [
    ...staticPages,
    ...caseStudyPages,
    ...blogPages,
    ...servicePages,
    ...solutionPages,
  ].map((page) => ({
    ...page,
    lastModified: now,
  }));

  return allPages;
}
