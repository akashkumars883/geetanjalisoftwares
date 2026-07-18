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

const priorityCities = new Set(["faridabad", "delhi-ncr", "delhi", "noida", "gurgaon"]);

export async function generateMetadata({ params }) {
  const { city } = await params;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ');
  const isPriorityCity = priorityCities.has(city);

  return {
    title: `Best Web Development & SEO Company in ${cityName} | Geetanjali Softwares`,
    description: `Looking for top website design, custom software, or dynamic SEO services in ${cityName}, India? Partner with Geetanjali Softwares for high-performance responsive web setups.`,
    keywords: `web development in ${city}, website designers ${city}, seo agency ${city}, custom software development ${city}, digital marketing ${city}`,
    robots: isPriorityCity
      ? { index: true, follow: true }
      : { index: false, follow: true },
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
    <div className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <PopupForm />

      {/* Localized Premium Hero Banner */}
      <section className="relative pt-0 sm:pt-4 pb-16 sm:pb-24 border-b border-foreground/10">
        <div className="mx-auto max-w-7xl px-6 relative text-left">
          
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-primary"></span>
            <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-primary flex items-center gap-2">
              <MapPin size={12} />
              Best Digital Partner in {cityName}
            </span>
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground leading-tight max-w-5xl">
            Enterprise web solutions for <br /> <span className="text-primary">{cityName}</span> businesses
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-foreground/70 font-medium max-w-2xl">
            We combine strategic thinking with technical precision to deliver websites, software, and SEO campaigns that drive measurable growth for businesses in {cityName}. Built for performance, designed for impact.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            <div className="p-5 flex flex-col border border-foreground/10 bg-foreground/5 transition-colors hover:border-primary">
              <Award className="text-primary shrink-0 mb-3" size={24} />
              <div>
                <span className="block font-heading text-sm font-bold uppercase tracking-wide text-foreground">A-Grade UI/UX</span>
                <span className="block text-xs text-foreground/60 mt-1">Tailored designs</span>
              </div>
            </div>
            
            <div className="p-5 flex flex-col border border-foreground/10 bg-foreground/5 transition-colors hover:border-primary">
              <TrendingUp className="text-primary shrink-0 mb-3" size={24} />
              <div>
                <span className="block font-heading text-sm font-bold uppercase tracking-wide text-foreground">SEO Optimized</span>
                <span className="block text-xs text-foreground/60 mt-1">Guaranteed reach</span>
              </div>
            </div>

            <div className="p-5 flex flex-col border border-foreground/10 bg-foreground/5 transition-colors hover:border-primary">
              <Users className="text-primary shrink-0 mb-3" size={24} />
              <div>
                <span className="block font-heading text-sm font-bold uppercase tracking-wide text-foreground">Local Support</span>
                <span className="block text-xs text-foreground/60 mt-1">Dedicated manager</span>
              </div>
            </div>

            <div className="p-5 flex flex-col border border-foreground/10 bg-foreground/5 transition-colors hover:border-primary">
              <ShieldCheck className="text-primary shrink-0 mb-3" size={24} />
              <div>
                <span className="block font-heading text-sm font-bold uppercase tracking-wide text-foreground">Secure Platforms</span>
                <span className="block text-xs text-foreground/60 mt-1">Direct Meta APIs</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Local Problem & Solution Context block */}
      <section className="py-20 border-b border-foreground/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border border-foreground/10 bg-foreground/5 p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background via-transparent to-transparent pointer-events-none" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative z-10">
              <div className="space-y-4 text-left">
                <span className="font-heading text-[10px] uppercase font-bold text-primary tracking-widest">Local Challenges</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground text-left">Why {cityName} Businesses <br /> Lose Online Leads?</h2>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed text-left font-medium">
                  Many businesses in {cityName} invest in generic templates that load slowly and fail to convert visitors into inquiries. With modern core web vitals, speed and professional aesthetics are critical to ranking on Google.
                </p>
              </div>
              <div className="space-y-4 text-left md:border-l md:border-foreground/10 md:pl-12 pt-8 md:pt-0 border-t border-foreground/10 md:border-t-0">
                <span className="font-heading text-[10px] uppercase font-bold text-emerald-500 tracking-widest">The Solution</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground text-left">The Geetanjali <br /> Softwares Advantage</h2>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed text-left font-medium">
                  We build custom, ultra-fast websites using modern frameworks (React & Next.js) that load in under 1.5 seconds. Coupled with localized SEO parameters, we rank your business on Google&apos;s Page 1 to capture high-intent inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-foreground/10">
        <SEOSimulator />
      </div>

      <div className="border-b border-foreground/10">
        <ProjectEstimator />
      </div>

      <div className="border-b border-foreground/10">
        <ConsultationScheduler />
      </div>

      <div className="border-b border-foreground/10">
        <ContactFormSection />
      </div>

      {/* Localized FAQ Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-left max-w-5xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-12 bg-primary"></span>
              <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">Got Questions?</p>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tighter text-foreground text-left">
              Frequently Asked <br /> Questions in {cityName}
            </h2>
          </div>
          
          <div className="space-y-4">
            <details className="group border border-foreground/10 bg-transparent transition-colors hover:border-foreground/30 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between p-6 list-none outline-none select-none">
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground group-open:text-primary transition-colors text-left pr-4">
                  Can you develop custom websites for businesses in {cityName}?
                </h3>
                <span className="relative h-8 w-8 shrink-0 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/50 group-open:border-primary group-open:bg-primary/10 group-open:text-primary transition duration-300">
                  <svg
                    className="h-4 w-4 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <p className="text-sm leading-relaxed text-foreground/70 text-left font-medium border-t border-foreground/10 pt-4">
                  Yes! Although we operate globally, we have a dedicated digital project delivery model for businesses in {cityName}. All communication, reviews, and revisions are carried out online via Google Meet/Zoom, phone calls, and direct WhatsApp updates.
                </p>
              </div>
            </details>

            <details className="group border border-foreground/10 bg-transparent transition-colors hover:border-foreground/30 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between p-6 list-none outline-none select-none">
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground group-open:text-primary transition-colors text-left pr-4">
                  How long will it take to rank on Google for localized searches in {cityName}?
                </h3>
                <span className="relative h-8 w-8 shrink-0 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/50 group-open:border-primary group-open:bg-primary/10 group-open:text-primary transition duration-300">
                  <svg
                    className="h-4 w-4 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <p className="text-sm leading-relaxed text-foreground/70 text-left font-medium border-t border-foreground/10 pt-4">
                  For localized terms (e.g. &quot;website designer in {city}&quot;), you can expect to see Page-1 results within 60 to 90 days of launch, thanks to our pre-optimized SEO page structures and structured data setups.
                </p>
              </div>
            </details>

            <details className="group border border-foreground/10 bg-transparent transition-colors hover:border-foreground/30 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between p-6 list-none outline-none select-none">
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground group-open:text-primary transition-colors text-left pr-4">
                  Do you offer support and maintenance services after launching the website?
                </h3>
                <span className="relative h-8 w-8 shrink-0 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/50 group-open:border-primary group-open:bg-primary/10 group-open:text-primary transition duration-300">
                  <svg
                    className="h-4 w-4 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <p className="text-sm leading-relaxed text-foreground/70 text-left font-medium border-t border-foreground/10 pt-4">
                  Absolutely. We provide dedicated support and maintenance packages (including monthly updates, security patch updates, and continuous optimization metrics) starting from ₹1,500/month.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
