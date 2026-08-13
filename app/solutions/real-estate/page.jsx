import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, Home } from "lucide-react";

export const metadata = {
  title: "Real Estate & Property Web Solutions | Geetanjali Softwares",
  description: "Custom property listing portals, geo-targeted neighborhood landing pages, dynamic MLS/property database integrations, and location SEO campaigns built for real estate agencies.",
  keywords: "real estate web development, property listing portal, MLS database integration, real estate SEO, neighborhood landing pages",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"Real Estate & Property Web Solutions","description":"Custom property listing portals, geo-targeted neighborhood landing pages, dynamic MLS/property database integrations, and location SEO campaigns built for real estate agencies.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const REAL_ESTATE_FAQS = [
  {
    "question": "What features make a great real estate property portal?",
    "answer": "Key features include advanced location/budget search filters, interactive map integration, 360 virtual tour embeds, instant WhatsApp inquiry buttons, and lead routing."
  },
  {
    "question": "Can the real estate portal capture and route leads automatically?",
    "answer": "Yes! Inquiries auto-assign to specific property agents based on location, budget, or property type with instant WhatsApp alerts."
  },
  {
    "question": "Can agents manage property listings directly from a mobile dashboard?",
    "answer": "Yes, real estate agents get an easy mobile admin panel to upload photos, update pricing, and mark properties as sold."
  },
  {
    "question": "Do you integrate Google Maps and property location amenities?",
    "answer": "Yes, we integrate Google Maps API to display nearby schools, hospitals, metro stations, and local neighborhood highlights."
  },
  {
    "question": "How long does a custom real estate portal build take?",
    "answer": "Custom real estate websites and property CRMs take 3 to 5 weeks to launch."
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
            Real Estate & Property <br />
            <span className="text-orange-600">Web Solutions</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            High-performance property portals that convert buyers.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-16 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Helping property businesses attract and convert buyers.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Custom property listing portals, geo-targeted neighborhood landing pages, dynamic MLS/property database integrations, and location SEO campaigns built for real estate agencies.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <Home className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Dynamic MLS & property database API integrations</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Geo-targeted neighborhood and city landing pages</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Advanced map-based property search interfaces</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Local SEO for broker and agent profile ranking</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Real Estate & Property Solutions FAQs"
        subtitle="Questions about property portals, real estate CRMs, and lead capture."
        faqs={REAL_ESTATE_FAQS}
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


