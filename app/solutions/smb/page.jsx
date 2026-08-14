import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, Briefcase } from "lucide-react";

export const metadata = {
  title: "Small & Medium Business Web Solutions | Geetanjali Softwares",
  description: "Affordable, scalable, and search-optimized digital systems for small and medium businesses — including websites, CRM connections, local SEO, and automated lead capture flows.",
  keywords: "SMB web development, small business website design India, medium business CRM, local business SEO, affordable web solutions",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"Small & Medium Business Web Solutions","description":"Affordable, scalable, and search-optimized digital systems for small and medium businesses — including websites, CRM connections, local SEO, and automated lead capture flows.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const SMB_FAQS = [
  {
    "question": "Why is a modern custom website essential for small businesses in 2026?",
    "answer": "Over 85% of local customers research online before buying. A fast, professional site builds credibility and turns local searches into paying leads."
  },
  {
    "question": "How do your SMB solutions fit small business budgets?",
    "answer": "We offer fixed transparent pricing packages with zero surprise fees, allowing small businesses to get enterprise-quality web tech at accessible rates."
  },
  {
    "question": "Can you help our small business rank #1 in local search results?",
    "answer": "Yes, our Local SEO packages optimize your Google Business Profile and local keywords to get your business into the top 3 Google Map results."
  },
  {
    "question": "Will we be able to update our website content ourselves?",
    "answer": "Yes! We provide an easy-to-use CMS dashboard so you can edit services, post updates, and change photos without paying a developer."
  },
  {
    "question": "How quickly can a small business site be launched?",
    "answer": "Small business websites typically launch in 2 to 3 weeks."
  }
];

export default function SolutionPage() {
  return (
    <main className="min-h-screen bg-white pt-16 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Header */}
      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Solutions Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Small & Medium Business <br />
            <span className="text-orange-600">Web Solutions</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Professional digital presence built for growing businesses.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Helping SMBs compete with enterprise-level systems.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Affordable, scalable, and search-optimized digital systems for small and medium businesses — including websites, CRM connections, local SEO, and automated lead capture flows.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Professional 5-10 page fast-loading business websites</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Lead capture forms with CRM/email integrations</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Google Business Profile & local SEO optimizations</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Ongoing support & content management training</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Small Business (SMB) Solutions FAQs"
        subtitle="Questions about affordable web applications, local SEO, and digital growth for SMBs."
        faqs={SMB_FAQS}
      />

      {/* CTA */}
      <section className="py-10 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to build your custom solution?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Let our team design a tailored architecture that fits your industry, scale, and budget requirements.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Get a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


