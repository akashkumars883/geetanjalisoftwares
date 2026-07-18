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
  AlertCircle,
  ArrowRight
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
    <section id="estimator" className="py-24 relative overflow-hidden bg-background">
      
      <div className="mx-auto max-w-7xl px-6 relative">
        
        {/* Title Bar */}
        <div className="text-center max-w-3xl mx-auto mb-16 border-b border-foreground/10 pb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-primary"></span>
            <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Calculator size={14} />
              Budget Estimator
            </span>
            <span className="h-[1px] w-8 bg-primary"></span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground mb-6">
            ESTIMATE YOUR <br /> <span className="text-primary">PROJECT COST</span>
          </h2>
          <p className="text-lg leading-relaxed text-foreground/70 font-medium">
            Configure website packages, growth marketing retainers, or super-saver combos to view your estimated price dynamically.
          </p>
        </div>

        {/* Categories Tab Selector bar */}
        <div className="flex justify-center max-w-lg mx-auto bg-foreground/5 p-1.5 mb-16 border border-foreground/10">
          <button
            type="button"
            onClick={() => handleTrackChange('web')}
            className={`flex-1 py-3 px-4 font-heading text-[10px] font-bold uppercase tracking-widest transition-colors ${
              activeTrack === 'web' ? 'bg-primary text-white' : 'text-foreground hover:text-primary'
            }`}
          >
            Website Dev
          </button>
          <button
            type="button"
            onClick={() => handleTrackChange('seo')}
            className={`flex-1 py-3 px-4 font-heading text-[10px] font-bold uppercase tracking-widest transition-colors ${
              activeTrack === 'seo' ? 'bg-primary text-white' : 'text-foreground hover:text-primary'
            }`}
          >
            SEO plans
          </button>
          <button
            type="button"
            onClick={() => handleTrackChange('combos')}
            className={`flex-1 py-3 px-4 font-heading text-[10px] font-bold uppercase tracking-widest transition-colors ${
              activeTrack === 'combos' ? 'bg-primary text-white' : 'text-foreground hover:text-primary'
            }`}
          >
            Bundles
          </button>
        </div>

        {/* Configurator Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left panel: Plan selector cards & options */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Selecting Plan Card options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {activeTrack === 'web' && webPlans.map((wp) => (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => setSelectedPlanId(wp.id)}
                  className={`p-6 border text-left transition-colors flex flex-col justify-between ${
                    selectedPlanId === wp.id 
                      ? 'bg-primary/5 border-primary shadow-sm' 
                      : 'bg-foreground/5 border-foreground/10 hover:border-primary'
                  }`}
                >
                  <span className={`font-heading text-[10px] font-bold uppercase tracking-widest ${selectedPlanId === wp.id ? 'text-primary' : 'text-foreground/50'}`}>
                    Rs {wp.price.toLocaleString('en-IN')}
                  </span>
                  <div className="mt-6 mb-4">
                    <h4 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">{wp.name}</h4>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-foreground/60 border-t border-foreground/10 pt-4">
                    {wp.tagline}
                  </p>
                </button>
              ))}

              {activeTrack === 'seo' && seoPlans.map((sp) => (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => setSelectedPlanId(sp.id)}
                  className={`p-6 border text-left transition-colors flex flex-col justify-between ${
                    selectedPlanId === sp.id 
                      ? 'bg-primary/5 border-primary shadow-sm' 
                      : 'bg-foreground/5 border-foreground/10 hover:border-primary'
                  }`}
                >
                  <span className={`font-heading text-[10px] font-bold uppercase tracking-widest ${selectedPlanId === sp.id ? 'text-primary' : 'text-foreground/50'}`}>
                    Rs {sp.price.toLocaleString('en-IN')}/mo
                  </span>
                  <div className="mt-6 mb-4">
                    <h4 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">{sp.name}</h4>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-foreground/60 border-t border-foreground/10 pt-4">
                    {sp.tagline}
                  </p>
                </button>
              ))}

              {activeTrack === 'combos' && comboPlans.map((cp) => (
                <button
                  key={cp.id}
                  type="button"
                  onClick={() => setSelectedPlanId(cp.id)}
                  className={`p-6 border text-left transition-colors flex flex-col justify-between ${
                    selectedPlanId === cp.id 
                      ? 'bg-primary/5 border-primary shadow-sm' 
                      : 'bg-foreground/5 border-foreground/10 hover:border-primary'
                  }`}
                >
                  <span className={`font-heading text-[10px] font-bold uppercase tracking-widest ${selectedPlanId === cp.id ? 'text-primary' : 'text-foreground/50'}`}>
                    Rs {cp.price.toLocaleString('en-IN')}
                  </span>
                  <div className="mt-6 mb-4">
                    <h4 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">{cp.name}</h4>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-foreground/60 border-t border-foreground/10 pt-4">
                    {cp.tagline}
                  </p>
                </button>
              ))}
            </div>

            {/* 2. Custom Rate Card Add-ons Selector */}
            {activeTrack !== 'seo' && (
              <div className="p-8 bg-foreground/5 border border-foreground/10 space-y-8 text-left">
                <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground flex items-center gap-3">
                  <Layers size={24} className="text-primary" />
                  Package Addons
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-foreground/10">
                  
                  {/* Extra pages */}
                  <div className="space-y-4 text-left">
                    <span className="font-heading text-[10px] uppercase font-bold tracking-widest text-foreground/50 block">Extra Pages (Rs 1500/pg)</span>
                    <div className="flex items-center gap-4 bg-background border border-foreground/20 p-1">
                      <button
                        type="button"
                        onClick={() => setExtraPagesCount(prev => Math.max(0, prev - 1))}
                        className="h-10 w-10 bg-foreground/5 hover:bg-primary hover:text-white transition-colors font-heading text-lg font-bold text-foreground"
                      >
                        -
                      </button>
                      <span className="font-heading text-base font-bold text-foreground w-8 text-center">{extraPagesCount}</span>
                      <button
                        type="button"
                        onClick={() => setExtraPagesCount(prev => prev + 1)}
                        className="h-10 w-10 bg-foreground/5 hover:bg-primary hover:text-white transition-colors font-heading text-lg font-bold text-foreground"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Logo Design inclusion */}
                  <div className="space-y-4 text-left flex flex-col justify-start">
                    <span className="font-heading text-[10px] uppercase font-bold tracking-widest text-foreground/50 block">Logo Design (+Rs 3,500)</span>
                    <label className="flex items-center gap-3 cursor-pointer group mt-2">
                      <div className={`h-6 w-6 border transition-colors flex items-center justify-center ${includeLogo ? 'bg-primary border-primary text-white' : 'border-foreground/20 bg-background group-hover:border-primary'}`}>
                        {includeLogo && <Check size={14} strokeWidth={3} />}
                      </div>
                      <input
                        type="checkbox"
                        checked={includeLogo}
                        onChange={(e) => setIncludeLogo(e.target.checked)}
                        className="hidden"
                        id="logo-addon"
                      />
                      <span className="font-heading text-xs font-bold uppercase tracking-widest text-foreground/70 group-hover:text-primary transition-colors">
                        Add Logo
                      </span>
                    </label>
                  </div>

                  {/* Maintenance Support months */}
                  <div className="space-y-4 text-left">
                    <span className="font-heading text-[10px] uppercase font-bold tracking-widest text-foreground/50 block">Maintenance (Rs 1500/mo)</span>
                    <select
                      value={maintenanceMonths}
                      onChange={(e) => setMaintenanceMonths(Number(e.target.value))}
                      className="w-full bg-background border border-foreground/20 py-3 px-4 font-heading text-xs font-bold uppercase tracking-widest text-foreground outline-none cursor-pointer focus:border-primary appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        backgroundSize: '12px',
                      }}
                    >
                      <option className="bg-background text-foreground" value={0}>None</option>
                      <option className="bg-background text-foreground" value={1}>1 Month</option>
                      <option className="bg-background text-foreground" value={3}>3 Months</option>
                      <option className="bg-background text-foreground" value={6}>6 Months</option>
                      <option className="bg-background text-foreground" value={12}>1 Year</option>
                    </select>
                  </div>

                </div>
              </div>
            )}

            {/* 3. Package Inclusions checkboard list */}
            <div className="p-8 bg-foreground/5 border border-foreground/10 text-left">
              <h3 className="font-heading text-[10px] font-bold text-primary uppercase tracking-widest mb-6">Package Inclusions Checklist</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-left">
                    <div className="h-5 w-5 bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 border border-primary/20 text-primary">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-foreground/80 leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right panel: Summary, Price displays, & Lead form */}
          <div className="lg:col-span-4 bg-primary border border-foreground/10 text-white p-8 flex flex-col justify-between relative overflow-hidden h-fit sticky top-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-background/20 via-transparent to-transparent opacity-50" />
            
            <div className="relative space-y-8 text-left z-10">
              <div>
                <span className="inline-flex items-center gap-2 bg-background px-3 py-1 font-heading text-[9px] font-bold uppercase tracking-widest text-foreground">
                  {plan.period === 'Month' ? 'Monthly Plan' : plan.period === 'Saver Package' ? 'Saver Bundle' : 'Fixed Cost'}
                </span>
                <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-white mt-6 text-left">{plan.name}</h3>
                <p className="text-sm font-medium text-white/70 mt-2 leading-relaxed">{plan.tagline}</p>
              </div>

              {/* Exact pricing summary */}
              <div className="py-8 border-y border-white/20 space-y-3 text-left">
                <span className="font-heading text-[10px] uppercase font-bold text-white/50 tracking-widest block text-left">Estimated Quotation</span>
                <div className="font-heading text-5xl font-bold tracking-tighter text-white text-left">
                  Rs {totalEstimate.toLocaleString('en-IN')}
                  {plan.period === 'Month' && <span className="text-2xl text-white/50">/MO</span>}
                </div>
                <div className="font-heading text-[10px] text-background font-bold uppercase tracking-widest flex items-center gap-2 text-left pt-4">
                  <Clock size={12} /> EST. DELIVERY: {plan.timeline}
                </div>
              </div>

              {/* Booking Request Lead Capture */}
              {!submitted ? (
                <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
                  <div className="text-left mb-6">
                    <h4 className="font-heading text-xl font-bold text-white uppercase tracking-tight text-left">Request Quotation</h4>
                    <p className="text-xs font-medium text-white/60 mt-2 text-left">Get a detailed PDF brochure sent to your phone!</p>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-white/30 bg-transparent py-4 text-sm font-medium text-white outline-none focus:border-white placeholder-white/40 transition-colors px-2"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-white/30 bg-transparent py-4 text-sm font-medium text-white outline-none focus:border-white placeholder-white/40 transition-colors px-2"
                  />

                  <input
                    type="tel"
                    required
                    placeholder="Mobile Contact"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-b border-white/30 bg-transparent py-4 text-sm font-medium text-white outline-none focus:border-white placeholder-white/40 transition-colors px-2"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full flex items-center justify-center gap-4 bg-background py-5 px-6 font-heading text-xs font-bold uppercase tracking-widest text-foreground transition-transform active:scale-[0.98] disabled:opacity-50 mt-4"
                  >
                    <span className="relative z-10">{submitting ? 'PROCESSING...' : 'CONFIRM QUOTE'}</span>
                    {!submitting && <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />}
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-6 animate-scale-up">
                  <div className="h-16 w-16 bg-background flex items-center justify-center text-foreground mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <h4 className="font-heading text-2xl font-bold uppercase tracking-tight text-white text-center">Quote Registered!</h4>
                    <p className="text-sm font-medium text-white/70 max-w-xs mx-auto mt-4 leading-relaxed text-center">
                      Our growth executive has received your specific package configurations and will reach out on <strong className="text-white">{phone}</strong> to finalize!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Trust disclaimer */}
            <div className="pt-8 border-t border-white/20 font-heading text-[9px] font-bold uppercase tracking-widest text-white/50 leading-relaxed text-left flex items-start gap-3 relative z-10">
              <Lock size={14} className="text-background shrink-0" />
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
