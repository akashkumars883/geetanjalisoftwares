"use client";

import FaqSection from "@/components/FaqSection";


import Link from "next/link";
import { Zap, ArrowRight, Shield } from "lucide-react";

// Inline service schema for search engine crawlers
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Business Workflow Automation Services",
  "description": "Engineering automatic data pipelines, scheduling script triggers, connecting SaaS tools APIs, and centralizing data workflows to reduce operation latencies.",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Geetanjali Softwares",
    "url": "https://geetanjalisoftwares.com"
  }
};


const BUSINESS_AUTOMATION_FAQS = [
  {
    "question": "What business workflows can be automated?",
    "answer": "We automate lead routing, invoice generation, CRM data syncing, customer email notifications, report generation, and multi-app data transfers."
  },
  {
    "question": "Do you use platforms like Zapier/Make or build custom scripts?",
    "answer": "We build both! For simple workflows we leverage Zapier/Make, and for high-volume complex tasks we engineer custom Python/Node.js microservices."
  },
  {
    "question": "How much time and cost can business automation save?",
    "answer": "Clients typically reduce manual data entry time by 70% to 90%, saving hundreds of staff hours and eliminating human copy-paste errors."
  },
  {
    "question": "What happens if a third-party app changes its API?",
    "answer": "We build automated fallback error logging and offer retainer monitoring to quickly update integration endpoints if external APIs change."
  },
  {
    "question": "How do we get started with automating our operations?",
    "answer": "We audit your team's repetitive daily tasks during a discovery call and map out a prioritized automation roadmap with instant ROI impact."
  }
];

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-white pt-24 text-left">
      {/* Search Engine Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Header Area */}
      <section className="py-20 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Services Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Business Workflow <br />
            <span className="text-orange-600">Automation Services</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Replace repetitive manual admin tasks with secure code.
          </p>
        </div>
      </section>

      {/* Detailed Description Grid */}
      <section className="py-16 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Block */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              High-performance implementation blueprints.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Engineering automatic data pipelines, scheduling script triggers, connecting SaaS tools APIs, and centralizing data workflows to reduce operation latencies.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Our engineering systems verify page structures, data payloads, and query latency markers continuously. We align each workflow component with target speed and search metrics to drive measurable ROI.
            </p>
          </div>

          {/* Right Block: Benefits Checklist Card */}
          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>

            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Custom secure webhook listeners and API routes</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Real-time database synchronizations across platforms</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Automated client transactional email workflows</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Telemetry logging alerts for pipeline errors</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Business Automation FAQs"
        subtitle="Common questions about workflow automation, Zapier, Make, and custom bots."
        faqs={BUSINESS_AUTOMATION_FAQS}
      />

      {/* Contact Trigger Block */}
      <section className="py-16 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
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



