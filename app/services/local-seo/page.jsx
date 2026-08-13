import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, MapPin, Building, Star, Compass } from "lucide-react";

export const metadata = {
  title: "Local SEO Agency in India | Best Local SEO Services & Company in Delhi NCR",
  description:
    "Geetanjali Softwares is the best local SEO agency in India and top local SEO company in Delhi NCR & Noida. Dominate Google Maps 3-Pack and neighborhood search results with our local SEO services.",
  keywords:
    "local SEO agency, local SEO company, local SEO services, local SEO agency in India, best local SEO agency in India, SEO agency in Noida, SEO company in Delhi NCR, digital marketing agency in Noida",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/services/local-seo",
  },
  openGraph: {
    title: "Local SEO Agency in India | Best Local SEO Services & Company",
    description:
      "Dominate Google Maps local pack and high-intent regional searches with local SEO services from Geetanjali Softwares.",
    url: "https://geetanjalisoftwares.com/services/local-seo",
    type: "website",
  },
};


const LOCAL_SEO_FAQS = [
  {
    "question": "How does Local SEO help my local business in India / Delhi NCR?",
    "answer": "Local SEO ranks your Google Business Profile (GMB) in the top 3 Google Map pack results for local searches, driving direct calls and foot traffic."
  },
  {
    "question": "How long does it take to rank in the Google Maps 3-Pack?",
    "answer": "Noticeable map pack improvements and increased local call volumes generally appear within 30 to 60 days of optimization."
  },
  {
    "question": "What is included in your Local SEO service?",
    "answer": "We optimize Google Business Profiles, create local NAP citation listings, build geo-targeted landing pages, manage review generation, and track local ranking growth."
  },
  {
    "question": "Can you help multi-location businesses rank in different cities?",
    "answer": "Yes! We build dedicated location landing pages and manage multi-location GMB profiles across different cities and territories."
  },
  {
    "question": "Why is Google Business Profile optimization essential for local lead generation?",
    "answer": "Over 70% of local service inquiries happen directly on Google Maps without users ever visiting a website. High map visibility captures instant leads."
  }
];

export default function LocalSeoServicePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Local SEO Agency & Local Search Optimization Services",
    "description": "Premier local SEO agency in India providing Google Business Profile optimization, localized schema markup, review management, and local citation building in Delhi NCR, Noida, and across India.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Geetanjali Softwares",
      "url": "https://geetanjalisoftwares.com"
    },
    "areaServed": ["India", "Delhi NCR", "Noida", "Global"]
  };

  return (
    <main className="min-h-screen bg-white pt-24 text-left selection:bg-orange-500/20 selection:text-orange-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Header Area */}
      <section className="py-20 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <MapPin className="h-3.5 w-3.5 text-orange-600" /> Services / Local SEO Agency
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Best Local SEO Agency in India & <br />
            <span className="text-orange-600">Local SEO Company in Delhi NCR</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Dominate Google Maps local pack rankings and capture high-intent customers in your region. We are a leading <strong>local SEO company in Delhi NCR & Noida</strong> providing high-converting <strong>local SEO services in India</strong>.
          </p>
        </div>
      </section>

      {/* Scopes Grid */}
      <section className="py-16 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Capture regional customers searching &quot;near me&quot; instantly.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              As the <strong>best local SEO agency in India</strong>, we optimize your Google Business Profile (GBP), construct hyper-local citation networks, and implement localized JSON-LD schemas so nearby buyers find your business ahead of regional competitors.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              From multi-location service businesses to regional clinics, law firms, and retail storefronts, our <strong>local SEO services</strong> drive trackable phone calls, directions requests, and website conversions.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <Compass className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                Local SEO Deliverables Checklist
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Google Business Profile (GBP) 3-Pack Optimization</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Geo-Targeted Landing Page & Content Strategy</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Local Directory Citations & NAP Consistency Building</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Localized Structured Schema & Review Velocity Tools</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Local SEO Services FAQs"
        subtitle="Questions about ranking Google Maps (GMB) in India, Delhi NCR, & Noida."
        faqs={LOCAL_SEO_FAQS}
      />

      {/* CTA */}
      <section className="py-16 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Want to rank #1 on local search maps?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Connect with the premier <strong>local SEO agency in India</strong>. Get a free local ranking audit for your business today.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Get Local SEO Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
