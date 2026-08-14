import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, Share2, Megaphone, Target, BarChart2 } from "lucide-react";

export const metadata = {
  title: "Digital Marketing Agency in India & Delhi NCR | Performance & Social Media Marketing",
  description:
    "Geetanjali Softwares is a top digital marketing agency in India, Delhi NCR & Noida. We provide performance marketing company services, social media marketing services, content strategy, and paid acquisition management.",
  keywords:
    "digital marketing agency, digital marketing company, digital marketing agency in India, digital marketing company in India, best digital marketing agency in India, digital marketing company in Delhi NCR, digital marketing agency in Noida, performance marketing agency, performance marketing company, performance marketing agency in India, performance marketing company in Delhi NCR, social media marketing agency, social media marketing company, social media marketing services, social media marketing agency in India",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/services/content-strategist",
  },
  openGraph: {
    title: "Digital Marketing Agency in India & Delhi NCR | Performance Marketing Services",
    description:
      "Full-funnel performance marketing company, social media marketing agency, and digital marketing services in India & Delhi NCR.",
    url: "https://geetanjalisoftwares.com/services/content-strategist",
    type: "website",
  },
};


const CONTENT_STRATEGIST_FAQS = [
  {
    "question": "What does your content strategy service include?",
    "answer": "We deliver keyword search intent research, topic cluster planning, competitor content gap analysis, high-converting copy, and monthly editorial calendars."
  },
  {
    "question": "How do you ensure content ranks high on Google and AI Search?",
    "answer": "We optimize content using semantic keyword clustering, structured schema markup, authoritative sources, and EEAT principles designed for AI Overviews."
  },
  {
    "question": "Who writes the content for our business?",
    "answer": "Our senior technical writers and SEO strategists craft original, engaging, and industry-accurate copy tailored to your brand voice."
  },
  {
    "question": "Can you revamp existing low-performing blog posts and landing pages?",
    "answer": "Yes! We conduct content audits to refresh outdated copy, add target commercial keywords, and improve structure for higher conversion."
  },
  {
    "question": "How do you measure the ROI of content marketing?",
    "answer": "We track search impressions, organic keyword ranking growth, lead conversion rates, and user session duration using Google Analytics 4."
  }
];

export default function PerformanceMarketingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digital Marketing, Performance Marketing & Social Media Marketing Services",
    "description": "Premier digital marketing agency in India & Delhi NCR offering performance marketing company services, social media marketing services, paid search campaigns, and content growth strategies.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Geetanjali Softwares",
      "url": "https://geetanjalisoftwares.com"
    },
    "areaServed": ["India", "Delhi NCR", "Noida", "Global"]
  };

  return (
    <main className="min-h-screen bg-white pt-16 text-left selection:bg-orange-500/20 selection:text-orange-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <Megaphone className="h-3.5 w-3.5 text-orange-600" /> Services / Digital & Performance Marketing
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Best Digital Marketing Agency in India & <br />
            <span className="text-orange-600">Performance Marketing Company</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Geetanjali Softwares is a results-driven <strong>digital marketing company in India</strong>, <strong>Delhi NCR</strong>, and <strong>Noida</strong>. We deliver high-ROI <strong>performance marketing company services</strong> and targeted <strong>social media marketing services</strong>.
          </p>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Scale client acquisition with data-backed performance campaigns.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              As a top <strong>performance marketing agency in India</strong> and <strong>performance marketing company in Delhi NCR</strong>, we optimize Google Ads, Meta Ads (Instagram/Facebook), and LinkedIn campaigns for maximum ROAS (Return on Ad Spend) and lowest CAC (Customer Acquisition Cost).
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Our <strong>social media marketing agency in India</strong> builds brand authority through creative ad creatives, audience targeting, funnel retargeting, and conversion analytics.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                Digital Marketing Capabilities
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Performance Marketing & Paid Search (Google PPC)</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Social Media Marketing Services (Meta, LinkedIn, YouTube)</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Conversion Rate Optimization (CRO) & Funnel Audits</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Full-Funnel Content Marketing & Analytics Telemetry</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-10 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to accelerate your paid lead generation & sales?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Connect with the premier <strong>digital marketing agency in Noida & Delhi NCR</strong>. Get a performance marketing audit today.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Get Marketing Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    
      {/* FAQ Section */}
      <FaqSection
        title="Content Marketing & Strategy FAQs"
        subtitle="Questions about SEO content planning, performance copy, and editorial calendars."
        faqs={CONTENT_STRATEGIST_FAQS}
      />
    </main>
  );
}
