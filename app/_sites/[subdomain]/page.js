import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Phone, 
  MessageCircle, 
  Sparkles, 
  CheckCircle, 
  ChevronRight, 
  Globe 
} from 'lucide-react';
import Link from 'next/link';

// Since this is a server component rendered under wildcard rewrites, 
// we construct a direct server-side admin client to load user website data quickly.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const revalidate = 60; // Cache for 60 seconds

export default async function SubdomainPage({ params }) {
  const { subdomain } = params;

  // Query Supabase for this specific subdomain's custom configuration
  const { data: site, error } = await supabaseAdmin
    .from('user_websites')
    .select('*')
    .eq('subdomain', subdomain)
    .single();

  // 404 Case: Render a gorgeous promo redirect page if subdomain is not found
  if (error || !site) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col justify-between text-stone-900 font-sans">
        <header className="py-6 border-b border-black/[0.05] bg-white">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <span className="font-extrabold text-lg tracking-tight text-orange-600">Geetanjali Softwares</span>
            <Link href="https://www.geetanjalisoftwares.in/free-website" className="text-xs font-bold text-stone-600 hover:text-black">
              Create a Site
            </Link>
          </div>
        </header>

        <main className="max-w-md mx-auto px-6 py-20 text-center flex-grow flex flex-col justify-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Globe className="text-orange-600" size={36} />
          </div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Website Not Found</h1>
          <p className="mt-4 text-sm text-stone-500 leading-relaxed">
            The subdomain <strong className="text-stone-950">"{subdomain}.geetanjalisoftwares.in"</strong> is currently unclaimed or has expired.
          </p>
          <p className="mt-2 text-xs text-stone-400">
            Are you the business owner? You can launch this exact website under your name in just 1 minute for free!
          </p>
          <div className="mt-8">
            <Link 
              href="https://www.geetanjalisoftwares.in/free-website"
              className="inline-flex items-center gap-2 rounded-2xl bg-orange-600 text-white px-6 py-4 text-sm font-bold shadow-lg hover:bg-orange-700 transition-all duration-200"
            >
              Build Your Website For Free
              <ChevronRight size={16} />
            </Link>
          </div>
        </main>

        <footer className="py-8 text-center text-xs text-stone-400 border-t border-black/[0.03] bg-white">
          © 2026 Geetanjali Softwares. All rights reserved.
        </footer>
      </div>
    );
  }

  // Define beautiful theme configurations
  const themes = {
    orange: {
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-500/5 via-transparent to-transparent",
      text: "text-orange-600",
      bgLight: "bg-orange-50",
      border: "border-orange-500/20",
      button: "bg-orange-600 hover:bg-orange-700 shadow-orange-600/20",
      accent: "bg-orange-600"
    },
    sage: {
      gradient: "from-emerald-700 to-teal-800",
      bgGradient: "from-emerald-700/5 via-transparent to-transparent",
      text: "text-emerald-700",
      bgLight: "bg-emerald-50",
      border: "border-emerald-500/20",
      button: "bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/20",
      accent: "bg-emerald-700"
    },
    blue: {
      gradient: "from-blue-600 to-indigo-700",
      bgGradient: "from-blue-600/5 via-transparent to-transparent",
      text: "text-blue-600",
      bgLight: "bg-blue-50",
      border: "border-blue-500/20",
      button: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20",
      accent: "bg-blue-600"
    },
    purple: {
      gradient: "from-purple-600 to-fuchsia-700",
      bgGradient: "from-purple-600/5 via-transparent to-transparent",
      text: "text-purple-600",
      bgLight: "bg-purple-50",
      border: "border-purple-500/20",
      button: "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20",
      accent: "bg-purple-600"
    }
  };

  const activeTheme = themes[site.theme] || themes.orange;
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi ${site.business_name}! I visited your website and would like to inquire about your services.`)}`;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col justify-between selection:bg-orange-100">
      
      {/* Dynamic Background Accent */}
      <div className={`absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b ${activeTheme.bgGradient} pointer-events-none -z-10`} />

      <div>
        {/* Dynamic Premium Header */}
        <header className="border-b border-black/[0.04] bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${activeTheme.gradient} flex items-center justify-center text-white font-extrabold text-sm`}>
                {site.business_name.charAt(0)}
              </div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-stone-900">{site.business_name}</span>
            </div>
            
            <a 
              href={`tel:${site.whatsapp}`}
              className={`inline-flex items-center gap-1.5 rounded-full ${activeTheme.bgLight} ${activeTheme.text} px-4 py-2 text-xs font-bold hover:opacity-90 transition-all duration-200`}
            >
              <Phone size={12} />
              Call Now
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-stone-200 shadow-sm px-4 py-1.5 text-[10px] sm:text-xs font-semibold text-stone-600 mb-6 uppercase tracking-wider">
            <Sparkles size={12} className={activeTheme.text} />
            Officially Verified Business
          </div>
          <h1 className="text-3xl sm:text-6xl font-black text-stone-950 tracking-tight leading-none">
            {site.business_name}
          </h1>
          {site.tagline && (
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
              {site.tagline}
            </p>
          )}

          {/* Core Action Callouts */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl ${activeTheme.button} text-white px-8 py-4 text-sm font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
            <a 
              href={`tel:${site.whatsapp}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white border border-stone-200 text-stone-800 px-8 py-4 text-sm font-bold hover:bg-stone-50 shadow-sm transition-all duration-200"
            >
              <Phone size={16} />
              Book Consultation
            </a>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-3xl font-black text-stone-900">Our Services</h2>
            <div className={`w-12 h-1 ${activeTheme.accent} rounded-full mx-auto mt-3`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {site.services && site.services.map((service, index) => (
              <div 
                key={index}
                className={`p-6 sm:p-8 rounded-[32px] border ${activeTheme.border} bg-white shadow-sm flex flex-col items-start gap-4 transition-all duration-200 hover:shadow-md`}
              >
                <div className={`p-2.5 rounded-2xl ${activeTheme.bgLight}`}>
                  <CheckCircle className={activeTheme.text} size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">{service}</h3>
                <p className="text-xs text-stone-400">Professional, high-quality, customized execution delivered safely at scheduled timelines.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Factors Callout */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className={`rounded-[36px] bg-gradient-to-r ${activeTheme.gradient} p-8 sm:p-12 text-white relative overflow-hidden text-center sm:text-left`}>
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Have Any Custom Requirements?</h3>
                <p className="text-xs sm:text-sm text-white/80 mt-2 max-w-lg leading-relaxed">
                  We specialize in tailoring our services directly to your needs. Get in touch on WhatsApp for custom bookings or discounts!
                </p>
              </div>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-stone-900 px-6 py-4 text-xs sm:text-sm font-bold shadow-md hover:bg-stone-50 transition-all duration-200 whitespace-nowrap"
              >
                Contact Business Owner
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER: This is our compounding viral engine! */}
      <footer className="py-12 border-t border-black/[0.04] bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-xs font-semibold text-stone-900 block">{site.business_name}</span>
            <span className="text-[10px] text-stone-400 mt-1 block">Officially Hosted & Verified Business Website.</span>
          </div>

          {/* This elegant linktree-style badge drives viral traffic back to our site! */}
          <Link 
            href="https://www.geetanjalisoftwares.in/free-website"
            target="_blank"
            className="group inline-flex items-center gap-2 rounded-2xl bg-stone-50 border border-stone-200 px-4 py-2.5 text-[10px] font-semibold text-stone-600 transition-all duration-200 hover:border-orange-500/40 hover:bg-orange-50/10"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>⚡ Created for FREE with <strong>Geetanjali Softwares</strong></span>
            <ChevronRight size={10} className="text-stone-400 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </footer>

    </div>
  );
}
