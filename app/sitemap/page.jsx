import Link from "next/link";
import { ArrowRight, Layout, Server, ShieldCheck, Briefcase, Globe, BookOpen } from "lucide-react";
import { getBlogPosts } from "@/lib/blogData";

export const metadata = {
  title: "HTML Sitemap – Geetanjali Softwares Navigation Directory",
  description:
    "Explore the complete HTML sitemap of Geetanjali Softwares. Access all custom software development services, industry solutions, portfolio, legal policies, and blog articles.",
  keywords:
    "Geetanjali Softwares sitemap, site directory, custom software pages, web development services list, legal policies index, blog articles sitemap",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/sitemap",
  },
  openGraph: {
    title: "HTML Sitemap – Geetanjali Softwares Navigation Directory",
    description: "Complete directory of software services, industry solutions, portfolio work, blog articles, and legal pages.",
    url: "https://geetanjalisoftwares.com/sitemap",
    type: "website",
  },
};

export default async function HtmlSitemapPage() {
  const blogPosts = await getBlogPosts();

  const mainPages = [
    { title: "Home", href: "/", desc: "Custom software engineering and AI agency home." },
    { title: "About Us", href: "/about", desc: "Our company mission, tech stack, and senior team." },
    { title: "Our Blog", href: "/blog", desc: "Software engineering blueprints and digital growth guides." },
    { title: "Case Studies", href: "/case-studies", desc: "Showcase of our featured web apps, AI tools, and enterprise platforms." },
    { title: "Pricing & Plans", href: "/pricing", desc: "Transparent pricing tiers and project estimation models." },
    { title: "Contact Us", href: "/contact", desc: "Get a technical consultation and instant project estimate." },
  ];

  const servicePages = [
    { title: "Business Websites", href: "/services/business-website" },
    { title: "Web Applications", href: "/services/web-applications" },
    { title: "Landing Pages", href: "/services/landing-pages" },
    { title: "Headless E-Commerce", href: "/services/ecommerce" },
    { title: "Corporate Branding", href: "/services/branding" },
    { title: "Search Engine Optimization", href: "/services/seo" },
    { title: "Local SEO", href: "/services/local-seo" },
    { title: "E-Commerce SEO", href: "/services/ecommerce-seo" },
    { title: "Technical SEO", href: "/services/technical-seo" },
    { title: "Content Strategy", href: "/services/content-strategist" },
    { title: "AI Chatbots", href: "/services/ai-chatbot" },
    { title: "Business Automation", href: "/services/business-automation" },
    { title: "Custom CRM Software", href: "/services/crm-custom-software" },
    { title: "API Integration", href: "/services/api-integration" },
  ];

  const solutionPages = [
    { title: "E-Commerce & Retail", href: "/solutions/ecommerce-retail" },
    { title: "Healthcare & Medical", href: "/solutions/healthcare-medical" },
    { title: "Real Estate Tech", href: "/solutions/real-estate" },
    { title: "Fintech & Finance", href: "/solutions/fintech-finance" },
    { title: "EdTech & Education", href: "/solutions/edtech-education" },
    { title: "Startups & MVP", href: "/solutions/startups-mvp" },
    { title: "Small & Medium Business", href: "/solutions/smb" },
    { title: "Enterprise Solutions", href: "/solutions/enterprise" },
    { title: "Customer Portals", href: "/solutions/customer-portals" },
    { title: "Inventory Systems", href: "/solutions/inventory-systems" },
    { title: "Business Intelligence", href: "/solutions/business-intelligence" },
    { title: "Cloud & SaaS", href: "/solutions/cloud-saas" },
  ];

  const legalPages = [
    { title: "Privacy Policy", href: "/privacy-policy", desc: "Data collection, user privacy rights, and cookies policy." },
    { title: "Terms of Service", href: "/terms-of-service", desc: "Legal service agreements, IP rights, and liability limitations." },
    { title: "Cancellation & Refund Policy", href: "/refund-policy", desc: "Transparent milestone refund and contract cancellation terms." },
    { title: "XML Sitemap", href: "/sitemap.xml", desc: "Search engine crawler XML sitemap index." },
  ];

  return (
    <main className="min-h-screen bg-white pt-24 text-left">
      {/* Page Header */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <Globe className="h-3.5 w-3.5 text-orange-600" /> Site Index & Directory
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-stone-900 leading-[1.1]">
            HTML Sitemap
          </h1>
          <p className="text-base text-stone-600 font-light max-w-2xl">
            Quickly navigate across all pages, services, industry solutions, blog articles, and legal documentation on Geetanjali Softwares.
          </p>
        </div>
      </section>

      {/* Sitemap Content Grid */}
      <section className="pb-20 bg-white px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Main Pages */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-stone-900 font-bold text-xl pb-2">
                <Layout className="h-5 w-5 text-orange-600" />
                <h2>Main Pages</h2>
              </div>
              <ul className="space-y-4">
                {mainPages.map((item, i) => (
                  <li key={i}>
                    <Link 
                      href={item.href} 
                      className="group block space-y-1 hover:translate-x-1 transition-transform"
                    >
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-orange-600 flex items-center gap-2">
                        {item.title}
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-stone-500 font-light">{item.desc}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Compliance Pages */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-stone-900 font-bold text-xl pb-2">
                <ShieldCheck className="h-5 w-5 text-orange-600" />
                <h2>Legal & Compliance</h2>
              </div>
              <ul className="space-y-4">
                {legalPages.map((item, i) => (
                  <li key={i}>
                    <Link 
                      href={item.href} 
                      className="group block space-y-1 hover:translate-x-1 transition-transform"
                    >
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-orange-600 flex items-center gap-2">
                        {item.title}
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-stone-500 font-light">{item.desc}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blog Articles Section */}
            <div className="space-y-6 md:col-span-2">
              <div className="flex items-center gap-3 text-stone-900 font-bold text-xl pb-2">
                <BookOpen className="h-5 w-5 text-orange-600" />
                <h2>Published Blog Articles ({blogPosts.length})</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {blogPosts.map((post, i) => (
                  <Link
                    key={i}
                    href={`/blog/${post.slug}`}
                    className="p-2 text-xs font-medium text-stone-700 hover:text-orange-600 transition-all flex items-center justify-between group hover:translate-x-1"
                  >
                    <span className="line-clamp-1">• {post.title}</span>
                    <ArrowRight className="h-3 w-3 text-orange-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div className="space-y-6 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 text-stone-900 font-bold text-xl pb-2">
                <Server className="h-5 w-5 text-orange-600" />
                <h2>Engineering & SEO Services ({servicePages.length})</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicePages.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="p-2 text-xs font-medium text-stone-700 hover:text-orange-600 transition-all flex items-center justify-between group hover:translate-x-1"
                  >
                    <span>• {item.title}</span>
                    <ArrowRight className="h-3 w-3 text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Solutions Section */}
            <div className="space-y-6 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 text-stone-900 font-bold text-xl pb-2">
                <Briefcase className="h-5 w-5 text-orange-600" />
                <h2>Industry Solutions ({solutionPages.length})</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {solutionPages.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="p-2 text-xs font-medium text-stone-700 hover:text-orange-600 transition-all flex items-center justify-between group hover:translate-x-1"
                  >
                    <span>• {item.title}</span>
                    <ArrowRight className="h-3 w-3 text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}
