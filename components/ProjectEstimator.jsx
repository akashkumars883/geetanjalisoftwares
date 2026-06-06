'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  ChevronRight, 
  ChevronLeft, 
  Globe, 
  TrendingUp, 
  Layers, 
  Check, 
  Lock, 
  CheckCircle, 
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProjectEstimator() {
  const [activeTrack, setActiveTrack] = useState('web'); // 'web', 'seo', 'combos'
  const [selectedPlanId, setSelectedPlanId] = useState('web_starter'); // default starter plan

  // Addon configurations
  const [extraPagesCount, setExtraPagesCount] = useState(0);
  const [includeLogo, setIncludeLogo] = useState(false);
  const [maintenanceMonths, setMaintenanceMonths] = useState(0);

  // Lead contact info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 1. Web Packages Config
  const webPlans = [
    {
      id: 'web_starter',
      name: 'Starter Plan',
      price: 8000,
      period: 'One-time',
      tagline: 'Best for new businesses getting online',
      timeline: '7 - 10 Days',
      features: [
        '5-Page website structure',
        'Mobile responsive design layout',
        'Secure standard Contact form',
        'Basic SEO setup (meta tags)',
        'Google Maps embed location',
        'Social media channels integration',
        'WhatsApp click-to-chat button'
      ]
    },
    {
      id: 'web_growth',
      name: 'Growth Plan',
      price: 15000,
      period: 'One-time',
      tagline: 'Best for growing professional brands',
      timeline: '14 - 18 Days',
      features: [
        'Up to 10 page layouts',
        'Mobile responsive fluid design',
        'Advanced contact & lead capture forms',
        'Full on-page SEO schema optimization',
        'Google Business profile integration',
        'WhatsApp direct widget button',
        'Corporate Blog section integration',
        'Speed & performance optimized'
      ]
    },
    {
      id: 'web_premium',
      name: 'Premium Plan',
      price: 25000,
      period: 'One-time',
      tagline: 'Full feature-packed agency grade portal',
      timeline: '21 - 28 Days',
      features: [
        'Up to 20 detailed pages',
        'Custom interactive UI/UX design',
        'E-commerce ready (up to 50 products)',
        'Payment gateway payment routing',
        'Full on-page + technical deep SEO audit',
        'Blog + News announcements layout',
        'Premium modern motion animations',
        'Speed, Core Web Vitals & CDN optimized',
        'Admin dashboard / Dynamic CMS'
      ]
    }
  ];

  // 2. SEO & Digital Marketing Packages Config
  const seoPlans = [
    {
      id: 'seo_local',
      name: 'Local SEO Plan',
      price: 5000,
      period: 'Month',
      tagline: 'Ideal for single-city local business reach',
      timeline: 'Visible in 60-90 Days',
      features: [
        'Google Business Profile optimization',
        'Keyword research (up to 10 key terms)',
        'On-page SEO optimization for 5 pages',
        'Local citation directories submissions',
        'Basic backlink outreach (5 backlinks/mo)',
        'Monthly transparent report card'
      ]
    },
    {
      id: 'seo_growth',
      name: 'Growth SEO Plan',
      price: 8000,
      period: 'Month',
      tagline: 'For multi-service competitive businesses',
      timeline: 'Visible in 45-60 Days',
      features: [
        'Everything included in Local SEO Plan',
        'Extended keyword research (25 terms)',
        'On-page SEO optimization for 10 pages',
        '2 SEO-optimized blog posts / mo',
        'Technical SEO crawl diagnostics audit',
        'Quality backlink building (15 links/mo)',
        'Competitor analysis report card',
        'Monthly strategic audio consultation'
      ]
    },
    {
      id: 'seo_full',
      name: 'Full Digital Marketing',
      price: 15000,
      period: 'Month',
      tagline: 'Complete online revenue growth suite',
      timeline: 'Weekly reporting trackers',
      features: [
        'Everything included in Growth SEO Plan',
        'Social media management (2 channels)',
        '8 custom social media posts / mo',
        'Google Ads PPC campaign administration',
        '4 high-authority SEO blogs / mo',
        'Priority Slack/WhatsApp help support',
        'Advanced lead generation strategy setup'
      ]
    }
  ];

  // 3. Super Saver Combo Bundles Config
  const comboPlans = [
    {
      id: 'combo_launch',
      name: 'Launch Bundle',
      price: 18000,
      period: 'Saver Package',
      tagline: 'Launch your complete brand online',
      timeline: '10 - 14 Days',
      features: [
        'Starter Website Plan (Rs 8,000 value)',
        'Professional Logo Design (Rs 2,500 value)',
        'Google Business profile optimization',
        '1 Month Local SEO Strategy setup (Rs 5,000 value)'
      ]
    },
    {
      id: 'combo_growth',
      name: 'Growth Bundle',
      price: 28000,
      period: 'Most Popular',
      tagline: 'Accelerate business growth and rankings',
      timeline: '20 - 25 Days',
      features: [
        'Growth Website Plan (Rs 15,000 value)',
        'Brand Identity Kit (Concepts + Cards)',
        '2 Months Growth SEO Campaign (Rs 16,000 value)',
        'Complete Social Media Kit files'
      ]
    },
    {
      id: 'combo_scale',
      name: 'Scale Bundle',
      price: 45000,
      period: 'Elite Enterprise',
      tagline: 'Dominate search markets & captures leads',
      timeline: '28 - 35 Days',
      features: [
        'Premium Website Plan (Rs 25,000 value)',
        'Complete Executive Brand Guidelines Package',
        '3 Months Full Digital Marketing Campaign',
        'Lead Capture Funnel architecture setup'
      ]
    }
  ];

  // Get active selected plan object
  const getSelectedPlan = () => {
    if (activeTrack === 'web') return webPlans.find(p => p.id === selectedPlanId) || webPlans[0];
    if (activeTrack === 'seo') return seoPlans.find(p => p.id === selectedPlanId) || seoPlans[0];
    return comboPlans.find(p => p.id === selectedPlanId) || comboPlans[0];
  };

  const plan = getSelectedPlan();

  // Price calculations including custom addons
  const getTotals = () => {
    let basePrice = plan.price;
    let extraPagesCost = extraPagesCount * 1500; // mid-range of Rs 1,000 - Rs 2,000
    let logoCost = includeLogo ? 3500 : 0; // mid-range of Rs 2,500 - Rs 5,000
    let maintenanceCost = maintenanceMonths * 1500; // standard maintenance rate

    // Addons are only applicable to web/combo tracks
    if (activeTrack === 'seo') {
      extraPagesCost = 0;
      logoCost = 0;
      maintenanceCost = 0;
    }

    const totalEstimate = basePrice + extraPagesCost + logoCost + maintenanceCost;
    return {
      totalEstimate,
      extraPagesCost,
      logoCost,
      maintenanceCost
    };
  };

  const { totalEstimate, extraPagesCost, logoCost, maintenanceCost } = getTotals();

  const handleTrackChange = (track) => {
    setActiveTrack(track);
    if (track === 'web') setSelectedPlanId('web_starter');
    if (track === 'seo') setSelectedPlanId('seo_local');
    if (track === 'combos') setSelectedPlanId('combo_launch');
    
    // Reset addons on track switch
    setExtraPagesCount(0);
    setIncludeLogo(false);
    setMaintenanceMonths(0);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error('Please fill in your coordinates to receive the rate-card.');
      return;
    }

    setSubmitting(true);

    const formattedMessage = `--- RATE CARD ESTIMATOR LEAD ---
Plan Chosen: ${plan.name} (Base Price: INR ${plan.price.toLocaleString('en-IN')})
Track Category: ${activeTrack.toUpperCase()}
Extra Pages: ${extraPagesCount} (Cost: INR ${extraPagesCost.toLocaleString('en-IN')})
Include Logo: ${includeLogo ? 'YES' : 'NO'} (Cost: INR ${logoCost.toLocaleString('en-IN')})
Maintenance Period: ${maintenanceMonths} Mos (Cost: INR ${maintenanceCost.toLocaleString('en-IN')})
Calculated Grand Total: INR ${totalEstimate.toLocaleString('en-IN')}
Estimated Project Delivery: ${plan.timeline}
Client Mobile Contact: ${phone}`;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          service: `Estimator: ${plan.name}`,
          message: formattedMessage
        })
      });

      if (res.ok) {
        toast.success('Your quotation copy is registered successfully!');
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Failed to submit quote request.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Communication error while processing details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="estimator" className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.03),transparent_50%)]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title Bar */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-600">
            <Calculator size={13} />
            Budget Estimator
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl text-center">
            Estimate Your Custom Project Cost
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-500 max-w-xl mx-auto leading-relaxed text-center">
            Configure website packages, growth marketing retainers, or super-saver combos to view your estimated price dynamically.
          </p>
        </div>

        {/* Categories Tab Selector bar */}
        <div className="flex justify-center max-w-md mx-auto bg-slate-200/50 p-1.5 rounded-2xl mb-12">
          <button
            type="button"
            onClick={() => handleTrackChange('web')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTrack === 'web' ? 'bg-white text-slate-900 shadow-sm' : 'text-stone-600 hover:text-black'
            }`}
          >
            Website Dev
          </button>
          <button
            type="button"
            onClick={() => handleTrackChange('seo')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTrack === 'seo' ? 'bg-white text-slate-900 shadow-sm' : 'text-stone-600 hover:text-black'
            }`}
          >
            SEO plans
          </button>
          <button
            type="button"
            onClick={() => handleTrackChange('combos')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTrack === 'combos' ? 'bg-white text-slate-900 shadow-sm' : 'text-stone-600 hover:text-black'
            }`}
          >
            Combo Bundles
          </button>
        </div>

        {/* Configurator Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left panel: Plan selector cards & options */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Selecting Plan Card options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeTrack === 'web' && webPlans.map((wp) => (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => setSelectedPlanId(wp.id)}
                  className={`p-5 rounded-3xl border-2 text-left transition-all ${
                    selectedPlanId === wp.id 
                      ? 'bg-white border-black text-slate-900 shadow-lg' 
                      : 'bg-white border-black/5 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${selectedPlanId === wp.id ? 'text-orange-400' : 'text-orange-600 bg-orange-500/5 px-2.5 py-0.5 rounded-full'}`}>
                    Rs {wp.price.toLocaleString('en-IN')}
                  </span>
                  <h4 className="font-semibold text-sm mt-3 text-left">{wp.name}</h4>
                  <p className={`text-[11px] mt-1 leading-normal text-left ${selectedPlanId === wp.id ? 'text-slate-900/60' : 'text-stone-500'}`}>
                    {wp.tagline}
                  </p>
                </button>
              ))}

              {activeTrack === 'seo' && seoPlans.map((sp) => (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => setSelectedPlanId(sp.id)}
                  className={`p-5 rounded-3xl border-2 text-left transition-all ${
                    selectedPlanId === sp.id 
                      ? 'bg-white border-black text-slate-900 shadow-lg' 
                      : 'bg-white border-black/5 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${selectedPlanId === sp.id ? 'text-orange-400' : 'text-orange-600 bg-orange-500/5 px-2.5 py-0.5 rounded-full'}`}>
                    Rs {sp.price.toLocaleString('en-IN')}/mo
                  </span>
                  <h4 className="font-semibold text-sm mt-3 text-left">{sp.name}</h4>
                  <p className={`text-[11px] mt-1 leading-normal text-left ${selectedPlanId === sp.id ? 'text-slate-900/60' : 'text-stone-500'}`}>
                    {sp.tagline}
                  </p>
                </button>
              ))}

              {activeTrack === 'combos' && comboPlans.map((cp) => (
                <button
                  key={cp.id}
                  type="button"
                  onClick={() => setSelectedPlanId(cp.id)}
                  className={`p-5 rounded-3xl border-2 text-left transition-all ${
                    selectedPlanId === cp.id 
                      ? 'bg-white border-black text-slate-900 shadow-lg' 
                      : 'bg-white border-black/5 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${selectedPlanId === cp.id ? 'text-orange-400' : 'text-orange-600 bg-orange-500/5 px-2.5 py-0.5 rounded-full'}`}>
                    Rs {cp.price.toLocaleString('en-IN')}
                  </span>
                  <h4 className="font-semibold text-sm mt-3 text-left">{cp.name}</h4>
                  <p className={`text-[11px] mt-1 leading-normal text-left ${selectedPlanId === cp.id ? 'text-slate-900/60' : 'text-stone-500'}`}>
                    {cp.tagline}
                  </p>
                </button>
              ))}
            </div>

            {/* 2. Custom Rate Card Add-ons Selector */}
            {activeTrack !== 'seo' && (
              <div className="p-6 sm:p-8 rounded-[40px] bg-white border border-black/[0.03] space-y-6 text-left">
                <h3 className="text-base font-semibold text-black text-left flex items-center gap-2">
                  <Layers size={18} className="text-orange-500" />
                  Customize Package with Addons
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-black/[0.03]">
                  
                  {/* Extra pages */}
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider text-left block">Add Extra Pages (Rs 1500/pg)</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setExtraPagesCount(prev => Math.max(0, prev - 1))}
                        className="h-8 w-8 rounded-lg bg-slate-100 border hover:bg-slate-200 font-semibold text-slate-900"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold text-black w-6 text-center">{extraPagesCount}</span>
                      <button
                        type="button"
                        onClick={() => setExtraPagesCount(prev => prev + 1)}
                        className="h-8 w-8 rounded-lg bg-slate-100 border hover:bg-slate-200 font-semibold text-slate-900"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Logo Design inclusion */}
                  <div className="space-y-2 text-left flex flex-col justify-center">
                    <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider text-left block">Logo Design Concept (+Rs 3,500)</span>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="checkbox"
                        checked={includeLogo}
                        onChange={(e) => setIncludeLogo(e.target.checked)}
                        className="h-4 w-4 rounded border-black/10 text-orange-600 accent-orange-600 cursor-pointer"
                        id="logo-addon"
                      />
                      <label htmlFor="logo-addon" className="text-xs font-semibold text-stone-600 cursor-pointer">
                        Include Custom Logo
                      </label>
                    </div>
                  </div>

                  {/* Maintenance Support months */}
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider text-left block">Support/Maintenance (Rs 1500/mo)</span>
                    <select
                      value={maintenanceMonths}
                      onChange={(e) => setMaintenanceMonths(Number(e.target.value))}
                      className="w-full bg-white border rounded-xl py-2 px-3 text-xs text-stone-700 outline-none cursor-pointer"
                    >
                      <option value={0}>No maintenance</option>
                      <option value={1}>1 Month Support</option>
                      <option value={3}>3 Months Support</option>
                      <option value={6}>6 Months Support</option>
                      <option value={12}>1 Year Maintenance</option>
                    </select>
                  </div>

                </div>
              </div>
            )}

            {/* 3. Package Inclusions checkboard list */}
            <div className="p-6 sm:p-8 rounded-[40px] bg-white border border-black/[0.03] text-left">
              <h3 className="text-xs font-semibold text-black uppercase tracking-wider mb-4 text-left">Package Inclusions Checklist</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-left">
                    <div className="h-4 w-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="text-emerald-600" size={10} />
                    </div>
                    <span className="text-xs text-stone-600 text-left">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right panel: Summary, Price displays, & Lead form */}
          <div className="lg:col-span-4 rounded-[40px] bg-slate-900 border border-black/5 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.15),transparent_60%)]" />
            
            <div className="relative space-y-6 text-left">
              <div>
                <span className="inline-flex items-center gap-1 rounded bg-orange-600 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                  {plan.period === 'Month' ? 'Monthly Plan' : plan.period === 'Saver Package' ? 'Saver Bundle' : 'Fixed Cost'}
                </span>
                <h3 className="text-lg font-semibold text-white mt-2 text-left">{plan.name}</h3>
                <p className="text-[11px] text-white/55 mt-0.5 text-left">{plan.tagline}</p>
              </div>

              {/* Exact pricing summary */}
              <div className="py-5 border-y border-white/10 space-y-1.5 text-left">
                <span className="text-[10px] uppercase text-white/45 tracking-wider block text-left">Your Estimated Quotation</span>
                <div className="text-3xl font-semibold text-white text-left">
                  Rs {totalEstimate.toLocaleString('en-IN')}
                  {plan.period === 'Month' && <span className="text-sm text-white/45 font-medium"> / Month</span>}
                </div>
                <div className="text-[10px] text-orange-400 font-semibold flex items-center gap-1.5 text-left pt-1">
                  <Clock size={11} /> Est. Delivery: {plan.timeline}
                </div>
              </div>

              {/* Booking Request Lead Capture */}
              {!submitted ? (
                <form onSubmit={handleLeadSubmit} className="space-y-3 pt-2">
                  <div className="text-left">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider text-left">Request Rates Copy</h4>
                    <p className="text-[10px] text-white/45 mt-0.5 text-left">Get a detailed PDF brochure sent to your phone!</p>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/10 py-2.5 px-3.5 text-xs text-white outline-none focus:border-orange-500/40 placeholder-white/35"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/10 py-2.5 px-3.5 text-xs text-white outline-none focus:border-orange-500/40 placeholder-white/35"
                  />

                  <input
                    type="tel"
                    required
                    placeholder="Mobile Contact *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/10 py-2.5 px-3.5 text-xs text-white outline-none focus:border-orange-500/40 placeholder-white/35"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 py-3 px-4 text-xs font-semibold text-white shadow-lg transition active:scale-[0.98] disabled:opacity-50"
                  >
                    {submitting ? 'Processing quote...' : 'Confirm Quote & Contact'}
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4 animate-scale-up">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white text-center">Quote successfully registered!</h4>
                    <p className="text-[10px] text-white/55 max-w-xs mx-auto mt-1 leading-relaxed text-center">
                      Our growth executive has received your specific package configurations and will reach out on {phone} to finalize!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Trust disclaimer */}
            <div className="pt-6 border-t border-white/10 text-[10px] text-white/45 leading-relaxed text-left flex items-start gap-2">
              <Lock size={12} className="text-orange-500 shrink-0 mt-0.5" />
              <span className="text-left">
                50% advance to begin. Rest 50% on delivery before handover. Google citation results dynamic in 60-90 days.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
