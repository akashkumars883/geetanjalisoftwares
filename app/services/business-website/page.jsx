import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Globe, MapPin, Compass, ArrowRight, ShieldCheck, Zap, Code } from "lucide-react";

export const metadata = {
  title: "Website Development Company in India & USA | Website Design Services",
  description:
    "Geetanjali Softwares is a top website development company in India & USA and premier website design company offering custom Next.js web design services, local SEO setups, and global enterprise platforms.",
  keywords:
    "website design company, website development company, website design company in India, website development company in India, web design services, web development services, website development company in USA, digital marketing agency in India",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/services/business-website",
  },
  openGraph: {
    title: "Website Development Company in India & USA | Website Design Services",
    description:
      "Get SEO-optimized custom web development services from a leading website design company in India & USA.",
    url: "https://geetanjalisoftwares.com/services/business-website",
    type: "website",
  },
};


const BUSINESS_WEBSITE_FAQS = [
  {
    "question": "Why should we choose custom Next.js development over WordPress?",
    "answer": "Custom Next.js websites load up to 10x faster, offer unshakeable security against plugin hacks, deliver perfect Lighthouse Core Web Vitals, and scale effortlessly."
  },
  {
    "question": "Are your business websites mobile-responsive and SEO-optimized?",
    "answer": "Yes, 100%! Every site is built mobile-first with structured JSON-LD schemas, canonical tags, open graph cards, and sub-second load speeds."
  },
  {
    "question": "Can we manage and update content easily without coding?",
    "answer": "Yes, we integrate user-friendly headless CMS solutions (Sanity, Strapi, or Supabase admin dashboards) so your team can update text and images easily."
  },
  {
    "question": "How long does a business website project take from start to launch?",
    "answer": "Standard business websites take 2 to 4 weeks depending on page count, custom animations, and integrations."
  },
  {
    "question": "Do you provide hosting and maintenance support?",
    "answer": "Yes, we deploy on global high-speed edge networks (Vercel, AWS Cloudflare) and offer ongoing technical maintenance plans."
  }
];

export default function BusinessWebsitePage() {
  const scopes = [
    {
      title: "Local Market Web Design",
      icon: <MapPin className="h-6 w-6 text-orange-600" />,
      tagline: "Dominate regional discovery.",
      description: "Optimized specifically for local business presence. As a top website design company in India, we integrate local business schemas, Google Maps pack setups, and regional landing pages to capture nearby customers.",
      benefits: [
        "Google Maps & Local Pack optimization",
        "Local business schema & review widgets",
        "Mobile-first responsive speed optimization",
        "Neighborhood-focused landing pages"
      ],
    },
    {
      title: "India National Expansion",
      icon: <Compass className="h-6 w-6 text-orange-600" />,
      tagline: "Capture the diverse Indian market.",
      description: "Built for speed across Indian tier-1 and tier-2 cities. As a leading website development company in India, we implement edge caching, integrate UPI/Razorpay payment gateways, and support multi-lingual configurations.",
      benefits: [
        "UPI, Razorpay & Paytm gateway integrations",
        "Multi-city speed optimization & edge caches",
        "Multi-lingual options (Hindi, Tamil, etc.)",
        "Domestic logistics API synchronization"
      ],
    },
    {
      title: "Global Enterprise Architecture (USA & EU)",
      icon: <Globe className="h-6 w-6 text-orange-600" />,
      tagline: "Scale globally with headless speed.",
      description: "Engineered for international audiences. Serving as a trusted website development company in USA and global markets, we build headless Next.js platforms, global CDN setups, and multi-currency compliance.",
      benefits: [
        "Global CDN distribution (Cloudflare Edge)",
        "International SEO structures (hreflang tags)",
        "Multi-currency & localized tax calculators",
        "GDPR & CCPA security compliance audits"
      ],
    },
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website Development & Web Design Services in India and USA",
    "description": "Geetanjali Softwares is a top website development company in India & USA providing custom web design services, Next.js web applications, and SEO-optimized business websites.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Geetanjali Softwares",
      "url": "https://geetanjalisoftwares.com"
    },
    "areaServed": [
      "India",
      "United States",
      "Global"
    ]
  };

  return (
    <main className="min-h-screen bg-white pt-16 text-left selection:bg-orange-500/20 selection:text-orange-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero Header Section */}
      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <Code className="h-3.5 w-3.5 text-orange-600" /> Services / Website Development Company
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Website Development Company in <br />
            <span className="text-orange-600">India & USA – Custom Web Design</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Geetanjali Softwares is a premier <strong>website design company in India</strong> and <strong>website development company in USA</strong>. We deliver custom <strong>web development services</strong> tailored for high performance, conversion rate optimization, and search engine authority.
          </p>
        </div>
      </section>

      {/* Market Scopes Grid */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-stone-900">
              Web design services engineered for scalable business growth.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              We specialize in custom web development services for regional businesses in India, national brands, and international enterprises across the US and Europe.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {scopes.map((scope, index) => (
              <article
                key={index}
                className="bg-white border border-stone-100 rounded-xl p-8 flex flex-col justify-between hover:border-stone-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="h-12 w-12 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center">
                    {scope.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-stone-900">{scope.title}</h3>
                    <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider">{scope.tagline}</div>
                  </div>

                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {scope.description}
                  </p>

                  <ul className="space-y-2.5 pt-2 border-t border-stone-50">
                    {scope.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <Zap className="h-3.5 w-3.5 text-orange-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Action Card */}
      <section className="py-10 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to build your custom business platform?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Partner with the top <strong>website development company in India & USA</strong>. Get a technical architecture proposal today.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Start Web Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    
      {/* FAQ Section */}
      <FaqSection
        title="Business Website Development FAQs"
        subtitle="Questions about custom business websites in India & USA."
        faqs={BUSINESS_WEBSITE_FAQS}
      />
    </main>
  );
}
