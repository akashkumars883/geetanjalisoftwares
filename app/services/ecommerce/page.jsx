import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, ShoppingCart, Layers, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "E-Commerce Development Company in India | Headless E-Commerce Services",
  description:
    "Geetanjali Softwares is a premier ecommerce development company in India offering headless ecommerce development services, custom Next.js storefronts, Shopify integrations, and payment gateway setups.",
  keywords:
    "ecommerce development company, ecommerce development services, ecommerce development company in India, headless ecommerce development, website development company in India, ecommerce SEO agency",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/services/ecommerce",
  },
  openGraph: {
    title: "E-Commerce Development Company in India | Headless E-Commerce Services",
    description:
      "Build high-speed, sub-second headless e-commerce storefronts with an elite ecommerce development company in India.",
    url: "https://geetanjalisoftwares.com/services/ecommerce",
    type: "website",
  },
};


const ECOMMERCE_FAQS = [
  {
    "question": "What e-commerce platforms do you build with?",
    "answer": "We specialize in Headless Commerce using Next.js combined with Shopify Storefront API, Medusa.js, Swell, or custom PostgreSQL backends."
  },
  {
    "question": "What payment gateways can be integrated?",
    "answer": "We integrate Razorpay, Stripe, PayPal, Cashfree, UPI, Apple Pay, and credit/debit card checkout flows."
  },
  {
    "question": "How do you ensure fast checkout and low cart abandonment?",
    "answer": "By leveraging sub-second headless page loads, single-step streamlined checkout UX, and automated abandoned cart email triggers."
  },
  {
    "question": "Can the online store sync with inventory management tools?",
    "answer": "Yes, we build real-time inventory API sync between your online store, warehouse, and accounting software."
  },
  {
    "question": "How long does it take to launch a custom e-commerce store?",
    "answer": "Standard e-commerce storefronts take 3 to 5 weeks, while enterprise catalogs take 6 to 8 weeks."
  }
];

export default function EcommerceServicePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "E-Commerce Development Services",
    "description": "Leading ecommerce development company in India providing headless Next.js storefronts, custom checkout pipelines, Shopify Storefront API integrations, and mobile conversion optimization.",
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

      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <ShoppingCart className="h-3.5 w-3.5 text-orange-600" /> Services / E-Commerce Development
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            E-Commerce Development Company in India & <br />
            <span className="text-orange-600">Headless Storefront Engineering</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Engineered for high conversion rates and sub-second page speeds. We are a premier <strong>ecommerce development company in India</strong> delivering modern <strong>ecommerce development services</strong> for scaling D2C brands and global online retailers.
          </p>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Headless Next.js storefronts that load in under 1 second.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              As a specialized <strong>ecommerce development company</strong>, we decouple your frontend UI from backend CMS databases, giving your customers instant page transitions, custom cart workflows, and seamless payment integrations (UPI, Razorpay, Stripe).
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Our <strong>ecommerce development services in India</strong> include built-in product schema markup, faceted search URL canonicalization, and technical SEO structure to maximize organic traffic and sales.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-md p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-white border border-stone-100 flex items-center justify-center">
                <Layers className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                E-Commerce Development Deliverables
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Headless Next.js App Router Storefront Development</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Shopify Storefront API & WooCommerce Integration</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>UPI, Razorpay, Paytm & Global Stripe Payment Setup</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Built-in E-Commerce Product Schema & SEO Architecture</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-10 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-md p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to launch your high-converting online store?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Connect with the leading <strong>ecommerce development company in India</strong>. Request a project proposal today.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Request Store Proposal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    
      {/* FAQ Section */}
      <FaqSection
        title="E-Commerce Development FAQs"
        subtitle="Questions about headless e-commerce, custom storefronts, and payment gateways."
        faqs={ECOMMERCE_FAQS}
      />
    </main>
  );
}
