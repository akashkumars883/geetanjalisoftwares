"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolioData";

export default function PortfolioFilterClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { label: "All Work", value: "All" },
    { label: "Custom CRM & Automation", value: "crm" },
    { label: "AI & Agents", value: "ai" },
    { label: "E-Commerce", value: "ecommerce" },
    { label: "Analytics & SaaS", value: "analytics" },
    { label: "Industry Portals", value: "portals" },
  ];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((proj) => {
    if (selectedCategory === "All") return true;
    return proj.categorySlug === selectedCategory;
  });

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 pb-6 border-b border-stone-100">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.value
                ? "bg-stone-900 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Portfolio Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <article
            key={index}
            className="group bg-stone-50 border border-stone-200/80 rounded-2xl overflow-hidden hover:border-stone-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {project.image && (
              <div className="w-full h-48 overflow-hidden bg-stone-100 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-black transition-all flex items-center gap-1 border border-white/20"
                  >
                    Live Site <ArrowUpRight className="h-3 w-3 text-orange-400" />
                  </a>
                )}
              </div>
            )}

            <div className="p-6 space-y-6 flex-1 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-600/10 px-2.5 py-1 rounded-full border border-orange-600/20">
                    {project.category}
                  </span>
                  <span className="text-xs font-semibold text-stone-400">{project.year}</span>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
                  <Link href={`/case-studies/${project.slug}`}>
                    {project.title}
                  </Link>
                </h2>

                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {project.summary}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200/60">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-center p-2 rounded-lg bg-white border border-stone-200/60">
                      <div className="text-sm font-bold text-stone-900">{metric.value}</div>
                      <div className="text-[9px] text-stone-500 font-medium truncate">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-200/60">
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

                <div className="flex items-center gap-2">
                  <Link
                    href={`/case-studies/${project.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl bg-stone-900 text-white hover:bg-black transition-colors text-xs font-semibold group/btn"
                  >
                    <span>Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-orange-400 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>

                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition-colors text-xs font-semibold shrink-0"
                    >
                      <span>Live Website</span>
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
  );
}
