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
        "telephone": "+91-XXXXXXXXXX",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": cityName === "Patna" ? "Bihar" : "State",
          "addressLocality": cityName
        }
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
                  We build custom, ultra-fast websites using modern frameworks (React & Next.js) that load in under 1.5 seconds. Coupled with localized SEO parameters, we rank your business on Google's Page 1 to capture high-intent inquiries.
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-normal text-slate-900 text-center mb-10">Frequently Asked Questions in {cityName}</h2>
          
          <div className="space-y-6 max-w-3xl mx-auto text-left">
            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 text-left">
              <h4 className="text-xs font-semibold text-slate-900">Can you develop custom websites for businesses in {cityName}?</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Yes! Although we operate globally, we have a dedicated digital project delivery model for businesses in {cityName}. All communication, reviews, and revisions are carried out online via Google Meet/Zoom, phone calls, and direct WhatsApp updates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 text-left">
              <h4 className="text-xs font-semibold text-slate-900">How long will it take to rank on Google for localized searches in {cityName}?</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                For localized terms (e.g. "website designer in {city}"), you can expect to see Page-1 results within 60 to 90 days of launch, thanks to our pre-optimized SEO page structures and structured data setups.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 text-left">
              <h4 className="text-xs font-semibold text-slate-900">Do you offer support and maintenance services after launching the website?</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Absolutely. We provide dedicated support and maintenance packages (including monthly updates, security patch updates, and continuous optimization metrics) starting from ₹1,500/month.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
