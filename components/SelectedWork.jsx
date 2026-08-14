import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SelectedWork() {
  const projects = [
    {
      title: "Automixa AI",
      category: "AI & Automation",
      description: "An AI-powered Meta API messaging automation platform engineered for Instagram creators and brands to auto-reply to comments & DMs.",
      image: "/automixa-preview.png",
      imageAlt: "Automixa AI Instagram DM and comment automation platform built by Geetanjali Softwares",
      href: "/case-studies/automixa-ai",
      websiteUrl: "https://www.automixa.in/",
      tags: ["Next.js", "Meta API", "Node.js", "PostgreSQL"],
    },
    {
      title: "Money Capital Finance",
      category: "Fintech & Web Applications",
      description: "A fast financial customer portal offering personal, business, and home loans with interactive EMI calculators and partner bank integrations.",
      image: "/money-capital-preview.png",
      imageAlt: "Money Capital Finance portal built by Geetanjali Softwares",
      href: "/case-studies/money-capital-finance",
      websiteUrl: "https://www.moneycapitalfinances.com/",
      tags: ["Next.js", "Financial Engine", "React", "Tailwind CSS"],
    },
    {
      title: "Nakul Properties",
      category: "Real Estate & Custom Software",
      description: "A modern real estate directory portal for buying, selling, and renting luxury builder floors, HUDA sector plots, and SCO shops in Faridabad.",
      image: "/nakul-properties-preview.png",
      imageAlt: "Nakul Properties real estate portal built by Geetanjali Softwares",
      href: "/case-studies/nakul-properties",
      websiteUrl: "http://nakulproperties.com/",
      tags: ["Next.js", "Sanity CMS", "React", "WhatsApp Integration"],
    },
  ];

  // JSON-LD Portfolio / CreativeWork Schema for search engine indexing
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": projects.length,
    "name": "Geetanjali Softwares Featured Case Studies",
    "itemListElement": projects.map((proj, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "CreativeWork",
        "name": proj.title,
        "genre": proj.category,
        "description": proj.description,
        "image": `https://geetanjalisoftwares.com${proj.image}`
      }
    }))
  };

  return (
    <section 
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="py-10 bg-white border-b border-stone-100 relative z-10"
    >
      {/* Portfolio Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-50 border border-stone-100 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Featured Live Projects
          </div>
          <h2 
            id="portfolio-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-stone-900 leading-tight"
          >
            Real products built for real businesses. <br />
            <span className="text-orange-600">High impact &amp; verified performance.</span>
          </h2>
        </div>

        {/* 3 Equal Cards Row Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <article
              key={index}
              className="group bg-stone-50 border border-stone-200/80 rounded-md overflow-hidden hover:border-stone-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Banner */}
              <div className="w-full h-52 overflow-hidden bg-stone-100 relative">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-md hover:bg-black transition-all flex items-center gap-1 border border-white/20 shadow-md"
                  >
                    Live Site <ArrowUpRight className="h-3 w-3 text-orange-400" />
                  </a>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-600/10 px-2.5 py-1 rounded-md border border-orange-600/20 inline-block">
                    {project.category}
                  </span>

                  <h3 className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
                    <Link href={project.href}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-stone-200/60">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-white border border-stone-200 text-stone-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={project.href}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-md bg-stone-900 text-white hover:bg-black transition-colors text-xs font-semibold group/btn"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-orange-400 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>

                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-md bg-orange-600 text-white hover:bg-orange-700 transition-colors text-xs font-semibold shrink-0"
                      >
                        <span>Visit Site</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
