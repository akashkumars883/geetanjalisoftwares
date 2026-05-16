import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Phone, 
  MessageCircle, 
  Sparkles, 
  CheckCircle, 
  ChevronRight, 
  Globe,
  MapPin,
  Star,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

// Since this is a server component, we construct a direct server-side admin client to load user website data quickly.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const dynamic = 'force-dynamic';

// BASIC SEO: Dynamic Metadata Generation
export async function generateMetadata({ params }) {
  const { subdomain } = await params;
  const { data: site } = await supabaseAdmin
    .from('user_websites')
    .select('business_name, tagline, hero_description, address')
    .eq('subdomain', subdomain)
    .single();

  if (!site) return { title: 'Business Not Found' };

  const description = site.hero_description || site.tagline || `Professional services by ${site.business_name} in ${site.address || 'your city'}.`;

  return {
    title: `${site.business_name} | Best Services in ${site.address?.split(',').pop() || 'India'}`,
    description: description,
    openGraph: {
      title: site.business_name,
      description: description,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [], // This removes the fallback to the main site's favicon
    }
  };
}

export default async function SubdomainPage({ params }) {
  const { subdomain } = await params;

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
            <Link href="https://www.geetanjalisoftwares.in/studio" className="text-xs font-bold text-stone-600 hover:text-black">
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
              href="https://www.geetanjalisoftwares.in/studio"
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
      bgGradient: "from-orange-500/10 via-transparent to-transparent",
      text: "text-orange-600",
      bgLight: "bg-orange-50",
      border: "border-orange-500/20",
      button: "bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-600/30",
      accent: "bg-orange-600",
      ring: "ring-orange-600/20"
    },
    sage: {
      gradient: "from-emerald-600 to-teal-700",
      bgGradient: "from-emerald-600/10 via-transparent to-transparent",
      text: "text-emerald-700",
      bgLight: "bg-emerald-50",
      border: "border-emerald-500/20",
      button: "bg-emerald-700 hover:bg-emerald-800 shadow-xl shadow-emerald-700/30",
      accent: "bg-emerald-700",
      ring: "ring-emerald-700/20"
    },
    blue: {
      gradient: "from-blue-600 to-indigo-700",
      bgGradient: "from-blue-600/10 via-transparent to-transparent",
      text: "text-blue-600",
      bgLight: "bg-blue-50",
      border: "border-blue-500/20",
      button: "bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/30",
      accent: "bg-blue-600",
      ring: "ring-blue-600/20"
    },
    purple: {
      gradient: "from-purple-600 to-fuchsia-700",
      bgGradient: "from-purple-600/10 via-transparent to-transparent",
      text: "text-purple-600",
      bgLight: "bg-purple-50",
      border: "border-purple-500/20",
      button: "bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-600/30",
      accent: "bg-purple-600",
      ring: "ring-purple-600/20"
    }
  };

  const activeTheme = themes[site.theme] || themes.orange;
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi ${site.business_name}! I visited your website and would like to inquire about your services.`)}`;

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-stone-900 font-sans flex flex-col justify-between selection:bg-orange-100">
      
      {/* Dynamic Background Accent: Mesh Gradients */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${activeTheme.gradient} opacity-[0.05] blur-[120px] rounded-full pointer-events-none -z-10`} />
      <div className={`absolute top-[400px] -left-20 w-[400px] h-[400px] bg-gradient-to-tr ${activeTheme.gradient} opacity-[0.03] blur-[100px] rounded-full pointer-events-none -z-10`} />

      <div>
        {/* Dynamic Premium Header: Sticky & Responsive */}
        <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-black/[0.03]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${activeTheme.gradient} flex items-center justify-center text-white font-semibold text-lg shadow-lg`}>
                {site.business_name.charAt(0)}
              </div>
              <span className="font-semibold text-lg sm:text-xl tracking-tight text-stone-900">{site.business_name}</span>
            </div>
            
            <a 
              href={`tel:${site.whatsapp}`}
              className={`hidden sm:inline-flex items-center gap-2 rounded-[32px] ${activeTheme.bgLight} ${activeTheme.text} px-6 py-3 text-[11px] font-semibold hover:opacity-90 transition-all shadow-sm border ${activeTheme.border}`}
            >
              <Phone size={12} />
              Book Consultation
            </a>

            {/* Mobile Call Icon */}
            <a 
              href={`tel:${site.whatsapp}`} 
              className={`sm:hidden p-2.5 rounded-xl ${activeTheme.bgLight} ${activeTheme.text} border ${activeTheme.border}`}
            >
              <Phone size={18} />
            </a>
          </div>
        </header>

        {/* Hero Section: Editorial & Clean */}
        <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 text-center max-w-5xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-200 shadow-sm px-5 py-2 text-[10px] sm:text-[11px] font-semibold text-stone-500 mb-10 tracking-wider">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ACTIVE & VERIFIED SPECIALIST
          </div>
          <h1 className="text-4xl sm:text-7xl font-semibold text-stone-950 tracking-tight leading-[1.05] mb-8">
            {site.hero_title || site.business_name}
          </h1>
          <p className="text-lg sm:text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto mb-12 font-medium px-4">
            {site.hero_description || site.tagline || `Top-rated professional business providing premium services in your city.`}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 px-4 sm:px-0">
            <a 
              href={whatsappUrl}
              target="_blank"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[32px] ${activeTheme.button} text-white px-12 py-5 text-sm font-semibold transition-all hover:-translate-y-1 active:scale-95 shadow-2xl`}
            >
              <MessageCircle size={20} /> Get Free Quote Now
            </a>
            
            <div className="flex items-center gap-6 pt-4 sm:pt-0">
              <div className="flex items-center gap-2">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">5.0 RATING</span>
              </div>
              <div className="h-4 w-px bg-stone-200" />
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">VERIFIED</span>
              </div>
            </div>
          </div>
        </section>


        {/* Services Grid: Editorial Style */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-semibold text-stone-950 tracking-tight leading-none mb-4">Crafting Excellence In <span className={activeTheme.text}>Every Service</span></h2>
              <p className="text-sm sm:text-base text-stone-500 font-medium">Explore our range of professional solutions tailored specifically for your needs.</p>
            </div>
            <div className={`w-16 h-1 ${activeTheme.accent} rounded-full hidden md:block mb-4`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(site.services_list || site.services || []).map((service, index) => {
              const name = typeof service === 'object' ? service.name : service;
              const desc = typeof service === 'object' ? service.desc : "Professional, high-quality, customized execution delivered safely at scheduled timelines.";
              
              return (
                <div 
                  key={index}
                  className="group relative p-10 rounded-[40px] border border-black/[0.03] bg-white shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-2 h-full ${activeTheme.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-14 h-14 rounded-2xl ${activeTheme.bgLight} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <CheckCircle className={activeTheme.text} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-4 tracking-tight leading-tight">{name}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed font-medium">{desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* About Story Section: Premium Inset */}
        {site.about_body && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="bg-stone-950 rounded-[48px] p-10 sm:p-20 text-white relative overflow-hidden shadow-2xl">
              <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${activeTheme.gradient} opacity-20 blur-[120px]`} />
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-[0.3em] mb-8">
                  Our Mission & Vision
                </div>
                <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight mb-8">
                  {site.about_headline || 'Redefining Quality & Service Standards'}
                </h2>
                <p className="text-base sm:text-xl text-white/60 leading-relaxed font-medium">
                  {site.about_body}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials: Minimalist Modern */}
        {site.testimonials && site.testimonials.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-semibold text-stone-950 tracking-tight">Voices of Satisfaction</h2>
              <p className="mt-2 text-sm font-semibold text-stone-400 uppercase tracking-widest">Real results from real clients</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {site.testimonials.map((t, i) => (
                <div key={i} className="bg-white p-10 rounded-[40px] border border-black/[0.03] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[1,2,3,4,5].map(star => <Sparkles key={star} size={14} className="text-amber-500 fill-amber-500" />)}
                    </div>
                    <p className="text-base sm:text-lg text-stone-600 font-medium leading-relaxed mb-8 italic">"{t.review}"</p>
                  </div>
                  <div className="flex items-center gap-3 pt-6 border-t border-black/[0.03]">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${activeTheme.gradient} flex items-center justify-center text-white font-semibold text-xs`}>{t.name.charAt(0)}</div>
                    <span className="text-sm font-semibold text-stone-900">— {t.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
      
      {/* FOOTER: Enhanced & Compact */}
      <footer className="bg-[#050505] text-white pt-16 pb-8 px-6 relative overflow-hidden">
        {/* Visual Background Element */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${activeTheme.gradient} opacity-[0.03] blur-[100px] pointer-events-none`} />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Column 1: Brand Identity */}
          <div className="md:col-span-5 space-y-6">
             <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${activeTheme.gradient} flex items-center justify-center text-white font-semibold text-lg`}>
                  {site.business_name.charAt(0)}
               </div>
               <h2 className="text-xl font-semibold tracking-tight">{site.business_name}</h2>
             </div>
             <p className="text-sm text-white/50 leading-relaxed max-w-sm font-medium">
               {site.hero_description?.split('.')[0] || site.tagline || `Top-rated professional business providing premium services in your city.`}.
             </p>
          </div>

          {/* Column 2: Direct Contact */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-[13px] font-semibold text-white/70">Contact Details</h4>
            <div className="flex flex-col gap-5">
               <a href={`tel:${site.whatsapp}`} className="group flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-orange-500/20 transition-all">
                    <Phone size={14} className="text-white/40 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-white/60 group-hover:text-white transition">+{site.whatsapp}</span>
               </a>
               <a href={whatsappUrl} className="group flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                    <MessageCircle size={14} className="text-white/40 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-white/60 group-hover:text-white transition">WhatsApp Chat</span>
               </a>
               <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-white/40" />
                  </div>
                  <span className="text-sm font-semibold text-white/40 leading-relaxed">{site.address || 'India'}</span>
               </div>
            </div>
          </div>

          {/* Column 3: Visual Location */}
          <div className="md:col-span-4">
            {(site.address || site.whatsapp) && (
              <div className="rounded-[32px] overflow-hidden border border-white/5 h-56 w-full grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 shadow-2xl bg-white/5">
                <iframe 
                  width="100%" height="100%" frameBorder="0" style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(site.address || site.business_name)}&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[11px] text-white/40 font-medium">Built for local business &bull; Powered by Geetanjali Softwares</p>
           <p className="text-[11px] text-white/40 font-medium">&copy; 2026 {site.business_name} All rights reserved</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappUrl}
        target="_blank"
        className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-[0_10px_40px_rgba(16,185,129,0.4)] hover:scale-110 transition-transform active:scale-95 group"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20 group-hover:hidden" />
        <MessageCircle size={28} fill="currentColor" />
      </a>

    </div>
  );
}
