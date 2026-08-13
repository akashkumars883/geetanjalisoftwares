import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, LineChart, ShieldCheck, Globe, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Best SEO Company in India | SEO Agency & White Label SEO Reseller Services",
  description:
    "Geetanjali Softwares is the best SEO company in India and leading SEO agency in Delhi NCR & Noida. We offer result-oriented SEO services in India, local SEO, and white label SEO reseller programs.",
  keywords:
    "SEO company, SEO agency, SEO company in India, SEO agency in India, best SEO company in India, SEO services, SEO services in India, SEO company in Delhi NCR, SEO agency in Noida, SEO reseller services, SEO reseller company, SEO reseller program, SEO reseller services in India, white label SEO services, white label SEO company",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/services/seo",
  },
  openGraph: {
    title: "Best SEO Company in India | SEO Agency & White Label SEO Reseller Services",
    description:
      "Premier SEO agency in India & Delhi NCR providing SEO services, link authority building, e-commerce SEO, and white label SEO reseller programs.",
    url: "https://geetanjalisoftwares.com/services/seo",
    type: "website",
  },
};


const SEO_FAQS = [
  {
    "question": "Why is Geetanjali Softwares considered a top SEO company in India?",
    "answer": "We combine technical search audits, data-driven keyword mapping, link authority building, and transparent monthly ROI reporting."
  },
  {
    "question": "How does your White Label SEO reseller program work for agencies?",
    "answer": "Agencies resell our SEO packages under their brand. We execute audits, link building, and content while delivering 100% unbranded white-label reports."
  },
  {
    "question": "What is the difference between On-Page, Off-Page, and Technical SEO?",
    "answer": "On-Page optimizes content and keywords; Technical SEO fixes site speed, crawling, and schema; Off-Page builds high-authority external backlinks."
  },
  {
    "question": "Do you use safe White-Hat SEO techniques?",
    "answer": "Yes, 100% White-Hat practices adhering strictly to Google Webmaster Guidelines to ensure long-term rank stability."
  },
  {
    "question": "What reporting do clients and reseller agencies receive?",
    "answer": "You receive detailed monthly reports tracking organic keyword positions, search impression growth, backlink acquisition, and traffic analytics."
  }
];

export default function SeoServicePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Search Engine Optimization & White Label SEO Reseller Services",
    "description": "Geetanjali Softwares is a top-rated SEO company in India offering enterprise SEO services, local SEO, white label SEO reseller programs, and technical search auditing.",
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
            <Globe className="h-3.5 w-3.5 text-orange-600" /> Services / Search Engine Optimization
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Best SEO Company in India & <br />
            <span className="text-orange-600">White Label SEO Reseller Agency</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Geetanjali Softwares is a premier <strong>SEO agency in India</strong>, <strong>Delhi NCR</strong>, and <strong>Noida</strong>. We deliver high-ROI <strong>SEO services in India</strong> and flexible <strong>white label SEO reseller programs</strong> for agencies worldwide.
          </p>
        </div>
      </section>

      {/* Detailed Description Grid */}
      <section className="py-16 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Block */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Rank #1 on Google with the best SEO agency in India.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              As a leading <strong>SEO company in India</strong>, we combine data-driven search keyword intent mapping, technical site architecture audits, competitor gap analyses, and high-authority link acquisition to secure top organic positions for high-value business terms.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Whether you are looking for an <strong>SEO company in Delhi NCR</strong>, an <strong>SEO agency in Noida</strong>, or an enterprise partner to scale your national search authority, our engineering approach delivers sustainable revenue growth.
            </p>
          </div>

          {/* Right Block: Deliverables */}
          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <LineChart className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                Full-Service SEO Deliverables
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Commercial & Intent Keyword Opportunity Mapping</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>On-Page Technical SEO & Schema Markup Audits</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Competitor Backlink Audits & Authority Link Acquisition</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Transparent Monthly Keyword Ranking & Traffic Reports</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEO Reseller & White Label Section */}
      <section className="py-16 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-stone-900">
              White Label SEO Reseller Services for Agencies
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Scale your agency fulfillment without hiring in-house teams. Our <strong>white label SEO services</strong> and <strong>SEO reseller program in India</strong> enable digital agencies in the US, UK, and India to deliver world-class client results under their own brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "White Label SEO Company",
                desc: "100% unbranded client reports, audit deliverables, and keyword dashboards branded with your agency logo.",
              },
              {
                title: "SEO Reseller Program",
                desc: "Flexible wholesale pricing models allowing high margins for digital marketing agencies, web design firms, and freelancers.",
              },
              {
                title: "Dedicated Account Managers",
                desc: "Direct access to senior SEO strategists in India for technical audit consultations and campaign strategy.",
              },
            ].map((reseller, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-stone-200 space-y-4">
                <ShieldCheck className="h-8 w-8 text-orange-600" />
                <h3 className="text-lg font-bold text-stone-900">{reseller.title}</h3>
                <p className="text-xs text-stone-600 font-light leading-relaxed">{reseller.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="SEO Services & Reseller FAQs"
        subtitle="Questions about ranking #1 on Google and White Label SEO programs."
        faqs={SEO_FAQS}
      />

      {/* Contact Trigger Block */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to dominate search rankings?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Get a free SEO audit from the <strong>best SEO company in India</strong>. Explore our direct client SEO plans or <strong>white label SEO reseller services</strong> today.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Get Free SEO Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
