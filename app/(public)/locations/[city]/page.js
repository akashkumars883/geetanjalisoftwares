import React from 'react';
import { 
  Globe, 
  MapPin, 
  CheckCircle, 
  Sparkles, 
  Award, 
  Users, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';
import PopupForm from "@/components/PopupForm";
import ProjectEstimator from "@/components/ProjectEstimator";
import SEOSimulator from "@/components/SEOSimulator";
import ConsultationScheduler from "@/components/ConsultationScheduler";
import ContactFormSection from "@/components/ContactFormSection";

// 1. Dynamic Meta Title & Description generation for every city
export async function generateMetadata({ params }) {
  const { city } = await params;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ');

  return {
    title: `Best Web Development & SEO Company in ${cityName} | Geetanjali Softwares`,
    description: `Looking for top website design, custom software, or dynamic SEO services in ${cityName}, India? Partner with Geetanjali Softwares for high-performance responsive web setups.`,
    keywords: `web development in ${city}, website designers ${city}, seo agency ${city}, custom software development ${city}, digital marketing ${city}`,
  };
}

export default async function LocationPage({ params }) {
  const { city } = await params;
  
  const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ');

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `https://www.geetanjalisoftwares.in/locations/${city}#service`,
        "name": `Geetanjali Softwares ${cityName}`,
        "image": "https://www.geetanjalisoftwares.in/images/logo.png",
        "url": `https://www.geetanjalisoftwares.in/locations/${city}`,
        "telephone": "+917508657479",
        "priceRange": "₹₹",
        "founder": {
          "@type": "Person",
          "name": "Akash",
          "url": "https://www.geetanjalisoftwares.in/about"
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": cityName === "Patna" ? "Bihar" : (cityName === "Faridabad" ? "Haryana" : (cityName === "Delhi NCR" ? "Delhi" : "State")),
          "addressLocality": cityName
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://www.geetanjalisoftwares.in/locations/${city}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Can you develop custom websites for businesses in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes! Although we operate globally, we have a dedicated digital project delivery model for businesses in ${cityName}. All communication, reviews, and revisions are carried out online via Google Meet/Zoom, phone calls, and direct WhatsApp updates.`
            }
          },
          {
            "@type": "Question",
            "name": `How long will it take to rank on Google for localized searches in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `For localized terms (e.g. "website designer in ${city}"), you can expect to see Page-1 results within 60 to 90 days of launch, thanks to our pre-optimized SEO page structures and structured data setups.`
            }
          },
          {
            "@type": "Question",
            "name": `Do you offer support and maintenance services after launching the website?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Absolutely. We provide dedicated support and maintenance packages (including monthly updates, security patch updates, and continuous optimization metrics) starting from ₹1,500/month.`
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <PopupForm />

      {/* Localized Premium Hero Banner */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-transparent sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-600 mb-6">
            <MapPin size={12} />
            Best Digital Partner in {cityName}
          </div>
          
          <h1 className="text-4xl font-normal tracking-tight text-slate-900 sm:text-6xl max-w-4xl mx-auto leading-[1.15]">
            Top Website Development & SEO Company in <span className="text-orange-600">{cityName}</span>
          </h1>
          
          <p className="mt-6 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Geetanjali Softwares delivers high-performance custom website designs, responsive software development, and ROI-driven SEO campaigns designed specifically to scale businesses in {cityName}.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 border border-black/5 flex items-center gap-3 text-left">
              <Award className="text-orange-600 shrink-0" size={18} />
              <div>
                <span className="block text-xs font-semibold text-slate-900">A-Grade UI/UX</span>
                <span className="block text-[10px] text-slate-400">Tailored designs</span>
              </div>
            </div>
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-black/5 flex items-center gap-3 text-left">
              <TrendingUp className="text-orange-600 shrink-0" size={18} />
              <div>
                <span className="block text-xs font-semibold text-slate-900">SEO Optimized</span>
                <span className="block text-[10px] text-slate-400">Guaranteed reach</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-black/5 flex items-center gap-3 text-left">
              <Users className="text-orange-600 shrink-0" size={18} />
              <div>
                <span className="block text-xs font-semibold text-slate-900">Local Support</span>
                <span className="block text-[10px] text-slate-400">Dedicated manager</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-black/5 flex items-center gap-3 text-left">
              <ShieldCheck className="text-orange-600 shrink-0" size={18} />
              <div>
                <span className="block text-xs font-semibold text-slate-900">Secure Platforms</span>
                <span className="block text-[10px] text-slate-400">Direct Meta APIs</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Local Problem & Solution Context block */}
      <section className="py-16 relative overflow-hidden bg-transparent">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
          <div className="rounded-[32px] border border-black/5 bg-slate-50 p-6 sm:p-10 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-left">
                <span className="text-[10px] uppercase font-semibold text-orange-600 tracking-wider">Local Challenges</span>
                <h2 className="text-xl font-normal text-slate-900 text-left">Why {cityName} Businesses Lose Online Leads?</h2>
                <p className="text-xs text-slate-500 leading-relaxed text-left">
                  Many businesses in {cityName} invest in slow WordPress templates that load slowly and fail to convert visitors into inquiries. With modern core web vitals, speed and professional aesthetics are critical to ranking on Google.
                </p>
              </div>
              <div className="space-y-4 text-left border-l border-black/5 pl-0 md:pl-8">
                <span className="text-[10px] uppercase font-semibold text-emerald-600 tracking-wider">The Solution</span>
                <h2 className="text-xl font-normal text-slate-900 text-left">The Geetanjali Softwares Advantage</h2>
                <p className="text-xs text-slate-500 leading-relaxed text-left">
                  We build custom, ultra-fast websites using modern frameworks (React & Next.js) that load in under 1.5 seconds. Coupled with localized SEO parameters, we rank your business on Google&apos;s Page 1 to capture high-intent inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-black/5">
        <SEOSimulator />
      </div>

      <div className="border-t border-black/5">
        <ProjectEstimator />
      </div>

      <div className="border-t border-black/5">
        <ConsultationScheduler />
      </div>

      <div className="border-t border-black/5">
        <ContactFormSection />
      </div>

      {/* Localized FAQ Section */}
      <section className="py-20 bg-transparent">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">Got Questions?</p>
            <h2 className="mt-3 text-2xl font-normal text-slate-900 text-center sm:text-3xl">Frequently Asked Questions in {cityName}</h2>
          </div>
          
          <div className="rounded-[32px] border border-black/5 bg-slate-50 p-6 sm:p-10 space-y-6 max-w-3xl mx-auto">
            <details className="group border-b border-black/5 pb-6 last:border-0 last:pb-0 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-slate-950 list-none outline-none select-none">
                <h3 className="text-sm font-semibold text-slate-900 group-open:text-orange-600 transition duration-300 text-left">
                  Can you develop custom websites for businesses in {cityName}?
                </h3>
                <span className="relative h-6 w-6 shrink-0 bg-white rounded-full border border-black/5 flex items-center justify-center text-slate-500 group-open:bg-orange-600 group-open:text-white transition duration-300">
                  <svg
                    className="h-3 w-3 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-xs leading-relaxed text-slate-500 text-left pl-1">
                Yes! Although we operate globally, we have a dedicated digital project delivery model for businesses in {cityName}. All communication, reviews, and revisions are carried out online via Google Meet/Zoom, phone calls, and direct WhatsApp updates.
              </p>
            </details>

            <details className="group border-b border-black/5 pb-6 last:border-0 last:pb-0 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-slate-950 list-none outline-none select-none">
                <h3 className="text-sm font-semibold text-slate-900 group-open:text-orange-600 transition duration-300 text-left">
                  How long will it take to rank on Google for localized searches in {cityName}?
                </h3>
                <span className="relative h-6 w-6 shrink-0 bg-white rounded-full border border-black/5 flex items-center justify-center text-slate-500 group-open:bg-orange-600 group-open:text-white transition duration-300">
                  <svg
                    className="h-3 w-3 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-xs leading-relaxed text-slate-500 text-left pl-1">
                For localized terms (e.g. &quot;website designer in {city}&quot;), you can expect to see Page-1 results within 60 to 90 days of launch, thanks to our pre-optimized SEO page structures and structured data setups.
              </p>
            </details>

            <details className="group border-b border-black/5 pb-6 last:border-0 last:pb-0 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-slate-950 list-none outline-none select-none">
                <h3 className="text-sm font-semibold text-slate-900 group-open:text-orange-600 transition duration-300 text-left">
                  Do you offer support and maintenance services after launching the website?
                </h3>
                <span className="relative h-6 w-6 shrink-0 bg-white rounded-full border border-black/5 flex items-center justify-center text-slate-500 group-open:bg-orange-600 group-open:text-white transition duration-300">
                  <svg
                    className="h-3 w-3 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-xs leading-relaxed text-slate-500 text-left pl-1">
                Absolutely. We provide dedicated support and maintenance packages (including monthly updates, security patch updates, and continuous optimization metrics) starting from ₹1,500/month.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
