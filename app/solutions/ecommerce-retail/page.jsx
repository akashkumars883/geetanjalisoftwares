import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "E-Commerce & Retail Technology Solutions | Geetanjali Softwares",
  description: "End-to-end e-commerce architectures for retail brands — from headless storefronts and product catalog optimization to logistics API integrations and multi-channel inventory management.",
  keywords: "ecommerce technology solutions, retail web development, headless Shopify, online store performance optimization, product catalog SEO",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"E-Commerce & Retail Technology Solutions","description":"End-to-end e-commerce architectures for retail brands — from headless storefronts and product catalog optimization to logistics API integrations and multi-channel inventory management.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const ECOMMERCE_RETAIL_FAQS = [
  {
    "question": "How do your retail e-commerce solutions boost sales?",
    "answer": "We build sub-second loading storefronts, personalized product recommendations, single-click checkout, and omnichannel inventory sync."
  },
  {
    "question": "Can you integrate physical POS store systems with online e-commerce?",
    "answer": "Yes, we connect physical POS systems (Shopify POS, Square, custom ERPs) with your online store for real-time inventory updates."
  },
  {
    "question": "How do you handle high-traffic flash sale events?",
    "answer": "Our headless serverless architecture auto-scales to handle thousands of concurrent checkout requests without server crashes."
  },
  {
    "question": "Can you build B2B wholesale e-commerce portals with custom pricing?",
    "answer": "Yes! We build B2B portals featuring tiered wholesale volume pricing, tax exemption logic, and PO invoice ordering."
  },
  {
    "question": "How long does a retail e-commerce transformation take?",
    "answer": "Complete retail digital transformations take 4 to 8 weeks depending on catalog size and integrations."
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
            E-Commerce & Retail <br />
            <span className="text-orange-600">Technology Solutions</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Engineering conversion-driven digital retail experiences.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-16 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Built for retail brands that compete online.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              End-to-end e-commerce architectures for retail brands — from headless storefronts and product catalog optimization to logistics API integrations and multi-channel inventory management.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Custom headless Shopify & WooCommerce storefronts</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Product schema markup for Google Shopping indexing</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Real-time inventory sync across all sales channels</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Localized checkout & multi-currency configurations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Retail & E-Commerce Solutions FAQs"
        subtitle="Questions about scaling retail stores and omnichannel digital commerce."
        faqs={ECOMMERCE_RETAIL_FAQS}
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


