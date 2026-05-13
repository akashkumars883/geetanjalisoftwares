'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Sparkles, 
  Layers, 
  MessageCircle, 
  Check, 
  ArrowRight, 
  Tv, 
  Smartphone, 
  Globe, 
  PartyPopper,
  ExternalLink,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function FreeWebsiteBuilder() {
  // Input states
  const [subdomain, setSubdomain] = useState('');
  const [businessName, setBusinessName] = useState('My Business Name');
  const [tagline, setTagline] = useState('We deliver professional, high-quality local services tailored to you.');
  const [whatsapp, setWhatsapp] = useState('91');
  const [theme, setTheme] = useState('orange');
  const [service1, setService1] = useState('Premium Consultation');
  const [service2, setService2] = useState('On-Time Safe Delivery');
  const [service3, setService3] = useState('24/7 Priority Support');

  // Page controller states
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' or 'mobile'
  const [activeTab, setActiveTab] = useState('edit'); // For mobile responsive toggle: 'edit' or 'preview'
  const [loading, setLoading] = useState(false);
  const [subdomainError, setSubdomainError] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Strip spaces, caps, and symbols from subdomain input
  const handleSubdomainChange = (e) => {
    const rawVal = e.target.value;
    const cleanVal = rawVal.toLowerCase().replace(/[^a-z0-9]/g, '');
    setSubdomain(cleanVal);
    setSubdomainError('');
  };

  // Generate dynamic raw HTML structure for the real-time iframe preview
  const generatePreviewHTML = () => {
    // Basic CSS custom variable profiles based on selected themes
    const themeCSS = {
      orange: {
        gradient: "linear-gradient(to top right, #ea580c, #d97706)",
        text: "#ea580c",
        bgLight: "#fff7ed",
        button: "#ea580c",
        bgGradient: "linear-gradient(to bottom, rgba(234, 88, 12, 0.05), transparent)"
      },
      sage: {
        gradient: "linear-gradient(to top right, #047857, #115e59)",
        text: "#047857",
        bgLight: "#f0fdf4",
        button: "#047857",
        bgGradient: "linear-gradient(to bottom, rgba(4, 120, 87, 0.05), transparent)"
      },
      blue: {
        gradient: "linear-gradient(to top right, #2563eb, #4338ca)",
        text: "#2563eb",
        bgLight: "#eff6ff",
        button: "#2563eb",
        bgGradient: "linear-gradient(to bottom, rgba(37, 99, 235, 0.05), transparent)"
      },
      purple: {
        gradient: "linear-gradient(to top right, #9333ea, #c026d3)",
        text: "#9333ea",
        bgLight: "#faf5ff",
        button: "#9333ea",
        bgGradient: "linear-gradient(to bottom, rgba(147, 51, 234, 0.05), transparent)"
      }
    };

    const activeTheme = themeCSS[theme] || themeCSS.orange;

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Outfit', sans-serif; background-color: #f9f8f6; }
        </style>
      </head>
      <body class="min-h-screen flex flex-col justify-between selection:bg-orange-100">
        
        <!-- Dynamic Gradient bg -->
        <div style="background: ${activeTheme.bgGradient};" class="absolute top-0 inset-x-0 h-[400px] -z-10"></div>

        <div>
          <!-- Header -->
          <header class="border-b border-black/[0.04] bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div style="background: ${activeTheme.gradient};" class="w-8 h-8 rounded-xl flex items-center justify-center text-white font-extrabold text-xs">
                  ${(businessName || 'M').charAt(0)}
                </div>
                <span class="font-extrabold text-base tracking-tight text-slate-900">${businessName || 'My Business'}</span>
              </div>
              <a href="tel:${whatsapp}" class="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200" style="background-color: ${activeTheme.bgLight}; color: ${activeTheme.text};">
                Call Now
              </a>
            </div>
          </header>

          <!-- Hero Section -->
          <section class="pt-12 pb-8 text-center max-w-3xl mx-auto px-4">
            <span style="color: ${activeTheme.text}; background-color: ${activeTheme.bgLight};" class="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider mb-4">
              ✨ Officially Verified Business
            </span>
            <h1 class="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-none">
              ${businessName || 'My Business Name'}
            </h1>
            <p class="mt-3.5 text-xs sm:text-sm text-stone-500 max-w-xl mx-auto leading-relaxed">
              ${tagline || 'We deliver professional, high-quality local services tailored to you.'}
            </p>

            <div class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl text-white px-6 py-3 text-xs font-bold transition-all duration-200" style="background-color: ${activeTheme.button};">
                Chat on WhatsApp
              </a>
              <a href="#" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-stone-200 text-stone-800 px-6 py-3 text-xs font-bold">
                Book Consultation
              </a>
            </div>
          </section>

          <!-- Services Grid -->
          <section class="max-w-4xl mx-auto px-4 py-8">
            <div class="text-center mb-6">
              <h2 class="text-lg font-black text-slate-900">Our Services</h2>
              <div style="background-color: ${activeTheme.button};" class="w-10 h-0.5 rounded-full mx-auto mt-2"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-5 rounded-2xl border border-black/[0.04] bg-white flex flex-col items-start gap-3">
                <div style="background-color: ${activeTheme.bgLight}; color: ${activeTheme.text};" class="p-2 rounded-xl">✓</div>
                <h3 class="text-xs sm:text-sm font-bold text-slate-900">${service1 || 'Premium Consultation'}</h3>
                <p class="text-[10px] text-stone-400">Professional, high-quality customized execution delivered on schedule.</p>
              </div>

              <div class="p-5 rounded-2xl border border-black/[0.04] bg-white flex flex-col items-start gap-3">
                <div style="background-color: ${activeTheme.bgLight}; color: ${activeTheme.text};" class="p-2 rounded-xl">✓</div>
                <h3 class="text-xs sm:text-sm font-bold text-slate-900">${service2 || 'On-Time Safe Delivery'}</h3>
                <p class="text-[10px] text-stone-400">Professional, high-quality customized execution delivered on schedule.</p>
              </div>

              <div class="p-5 rounded-2xl border border-black/[0.04] bg-white flex flex-col items-start gap-3">
                <div style="background-color: ${activeTheme.bgLight}; color: ${activeTheme.text};" class="p-2 rounded-xl">✓</div>
                <h3 class="text-xs sm:text-sm font-bold text-slate-900">${service3 || '24/7 Priority Support'}</h3>
                <p class="text-[10px] text-stone-400">Professional, high-quality customized execution delivered on schedule.</p>
              </div>
            </div>
          </section>
        </div>

        <!-- Footer -->
        <footer class="py-8 border-t border-black/[0.04] bg-white text-center text-[10px] text-stone-400">
          <p>© 2026 ${businessName || 'My Business'}. Officially Hosted & Verified.</p>
          <div class="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-stone-50 border border-stone-200 px-3 py-1 text-[9px] font-semibold text-stone-500">
            <span>⚡ Created for FREE with Geetanjali Softwares</span>
          </div>
        </footer>

      </body>
      </html>
    `;
  };

  // Publish / Launch Website function
  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubdomainError('');

    if (!subdomain || subdomain.length < 3) {
      setSubdomainError('Subdomain must be at least 3 characters long.');
      setLoading(false);
      return;
    }

    // Check if subdomain is already claimed
    const { data: existing, error: checkError } = await supabase
      .from('user_websites')
      .select('subdomain')
      .eq('subdomain', subdomain);

    if (existing && existing.length > 0) {
      setSubdomainError('This subdomain is already claimed. Please try another name!');
      setLoading(false);
      return;
    }

    // Insert new website configuration in Supabase database
    const servicesArray = [service1 || 'Consultation', service2 || 'Delivery', service3 || 'Support'];
    const { data, error: insertError } = await supabase
      .from('user_websites')
      .insert([
        {
          subdomain,
          business_name: businessName,
          tagline,
          whatsapp,
          theme,
          services: servicesArray
        }
      ])
      .select();

    if (insertError) {
      setSubdomainError('Error creating website. Please try again.');
    } else {
      setSuccessData({
        subdomain,
        businessName,
        url: `https://${subdomain}.geetanjalisoftwares.in`
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-white font-sans overflow-hidden">
      
      {/* Top Navbar */}
      <header className="border-b border-white/[0.05] bg-stone-900 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-orange-500">Geetanjali Softwares</span>
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-white">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            No-Code SaaS Builder v1.0
          </div>
        </div>
      </header>

      {/* Success Modal Overlay */}
      {successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-950 border border-orange-500/30 p-8 rounded-[36px] max-w-lg w-full text-center relative shadow-2xl">
            <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <PartyPopper className="text-orange-500 animate-bounce" size={40} />
            </div>
            
            <h2 className="text-3xl font-black tracking-tight text-white">Congratulations! 🎉</h2>
            <p className="mt-3 text-sm text-stone-400">
              Your business website is now live, secure, and officially hosted on our subdomain servers!
            </p>

            {/* Live Link Block */}
            <div className="mt-6 bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="text-left overflow-hidden">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Your Live Web Link</span>
                <span className="text-sm font-bold text-orange-500 truncate block">{successData.url}</span>
              </div>
              <a 
                href={successData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-xl transition-all duration-150"
              >
                <ExternalLink size={16} />
              </a>
            </div>

            {/* WhatsApp Pre-fill Share */}
            <div className="mt-6">
              <a 
                href={`https://wa.me/?text=${encodeURIComponent(`Hey! I just launched my official business website using Geetanjali Softwares! Check it out live here: ${successData.url}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl text-xs font-bold transition-all duration-200"
              >
                <MessageCircle size={16} />
                Share Website Link on WhatsApp
              </a>
            </div>

            {/* Upsell Pro Trigger */}
            <div className="mt-6 pt-6 border-t border-white/5 text-left bg-orange-500/[0.02] p-4 rounded-2xl border border-orange-500/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500 block">💡 Pro Upgrade Tip</span>
              <p className="text-xs text-stone-400 mt-1">
                Want to connect your own custom domain (like <strong className="text-white">yourbusiness.com</strong>) and remove our footer branding? 
              </p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-sm font-black text-white">₹1,999/year</span>
                <Link 
                  href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(`Hi Geetanjali Softwares! I just generated my free subdomain site "${successData.subdomain}" and want to upgrade to a Custom Domain (₹1,999).`)}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 bg-white hover:bg-stone-100 text-black px-4 py-2 rounded-xl text-[10px] font-extrabold"
                >
                  Buy Domain
                  <ArrowRight size={10} />
                </Link>
              </div>
            </div>

            <button 
              onClick={() => setSuccessData(null)}
              className="mt-6 text-xs text-stone-500 hover:text-white transition-colors underline"
            >
              Build Another Website
            </button>
          </div>
        </div>
      )}

      {/* Main UI Area */}
      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT SIDE: Input Form panel (40% width on Desktop) */}
          <div className="w-full lg:w-[40%] bg-stone-950 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[10px] font-semibold text-orange-400 uppercase tracking-wider">
                <Sparkles size={10} />
                1-Min Setup Builder
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-3">Enter Business Details</h2>
              <p className="text-xs text-stone-400 mt-1">Watch your website generate instantly on the live preview on the right.</p>
            </div>

            {/* Form */}
            <form onSubmit={handlePublish} className="space-y-5">
              
              {/* Subdomain Input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">Desired Web Address (Subdomain)</label>
                <div className="relative flex rounded-xl border border-white/10 bg-white/5 overflow-hidden focus-within:border-orange-500/50">
                  <input 
                    type="text"
                    required
                    placeholder="doctorverma"
                    value={subdomain}
                    onChange={handleSubdomainChange}
                    className="w-full bg-transparent px-4 py-3 text-xs text-white focus:outline-none placeholder:text-stone-600"
                  />
                  <span className="bg-white/5 border-l border-white/10 flex items-center px-4 text-xs font-semibold text-stone-500">
                    .geetanjalisoftwares.in
                  </span>
                </div>
                {subdomainError ? (
                  <span className="text-[10px] font-semibold text-rose-500 mt-1 flex items-center gap-1">
                    <ShieldAlert size={10} />
                    {subdomainError}
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-500 mt-1 block">Only alphabets & numbers. No spaces or caps.</span>
                )}
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">Business / Brand Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Dr. Verma Dental Clinic"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500/50 placeholder:text-stone-600"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">Short Description / Tagline</label>
                <textarea 
                  required
                  placeholder="Write what your business is about..."
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500/50 placeholder:text-stone-600 resize-none"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">WhatsApp Contact (With Country Code)</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. 91XXXXXXXXXX"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500/50 placeholder:text-stone-600"
                />
              </div>

              {/* Theme Selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">Aesthetic Color Theme</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'orange', name: 'Orange', color: 'bg-orange-600' },
                    { id: 'sage', name: 'Sage', color: 'bg-emerald-700' },
                    { id: 'blue', name: 'Blue', color: 'bg-blue-600' },
                    { id: 'purple', name: 'Purple', color: 'bg-purple-600' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${theme === t.id ? 'border-orange-500 bg-orange-500/5' : 'border-white/10 hover:border-white/25'}`}
                    >
                      <div className={`w-4 h-4 rounded-full ${t.color}`} />
                      <span className="text-[9px] font-semibold text-white">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Services Inputs */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">Our Key Services (Up to 3)</label>
                <div className="space-y-2">
                  <input 
                    type="text"
                    placeholder="Service 1 (e.g. Dental Surgery)"
                    value={service1}
                    onChange={(e) => setService1(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/50 placeholder:text-stone-600"
                  />
                  <input 
                    type="text"
                    placeholder="Service 2 (e.g. Root Canal Fixes)"
                    value={service2}
                    onChange={(e) => setService2(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/50 placeholder:text-stone-600"
                  />
                  <input 
                    type="text"
                    placeholder="Service 3 (e.g. Orthopedic Consultation)"
                    value={service3}
                    onChange={(e) => setService3(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/50 placeholder:text-stone-600"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-stone-800 text-white font-extrabold py-4 rounded-2xl text-xs transition-all duration-200 mt-4 flex items-center justify-center gap-2 shadow-lg shadow-orange-600/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    Launching Your Website...
                  </>
                ) : (
                  <>
                    Launch My Free Website
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* RIGHT SIDE: Real-time dynamic iframe preview (60% width on Desktop) */}
          <div className="w-full lg:w-[60%] flex flex-col h-[750px] bg-stone-950 border border-white/5 rounded-3xl p-4 overflow-hidden relative shadow-xl">
            
            {/* Simulation Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                
                {/* Simulated Address Bar */}
                <div className="bg-white/5 border border-white/5 px-4 py-1 rounded-full text-[9px] font-semibold text-stone-500 w-44 sm:w-64 truncate">
                  https://{subdomain || 'youraddress'}.geetanjalisoftwares.in
                </div>
              </div>

              {/* Viewport Toggles */}
              <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl">
                <button 
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-1.5 rounded-lg transition-all ${previewMode === 'desktop' ? 'bg-orange-600 text-white' : 'text-stone-400 hover:text-white'}`}
                >
                  <Tv size={14} />
                </button>
                <button 
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-1.5 rounded-lg transition-all ${previewMode === 'mobile' ? 'bg-orange-600 text-white' : 'text-stone-400 hover:text-white'}`}
                >
                  <Smartphone size={14} />
                </button>
              </div>
            </div>

            {/* Preview Window Body */}
            <div className="flex-grow flex items-center justify-center bg-stone-900 rounded-2xl relative overflow-hidden">
              <div className={`transition-all duration-300 h-full w-full ${previewMode === 'mobile' ? 'max-w-[340px] border-[10px] border-stone-950 rounded-[40px] shadow-2xl h-[95%]' : 'max-w-full'}`}>
                <iframe 
                  srcDoc={generatePreviewHTML()} 
                  title="Live Static Generator Preview"
                  className="w-full h-full bg-stone-50 border-0"
                />
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
