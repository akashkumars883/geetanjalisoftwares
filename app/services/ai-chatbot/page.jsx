"use client";

import FaqSection from "@/components/FaqSection";


import Link from "next/link";
import { Zap, ArrowRight, Cpu } from "lucide-react";

// Inline service schema for search engine crawlers
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom AI Chatbots & LLM Integrations",
  "description": "Building intelligent client-facing chat modules and support agents powered by secure OpenAI / Anthropic models, customized semantic database storage, and corporate RAG search pipelines.",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Geetanjali Softwares",
    "url": "https://geetanjalisoftwares.com"
  }
};


const AI_CHATBOT_FAQS = [
  {
    "question": "What LLMs and models do you use for AI chatbot development?",
    "answer": "We integrate OpenAI GPT-4o, Claude 3.5 Sonnet, Llama 3, and Groq models depending on your latency, accuracy, and budget needs."
  },
  {
    "question": "Can the AI chatbot connect to our custom database and CRM?",
    "answer": "Yes! We build secure REST/GraphQL API connectors and RAG vector databases so your chatbot queries internal inventory, customer records, and ticket history."
  },
  {
    "question": "How does the AI chatbot handle complex customer escalations?",
    "answer": "When an inquiry requires human intervention, the chatbot seamlessly routes the conversation context to a live support representative or creates a ticket."
  },
  {
    "question": "Is customer data kept private and compliant?",
    "answer": "Absolutely. We enforce strict data privacy guardrails, zero data retention agreements with model providers, and enterprise encryption."
  },
  {
    "question": "How long does it take to deploy a custom AI chatbot?",
    "answer": "Simple support bots can be deployed within 1 to 2 weeks, while multi-channel RAG-enabled agents take 3 to 4 weeks."
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
            Custom AI Chatbots & <br />
            <span className="text-orange-600">LLM Integrations</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Deploy secure corporate AI assistants within your workflow.
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
              Building intelligent client-facing chat modules and support agents powered by secure OpenAI / Anthropic models, customized semantic database storage, and corporate RAG search pipelines.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Our engineering systems verify page structures, data payloads, and query latency markers continuously. We align each workflow component with target speed and search metrics to drive measurable ROI.
            </p>
          </div>

          {/* Right Block: Benefits Checklist Card */}
          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-md p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-white border border-stone-100 flex items-center justify-center">
                <Cpu className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>

            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Retrieval-Augmented Generation (RAG) vector pipelines</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Instant client ticket deflection workflows</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Direct API integrations to complete account actions</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Corporate security data compliance protocols</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="AI Chatbot Development FAQs"
        subtitle="Common questions about custom AI chatbot integration and LLM workflows."
        faqs={AI_CHATBOT_FAQS}
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



