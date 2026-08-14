import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SelectedWork() {
  const projects = [
    {
      title: "Vesper CRM",
      category: "Custom CRM & Automation",
      description: "A custom real-estate customer relationship management system engineered to automate lead parsing, document flows, and agent tasks.",
      image: "/service-1.jpg",
      imageAlt: "Vesper CRM custom dashboard and workflow automation software built by Geetanjali Softwares",
      href: "/case-studies/vesper-crm",
      tags: ["Next.js", "Node.js", "PostgreSQL", "CRM Automation"],
      gridClass: "md:col-span-8 h-[450px]", // Wide featured card
    },
    {
      title: "Aether AI",
      category: "AI Integration & Agents",
      description: "Autonomous LLM-driven customer support agent integrated with enterprise database systems for instant semantic resolution.",
      image: "/service-1.jpg",
      imageAlt: "Aether AI chatbot integration and natural language processing database connector built by Geetanjali Softwares",
      href: "/case-studies/aether-ai",
      tags: ["AI Agents", "OpenAI API", "Vector Search", "FastAPI"],
      gridClass: "md:col-span-4 h-[450px]", // Narrow card
    },
    {
      title: "Apex Commerce",
      category: "E-Commerce",
      description: "A high-performance, headless commerce engine with near-instant page transitions, customized checkout flows, and SEO architecture.",
      image: "/service-1.jpg",
      imageAlt: "Apex Commerce headless e-commerce storefront web application built by Geetanjali Softwares",
      href: "/case-studies/apex-commerce",
      tags: ["Headless Commerce", "React", "GraphQL", "Tailwind CSS"],
      gridClass: "md:col-span-12 h-[380px]", // Full-width featured card at the bottom
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-50 border border-stone-100 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Featured Case Studies
          </div>
          <h2 
            id="portfolio-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-stone-900 leading-tight"
          >
            Digital architectures built <br />
            <span className="text-orange-600">to scale performance.</span>
          </h2>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.href}
              className={`group relative w-full overflow-hidden rounded-xl border border-stone-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-end cursor-pointer block ${project.gridClass}`}
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.imageAlt}
                width={700}
                height={450}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Initial Gradient Overlay (Bottom dark fade to read title) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 md:group-hover:opacity-0" />

              {/* Initial Title Display (Visible by default on mobile, fades on hover on desktop) */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex items-end justify-between transition-all duration-500 md:group-hover:opacity-0 md:group-hover:translate-y-4">
                <div className="space-y-1.5 max-w-[85%]">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block">
                    {project.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{project.title}</h3>
                  <p className="text-xs text-zinc-300 line-clamp-2 md:hidden pt-0.5 font-light">{project.description}</p>
                </div>
                <span className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </span>
              </div>

              {/* Desktop Hover Overlay Content */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] opacity-0 md:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 space-y-4 translate-y-8 md:group-hover:translate-y-0 z-20 text-left pointer-events-none">
                {/* Header inside Hover State */}
                <div className="flex items-center justify-between text-white border-b border-white/10 pb-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
                  </div>
                  <span
                    aria-label={`View case study for ${project.title}`}
                    className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-105 transition-transform"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 font-light leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                {/* Sub-services Pills */}
                <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Project technologies used">
                  {project.tags.map((tag, i) => (
                    <li key={i}>
                      <span
                        className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 border border-white/10 text-zinc-200"
                      >
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
