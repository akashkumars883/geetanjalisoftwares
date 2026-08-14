import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, Rocket } from "lucide-react";

export const metadata = {
  title: "Startup MVP & Product Development | Geetanjali Softwares",
  description: "Rapid MVP product engineering for early-stage startups — from validated feature scopes and database blueprints to production-ready deployments with investor-grade documentation.",
  keywords: "MVP development startup, rapid product development, startup SaaS web app, Next.js MVP engineer, product launch services",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"Startup MVP & Product Development","description":"Rapid MVP product engineering for early-stage startups — from validated feature scopes and database blueprints to production-ready deployments with investor-grade documentation.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const STARTUPS_MVP_FAQS = [
  {
    "question": "What is an MVP (Minimum Viable Product)?",
    "answer": "An MVP is a streamlined, core-feature version of your software product built to validate your idea with real users and attract investor funding quickly."
  },
  {
    "question": "How fast can Geetanjali Softwares build an MVP for a startup?",
    "answer": "We specialize in rapid startup execution, delivering production-ready MVPs in 4 to 6 weeks."
  },
  {
    "question": "Which tech stack do you recommend for startup MVPs?",
    "answer": "We recommend Next.js, TypeScript, Tailwind CSS, and Supabase / PostgreSQL for sub-second speeds, low server costs, and instant scaling."
  },
  {
    "question": "Will the MVP codebase be ready to scale after seed funding?",
    "answer": "Yes! We write clean, modular enterprise-grade code so you don't have to rewrite your app when scaling from 100 to 100,000 users."
  },
  {
    "question": "Do founders retain 100% intellectual property and code ownership?",
    "answer": "Yes, founders retain 100% full IP and code ownership upon completion. All GitHub repositories are transferred to your team."
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Solutions Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Startup MVP & <br />
            <span className="text-orange-600">Product Development</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Ship fast. Validate early. Scale confidently.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Built for founders who need to ship fast.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Rapid MVP product engineering for early-stage startups — from validated feature scopes and database blueprints to production-ready deployments with investor-grade documentation.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-md p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-white border border-stone-100 flex items-center justify-center">
                <Rocket className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Scoped feature-set MVP planning & architecture</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Rapid 4-6 week production-ready deployments</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Scalable database & API foundations from day one</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Investor pitch deck technical documentation support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Startup & MVP Solutions FAQs"
        subtitle="Questions about building fast, scalable Minimum Viable Products for founders."
        faqs={STARTUPS_MVP_FAQS}
      />

      {/* CTA */}
      <section className="py-10 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-md p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-md blur-3xl pointer-events-none" />
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
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


