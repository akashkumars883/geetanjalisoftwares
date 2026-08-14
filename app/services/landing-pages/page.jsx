"use client";

import FaqSection from "@/components/FaqSection";


import Link from "next/link";
import { Zap, ArrowRight, Layout } from "lucide-react";

// Inline service schema for search engine crawlers
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "High-Converting Landing Page Design",
  "description": "Conversion-rate optimized single-page web structures featuring instantaneous Core Web Vitals loading metrics, semantic text layout hierarchies, and direct CTA actions.",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Geetanjali Softwares",
    "url": "https://geetanjalisoftwares.com"
  }
};


const LANDING_PAGES_FAQS = [
  {
    "question": "What makes a landing page high-converting?",
    "answer": "High conversion stems from sub-second load speeds, clear hero headlines, strong social proof, compelling CTAs, and frictionless lead forms."
  },
  {
    "question": "Do you design landing pages for Google Ads and Meta Ads campaigns?",
    "answer": "Yes! We build ad-aligned landing pages engineered to maximize Google Quality Score and lower your cost-per-lead (CPL)."
  },
  {
    "question": "Can you integrate the landing page form directly into our CRM?",
    "answer": "Yes, leads auto-sync in real time into your CRM, email autoresponder, or WhatsApp notifications."
  },
  {
    "question": "How quickly can a custom landing page be delivered?",
    "answer": "High-converting landing pages are delivered within 3 to 7 business days."
  },
  {
    "question": "Do you perform A/B testing on landing page variants?",
    "answer": "Yes, we implement A/B split testing for headlines, CTAs, and layout variations to optimize conversion performance."
  }
];

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-white pt-16 text-left">
      {/* Search Engine Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Header Area */}
      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Services Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            High-Converting Landing <br />
            <span className="text-orange-600">Page Design</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Turn advertising clicks into loyal corporate clients.
          </p>
        </div>
      </section>

      {/* Detailed Description Grid */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Block */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              High-performance implementation blueprints.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Conversion-rate optimized single-page web structures featuring instantaneous Core Web Vitals loading metrics, semantic text layout hierarchies, and direct CTA actions.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Our engineering systems verify page structures, data payloads, and query latency markers continuously. We align each workflow component with target speed and search metrics to drive measurable ROI.
            </p>
          </div>

          {/* Right Block: Benefits Checklist Card */}
          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-md p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-white border border-stone-100 flex items-center justify-center">
                <Layout className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>

            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Instant LCP load speeds under 1.2 seconds</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Integrated A/B test telemetry frameworks</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Sleek form setups with CRM integrations</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Pixel-perfect styling using Tailwind CSS</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Landing Page Development FAQs"
        subtitle="Questions about high-converting PPC and lead generation landing pages."
        faqs={LANDING_PAGES_FAQS}
      />

      {/* Contact Trigger Block */}
      <section className="py-10 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-md p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-md blur-3xl pointer-events-none" />
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to deploy your customized system?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Connect with our team to discuss project architectures, API specifications, and database configurations.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Consult an Engineer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}



