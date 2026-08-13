import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, BarChart3, Layers, Building2 } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolioData";

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((proj) => ({
    slug: proj.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
  
  if (!project) {
    return { title: "Case Study Not Found – Geetanjali Softwares" };
  }

  return {
    title: `${project.title} – Case Study`,
    description: project.summary,
    alternates: {
      canonical: `https://geetanjalisoftwares.com/portfolio/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `https://geetanjalisoftwares.com/portfolio/${project.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = PORTFOLIO_PROJECTS.filter((p) => p.slug !== slug).slice(0, 2);

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "genre": project.category,
    "description": project.summary,
    "author": {
      "@type": "Organization",
      "name": "Geetanjali Softwares",
    },
  };

  return (
    <main className="min-h-screen bg-white pt-28 pb-20 text-left selection:bg-orange-500/20 selection:text-orange-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />

      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* Back Link */}
        <div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-black transition-colors bg-stone-100 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Portfolio Showcase
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="space-y-6 border-b border-stone-200 pb-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-600/20 text-xs font-bold uppercase tracking-wider text-orange-600">
              {project.category}
            </span>
            <span className="text-xs font-semibold text-stone-500">{project.year}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-stone-900 leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          {/* Client & Metadata Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-stone-50 border border-stone-200">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Client</div>
              <div className="text-sm font-bold text-stone-900">{project.client}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Industry</div>
              <div className="text-sm font-bold text-stone-900">{project.industry}</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Year</div>
              <div className="text-sm font-bold text-stone-900">{project.year}</div>
            </div>
          </div>
        </header>

        {/* Key Metrics Banner */}
        <section className="p-8 rounded-2xl bg-stone-900 text-white space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Measured Impact & Key Results
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {project.metrics.map((metric, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{metric.value}</div>
                <div className="text-xs text-stone-300 font-medium pt-1">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Breakdown: Challenge & Solution */}
        <section className="space-y-10 text-stone-700 text-base leading-relaxed font-light">
          
          {/* Challenge Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Building2 className="h-6 w-6 text-orange-600" />
              The Challenge
            </h2>
            <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 text-sm sm:text-base leading-relaxed">
              {project.challenge.trim().split("\n\n").map((para, i) => (
                <p key={i} className="mb-3 last:mb-0">{para}</p>
              ))}
            </div>
          </div>

          {/* Solution Architecture */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Cpu className="h-6 w-6 text-orange-600" />
              Engineering Solution
            </h2>
            <div className="p-6 rounded-xl bg-white border border-stone-200 text-stone-600 text-sm sm:text-base leading-relaxed">
              {project.solution.trim().split("\n\n").map((para, i) => (
                <p key={i} className="mb-3 last:mb-0">{para}</p>
              ))}
            </div>
          </div>

          {/* Key Deliverables & Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Layers className="h-6 w-6 text-orange-600" />
              Key Delivered Capabilities
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, i) => (
                <li key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold text-stone-800 flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Stack */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-full text-xs font-semibold bg-stone-100 border border-stone-200 text-stone-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </section>

        {/* Footer CTA & Related Projects */}
        <footer className="pt-10 border-t border-stone-200 space-y-12">
          <div className="p-8 rounded-2xl bg-black text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg text-left">
              <h3 className="text-xl font-bold text-white">Want similar results for your business?</h3>
              <p className="text-xs text-zinc-400 font-light">
                Tell us about your technical goals and we'll craft a custom engineering proposal.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Start Project Discussion
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Related Case Studies */}
          {relatedProjects.length > 0 && (
            <div className="space-y-6 text-left">
              <h3 className="text-2xl font-bold text-stone-900">Explore More Case Studies</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedProjects.map((rel, i) => (
                  <Link
                    key={i}
                    href={`/portfolio/${rel.slug}`}
                    className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-stone-400 transition-all space-y-3 block group"
                  >
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{rel.category}</span>
                    <h4 className="text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors">{rel.title}</h4>
                    <p className="text-xs text-stone-600 font-light line-clamp-2">{rel.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </footer>

      </div>
    </main>
  );
}
