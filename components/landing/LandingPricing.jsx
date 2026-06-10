'use client';

import React from 'react';

const plans = [
  {
    name: 'Basic',
    price: '₹5,999',
    originalPrice: '₹9,999',
    popular: false,
    description: 'Perfect for startups & small businesses starting their online journey.',
    features: [
      { text: '5 Pages Website', included: true },
      { text: 'Responsive Design (Mobile + Desktop)', included: true },
      { text: 'Contact Form', included: true },
      { text: 'WhatsApp Integration', included: true },
      { text: 'Google Maps Integration', included: true },
      { text: '1 Year Free Hosting', included: true },
      { text: '.com Domain (1 Year Free)', included: true },
      { text: 'Basic SEO Setup', included: true },
      { text: 'Social Media Links', included: true },
      { text: 'Live Demo Before Launch', included: true },
      { text: 'Professional Email Setup', included: false },
      { text: 'Google Business Profile Setup', included: false },
      { text: 'Blog Setup', included: false },
    ],
    cta: 'Get Started',
    highlight: 'Best for new businesses',
  },
  {
    name: 'Business',
    price: '₹12,999',
    originalPrice: '₹19,999',
    popular: true,
    description: 'Ideal for growing businesses that need a complete online presence.',
    features: [
      { text: '10 Pages Website', included: true },
      { text: 'Premium Custom Design', included: true },
      { text: 'Contact Form', included: true },
      { text: 'WhatsApp Integration', included: true },
      { text: 'Google Maps Integration', included: true },
      { text: '1 Year Free Hosting', included: true },
      { text: '.com Domain (1 Year Free)', included: true },
      { text: 'Advanced SEO Setup', included: true },
      { text: 'Social Media Integration', included: true },
      { text: 'Live Demo Before Launch', included: true },
      { text: 'Professional Email Setup', included: true },
      { text: 'Google Business Profile Setup', included: true },
      { text: 'Blog Setup (3 Posts)', included: true },
      { text: 'Speed Optimization', included: true },
      { text: 'Google Analytics Setup', included: true },
    ],
    cta: 'Most Popular',
    highlight: '🔥 Recommended for most businesses',
  },
  {
    name: 'Premium',
    price: '₹24,999',
    originalPrice: '₹39,999',
    popular: false,
    description: 'For established brands that want a market-leading digital presence.',
    features: [
      { text: '20+ Pages Website', included: true },
      { text: 'Premium Custom Design + Animations', included: true },
      { text: 'Advanced Contact Forms', included: true },
      { text: 'WhatsApp + Chatbot Integration', included: true },
      { text: 'Google Maps + Location Pages', included: true },
      { text: '2 Years Free Hosting', included: true },
      { text: '.com Domain (2 Years Free)', included: true },
      { text: 'Complete SEO Package', included: true },
      { text: 'Full Social Media Integration', included: true },
      { text: 'Live Demo + 2 Revisions', included: true },
      { text: 'Professional Email (5 IDs)', included: true },
      { text: 'Google Business Profile + Local SEO', included: true },
      { text: 'Blog Setup (10 Posts)', included: true },
      { text: 'Speed + Core Web Vitals Optimization', included: true },
      { text: 'Google Analytics + Search Console', included: true },
      { text: 'Priority 24/7 Support', included: true },
      { text: 'Monthly Maintenance (6 Months Free)', included: true },
    ],
    cta: 'Go Premium',
    highlight: 'For serious business growth',
  },
];

export default function LandingPricing() {
  const phoneNumber = '917508657479';

  const handleClick = (planName) => {
    const msg = encodeURIComponent(`Hi! I'm interested in the ${planName} website package (${planName === 'Basic' ? '₹5,999' : planName === 'Business' ? '₹12,999' : '₹24,999'}). Please share more details.`);
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
  };

  return (
    <section id="pricing" className="relative bg-slate-950 py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-[#6366f1]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-[#22c55e]/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Transparent Pricing —{' '}
            <span className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent">
              No Hidden Costs
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Choose the plan that fits your needs. All prices include hosting + domain. Upgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'border-[#6366f1]/50 bg-gradient-to-b from-[#6366f1]/10 to-slate-900 shadow-2xl shadow-[#6366f1]/20'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#22c55e] px-4 py-1 text-xs font-bold text-white shadow-lg">
                    🔥 Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                <div className="mt-6 flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-lg text-slate-500 line-through">{plan.originalPrice}</span>
                </div>
                <p className="mt-2 text-xs text-[#22c55e]">
                  Save {plan.name === 'Basic' ? '40%' : plan.name === 'Business' ? '35%' : '37%'} — Limited Time Offer
                </p>
              </div>

              {/* Features */}
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={`text-sm ${feature.included ? 'text-slate-300' : 'text-slate-600'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleClick(plan.name)}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-300 active:scale-95 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#6366f1] to-[#22c55e] text-white shadow-lg hover:shadow-xl hover:opacity-90'
                    : 'border border-slate-700 bg-slate-800 text-white hover:border-[#6366f1] hover:bg-[#6366f1]/10'
                }`}
              >
                {plan.popular ? (
                  <>
                    🚀 {plan.cta}
                  </>
                ) : (
                  <>
                    💬 Enquire on WhatsApp
                  </>
                )}
              </button>

              {/* Highlight text */}
              <p className="mt-4 text-center text-xs text-slate-500">{plan.highlight}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Need a custom plan?{' '}
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hi! I need a custom website plan. Please call me back.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#818cf8] hover:text-[#6366f1]"
            >
              Contact us for a tailored quote →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}