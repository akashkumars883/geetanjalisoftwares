"use client";

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

        {/* 3 Equal Cards Row Grid Layout matching What We Do card style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.href}
              className="group relative h-[440px] w-full overflow-hidden rounded-md border border-stone-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-end cursor-pointer block"
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Initial Gradient Overlay (Bottom dark fade to read title) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-all duration-500 md:group-hover:opacity-0" />

              {/* Initial Title Display (Visible by default on mobile, fades on hover on desktop) */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex items-end justify-between transition-all duration-500 md:group-hover:opacity-0 md:group-hover:translate-y-4">
                <div className="space-y-1 max-w-[85%] text-left">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block">
                    {project.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{project.title}</h3>
                </div>
                <span className="h-9 w-9 rounded-md bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center shrink-0">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </span>
              </div>

              {/* Hover Overlay Content (Slides up/fades in on hover on desktop, or active on touch) */}
              <div className="absolute inset-0 bg-black/75 backdrop-blur-[3px] opacity-0 md:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 space-y-4 translate-y-8 md:group-hover:translate-y-0 z-20 text-left">
                {/* Header inside Hover State */}
                <div className="flex items-center justify-between text-white border-b border-white/10 pb-2">
                  <div>
                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
                  </div>
                  <span className="h-8 w-8 rounded-md bg-white text-black flex items-center justify-center shrink-0">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, i) => (
                    <li key={i}>
                      <span className="inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-white/10 border border-white/10 text-zinc-200">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Action Links */}
                <div className="flex items-center gap-2 pt-1 z-30">
                  <span className="flex-1 inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-md bg-white text-black hover:bg-zinc-200 transition-colors text-xs font-bold">
                    <span>Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>

                  {project.websiteUrl && (
                    <object className="inline-block">
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-md bg-orange-600 text-white hover:bg-orange-500 transition-colors text-xs font-bold shrink-0"
                      >
                        <span>Visit Site</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </object>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
