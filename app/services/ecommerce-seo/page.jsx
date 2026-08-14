import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, ShoppingBag, TrendingUp, Tag, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "E-Commerce SEO Agency in India | Best E-Commerce SEO Services & Company",
  description:
    "Geetanjali Softwares is the best ecommerce SEO agency in India. We offer specialized ecommerce SEO services, product page optimization, category rank growth, and schema markup for Shopify, Next.js, and WooCommerce storefronts.",
  keywords:
    "ecommerce SEO agency, ecommerce SEO services, ecommerce SEO company, ecommerce SEO agency in India, best ecommerce SEO agency, ecommerce development company in India",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/services/ecommerce-seo",
  },
  openGraph: {
    title: "E-Commerce SEO Agency in India | Best E-Commerce SEO Services",
    description:
      "Drive organic sales, rank product category pages, and scale organic revenue with ecommerce SEO services from Geetanjali Softwares.",
    url: "https://geetanjalisoftwares.com/services/ecommerce-seo",
    type: "website",
  },
};


const ECOMMERCE_SEO_FAQS = [
  {
    "question": "How is E-Commerce SEO different from standard website SEO?",
    "answer": "E-Commerce SEO focuses on optimizing thousands of SKU product pages, category facets, Product schema markup, internal linking, and transactional keywords."
  },
  {
    "question": "How do you handle duplicate content on dynamic product filters?",
    "answer": "We implement strict canonical tagging, canonical parameter handling, clean URL rewrites, and robots directive rules to prevent duplicate indexing."
  },
  {
    "question": "How soon can an online store expect organic sales growth?",
    "answer": "Measurable category keyword ranking gains and organic revenue improvements typically begin within 60 to 90 days."
  },
  {
    "question": "Do you optimize Product schema markup for Google Shopping?",
    "answer": "Yes, we implement structured Product, Offer, AggregateRating, and InStock JSON-LD schemas so products display rich price/review badges in search results."
  },
  {
    "question": "Can you optimize Shopify or WooCommerce stores for SEO?",
    "answer": "Yes! We work with Shopify, WooCommerce, Magento, and custom headless Next.js e-commerce architectures."
  }
];

export default function EcommerceSeoPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "E-Commerce SEO Services & Category Optimization",
    "description": "Premier ecommerce SEO agency in India providing product schema markup, facet navigation SEO, technical crawl optimization, and organic sales scaling.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Geetanjali Softwares",
      "url": "https://geetanjalisoftwares.com"
    },
    "areaServed": ["India", "United States", "Global"]
  };

  return (
    <main className="min-h-screen bg-white pt-16 text-left selection:bg-orange-500/20 selection:text-orange-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Header Area */}
      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <ShoppingBag className="h-3.5 w-3.5 text-orange-600" /> Services / E-Commerce SEO Agency
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Best E-Commerce SEO Agency in India & <br />
            <span className="text-orange-600">Online Store Growth Services</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Turn search intent into high-margin online sales. We are a specialized <strong>ecommerce SEO company in India</strong> delivering high-converting <strong>ecommerce SEO services</strong> for Shopify, Custom Next.js, and WooCommerce brands.
          </p>
        </div>
      </section>

      {/* Description Grid */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Rank high-intent product & category pages #1.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              As the <strong>best ecommerce SEO agency</strong>, we engineer product schema markup, optimize faceted navigation filters to avoid duplicate content penalties, and build category authority that drives recurring organic purchase traffic.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Whether you are an established D2C brand or scaling an international store, our <strong>ecommerce SEO agency in India</strong> ensures sub-second page performance combined with top search visibility.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                E-Commerce SEO Capabilities
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Product & Category Keyword Ranking Architecture</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Product Structured JSON-LD & Rich Snippets Setup</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Faceted Navigation & Canonical URL Audit</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Page Speed & Mobile Core Web Vitals Optimization</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="E-Commerce SEO Services FAQs"
        subtitle="Questions about ranking product catalogs, category pages, and driving sales."
        faqs={ECOMMERCE_SEO_FAQS}
      />

      {/* CTA */}
      <section className="py-10 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to grow your e-commerce organic sales?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Connect with the premier <strong>ecommerce SEO agency in India</strong>. Get a technical store SEO strategy today.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Get Store SEO Strategy
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
