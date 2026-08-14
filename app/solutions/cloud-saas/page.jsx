import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, Cloud } from "lucide-react";

export const metadata = {
  title: "Cloud SaaS Platform Development | Geetanjali Softwares",
  description: "Full-cycle SaaS product engineering — from multi-tenant database architecture and subscription billing to usage analytics, role-based admin dashboards, and white-labeling systems.",
  keywords: "cloud SaaS development, multi-tenant SaaS platform, subscription billing integration, SaaS MVP engineer, white-label SaaS product development",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"Cloud SaaS Platform Development","description":"Full-cycle SaaS product engineering — from multi-tenant database architecture and subscription billing to usage analytics, role-based admin dashboards, and white-labeling systems.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const CLOUD_SAAS_FAQS = [
  {
    "question": "What is multi-tenant SaaS architecture?",
    "answer": "Multi-tenant architecture allows thousands of customer accounts (tenants) to run on a shared cloud database while maintaining complete data isolation."
  },
  {
    "question": "How do you handle subscription billing for SaaS products?",
    "answer": "We integrate Stripe Billing or Razorpay Subscriptions supporting monthly/annual plans, free trials, tiered usage pricing, and automated invoices."
  },
  {
    "question": "Can you help us build an MVP SaaS product quickly?",
    "answer": "Yes, we specialize in launching production-ready SaaS MVPs in 6 to 8 weeks using Next.js and Supabase."
  },
  {
    "question": "How is user authentication and tenant security managed?",
    "answer": "We implement OAuth, Magic Links, MFA, and database Row Level Security (RLS) to ensure zero data leakage between tenants."
  },
  {
    "question": "What cloud providers do you deploy SaaS applications on?",
    "answer": "We deploy on Vercel Edge, AWS (Lambda, ECS, RDS), Cloudflare, and DigitalOcean."
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
            Cloud SaaS <br />
            <span className="text-orange-600">Platform Development</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Engineering multi-tenant SaaS products built to scale.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              From MVP to enterprise-grade SaaS product.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Full-cycle SaaS product engineering — from multi-tenant database architecture and subscription billing to usage analytics, role-based admin dashboards, and white-labeling systems.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-md p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-white border border-stone-100 flex items-center justify-center">
                <Cloud className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Multi-tenant architecture with tenant isolation</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Stripe billing & subscription plan management</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Usage tracking & per-tenant analytics dashboards</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>White-label branding & custom domain support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Cloud SaaS Platform FAQs"
        subtitle="Questions about building multi-tenant SaaS platforms and cloud software."
        faqs={CLOUD_SAAS_FAQS}
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


