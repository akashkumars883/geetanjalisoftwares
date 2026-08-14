import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";
import PortfolioFilterClient from "@/components/PortfolioFilterClient";
import FaqSection from "@/components/FaqSection";

export const metadata = {
  title: "Featured Software Engineering Case Studies",
  description:
    "Explore case studies of custom web applications, real estate CRMs, autonomous AI agents, headless e-commerce, and enterprise analytics platforms built by Geetanjali Softwares.",
  keywords:
    "software engineering case studies, custom CRM case study, AI chatbot case study, Next.js e-commerce case study, web application metrics",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/case-studies",
  },
  openGraph: {
    title: "Featured Software Engineering Case Studies | Geetanjali Softwares",
    description:
      "Featured case studies detailing challenges, engineering architectures, and ROI metrics for custom software projects.",
    url: "https://geetanjalisoftwares.com/case-studies",
    type: "website",
  },
};

const CASE_STUDY_FAQS = [
  {
    question: "What types of custom software projects are featured in your case studies?",
    answer:
      "Our case studies highlight real-world client solutions across enterprise CRM software, autonomous AI support agents, headless Next.js e-commerce stores, real estate property portals, and business intelligence dashboards.",
  },
  {
    question: "Are the performance metrics and speed improvements in your case studies verified?",
    answer:
      "Yes. All lighthouse Core Web Vitals scores, ticket deflection percentages, conversion lift rates, and server response metrics represent empirical benchmarks recorded upon project deployment.",
  },
  {
    question: "Can Geetanjali Softwares build custom software tailored to my specific niche?",
    answer:
      "Absolutely. We engineer bespoke schemas, custom API connectors, and tailored UI workflows designed specifically around your operational SOPs and industry compliance requirements.",
  },
  {
    question: "How do you measure success and return on investment for your builds?",
    answer:
      "We track concrete quantitative KPIs — such as Lighthouse page load speed (sub-second target), organic Google search traffic growth, lead conversion rates, and operational time saved through automation.",
  },
  {
    question: "What was the typical development timeline for these featured case studies?",
    answer:
      "Project timelines ranged from 3 to 6 weeks for streamlined web applications and AI agent integrations up to 8 to 12 weeks for complex multi-module enterprise CRM platforms.",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white pt-16 text-left selection:bg-orange-500/20 selection:text-orange-900">
      {/* Hero Section */}
      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <Briefcase className="h-3.5 w-3.5 text-orange-600" /> Featured Case Studies
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Software architectures engineered <br />
            <span className="text-orange-600">for scale & measurable ROI.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Explore our featured case studies — from custom CRM platforms and autonomous AI support agents to headless Next.js storefronts and enterprise analytics engines.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Projects Grid (Client Component) */}
      <section className="py-8 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <PortfolioFilterClient />
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection
        title="Frequently Asked Case Study Questions"
        subtitle="Common questions about our engineering benchmarks, client delivery, and tech stacks."
        faqs={CASE_STUDY_FAQS}
      />

      {/* CTA Section */}
      <section className="py-10 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-3 max-w-2xl text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Have a custom software project?</h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Connect with our senior engineering team for technical architecture design, cost estimates, and sprint planning.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Request Technical Proposal
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
