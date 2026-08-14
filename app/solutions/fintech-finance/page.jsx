import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, TrendingUp } from "lucide-react";

export const metadata = {
  title: "FinTech & Finance Web Platform Development | Geetanjali Softwares",
  description: "Enterprise-grade financial dashboards, secure transaction pipelines, compliant data visualization systems, and SEO authority content strategies for banking and finance brands.",
  keywords: "fintech web development, finance dashboard development, secure banking portal, financial compliance web platform, investment website SEO",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"FinTech & Finance Web Platform Development","description":"Enterprise-grade financial dashboards, secure transaction pipelines, compliant data visualization systems, and SEO authority content strategies for banking and finance brands.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const FINTECH_FINANCE_FAQS = [
  {
    "question": "What security measures protect FinTech web applications?",
    "answer": "FinTech apps require bank-grade SSL encryption, multi-factor authentication (MFA), role-based permissions, and compliance with data regulations."
  },
  {
    "question": "Can you integrate KYC verification and banking APIs?",
    "answer": "Yes, we integrate third-party KYC verification APIs, bank account verification, credit score check APIs, and payment gateways."
  },
  {
    "question": "Do you build custom accounting or loan management portals?",
    "answer": "Yes, we build automated loan processing systems, invoice discounting portals, expense management tools, and financial dashboards."
  },
  {
    "question": "How do you handle audit logging for financial transactions?",
    "answer": "We build immutable transaction audit logs that track every financial action, user timestamp, and API request for full compliance."
  },
  {
    "question": "How long does a FinTech application project take?",
    "answer": "FinTech applications take 6 to 10 weeks depending on security audits, KYC integrations, and feature scope."
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
            FinTech & Finance Web <br />
            <span className="text-orange-600">Platform Development</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Secure, compliant digital finance portals and dashboards.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Building compliance-first systems for financial services.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Enterprise-grade financial dashboards, secure transaction pipelines, compliant data visualization systems, and SEO authority content strategies for banking and finance brands.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-md p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-white border border-stone-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Secure multi-factor authenticated finance dashboards</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Real-time financial data visualization components</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>SOC 2 & GDPR data compliance architectures</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Authority SEO content for finance product pages</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="FinTech & Finance Solutions FAQs"
        subtitle="Questions about secure financial apps, payment processing, and banking APIs."
        faqs={FINTECH_FINANCE_FAQS}
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


