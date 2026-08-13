import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, BarChart2 } from "lucide-react";

export const metadata = {
  title: "Business Intelligence & Analytics Dashboard Development | Geetanjali Softwares",
  description: "Custom BI dashboards, data pipeline architectures, KPI visualization tools, and automated reporting systems that connect databases, CRMs, and third-party analytics sources.",
  keywords: "business intelligence dashboard development, custom BI tool, KPI dashboard design, data visualization web app, analytics reporting automation",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"Business Intelligence & Analytics Dashboard Development","description":"Custom BI dashboards, data pipeline architectures, KPI visualization tools, and automated reporting systems that connect databases, CRMs, and third-party analytics sources.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const BUSINESS_INTELLIGENCE_FAQS = [
  {
    "question": "What is a custom Business Intelligence (BI) dashboard?",
    "answer": "A custom BI dashboard aggregates data from your sales, marketing, inventory, and accounting systems into a single real-time visual analytics hub."
  },
  {
    "question": "Can a BI dashboard connect to multiple data sources?",
    "answer": "Yes! We connect PostgreSQL, MySQL, Google Analytics, Shopify, Stripe, and third-party REST APIs into a unified dashboard."
  },
  {
    "question": "How often does the dashboard data update?",
    "answer": "Dashboards can update in real time or on scheduled cron intervals (hourly/daily) depending on your operational needs."
  },
  {
    "question": "Can we export reports to PDF or Excel formats?",
    "answer": "Yes, custom reporting modules allow one-click automated PDF/Excel exports and scheduled email reports to management."
  },
  {
    "question": "How long does it take to build a custom BI analytics platform?",
    "answer": "Custom BI dashboards take 3 to 5 weeks from data pipeline mapping to final user dashboard deployment."
  }
];

export default function SolutionPage() {
  return (
    <main className="min-h-screen bg-white pt-24 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Header */}
      <section className="py-20 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Solutions Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Business Intelligence & Analytics <br />
            <span className="text-orange-600">Dashboard Development</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Transform raw data into actionable business insights.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-16 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Data-driven decisions through real-time visual intelligence.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Custom BI dashboards, data pipeline architectures, KPI visualization tools, and automated reporting systems that connect databases, CRMs, and third-party analytics sources.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <BarChart2 className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Custom KPI dashboards with real-time data feeds</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Multi-source database integration pipelines</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Automated scheduled reporting & export modules</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Role-based access for team-specific data views</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Business Intelligence Solutions FAQs"
        subtitle="Questions about custom analytics dashboards and data visualization."
        faqs={BUSINESS_INTELLIGENCE_FAQS}
      />

      {/* CTA */}
      <section className="py-16 bg-stone-50 px-6">
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


