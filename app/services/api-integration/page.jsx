"use client";

import FaqSection from "@/components/FaqSection";


import Link from "next/link";
import { Zap, ArrowRight, Terminal } from "lucide-react";

// Inline service schema for search engine crawlers
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom API Development & Integration",
  "description": "Designing REST and GraphQL interfaces to securely synchronize databases, third-party applications, payment gateways, and custom script endpoints.",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Geetanjali Softwares",
    "url": "https://geetanjalisoftwares.com"
  }
};


const API_INTEGRATION_FAQS = [
  {
    "question": "What API architectures do you specialize in?",
    "answer": "We specialize in RESTful APIs, GraphQL endpoints, Webhooks, gRPC microservices, and serverless middleware integrations."
  },
  {
    "question": "Can you connect legacy software to modern cloud web applications?",
    "answer": "Yes, we build custom bridge APIs and middleware layers that allow legacy ERP or database systems to sync securely with modern web apps."
  },
  {
    "question": "How do you handle API rate limiting and high-volume traffic?",
    "answer": "We implement redis caching, message queues (RabbitMQ/Kafka), and automated retry logic to handle rate limits smoothly without service disruption."
  },
  {
    "question": "How is API authentication and security managed?",
    "answer": "We enforce OAuth 2.0, JWT tokens, API keys, SSL encryption, and IP whitelist policies to secure all data transmissions."
  },
  {
    "question": "Do you provide documentation and post-integration support?",
    "answer": "Yes, we provide OpenAPI (Swagger) documentation, Postman collections, and ongoing API monitoring and support."
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
            Custom API Development <br />
            <span className="text-orange-600">& Integration</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Connect databases, SaaS, and software components securely.
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
              Designing REST and GraphQL interfaces to securely synchronize databases, third-party applications, payment gateways, and custom script endpoints.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Our engineering systems verify page structures, data payloads, and query latency markers continuously. We align each workflow component with target speed and search metrics to drive measurable ROI.
            </p>
          </div>

          {/* Right Block: Benefits Checklist Card */}
          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <Terminal className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>

            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Secure OAuth & token-based data connections</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>High-throughput data transformation pipelines</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Custom GraphQL schema configurations</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Rate-limiting and request logging protection</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="API Integration Services FAQs"
        subtitle="Frequently asked questions about REST, GraphQL, and microservice connectors."
        faqs={API_INTEGRATION_FAQS}
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



