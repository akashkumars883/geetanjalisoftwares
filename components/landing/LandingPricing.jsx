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
    <section id="pricing" className="relative bg-gradient-to-b from-white to-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Transparent Pricing —{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              No Hidden Costs
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500">
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
                  ? 'border-blue-200 bg-white shadow-2xl shadow-blue-500/10'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                    🔥 Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
                <div className="mt-6 flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-lg text-slate-400 line-through">{plan.originalPrice}</span>
                </div>
                <p className="mt-2 text-xs text-emerald-600">
                  Save {plan.name === 'Basic' ? '40%' : plan.name === 'Business' ? '35%' : '37%'} — Limited Time Offer
                </p>
              </div>

              {/* Features */}
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={`text-sm ${feature.included ? 'text-slate-600' : 'text-slate-300'}`}>
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
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:opacity-90'
                    : 'border-2 border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {plan.popular ? (
                  <>🚀 {plan.cta}</>
                ) : (
                  <>💬 Enquire on WhatsApp</>
                )}
              </button>

              {/* Highlight text */}
              <p className="mt-4 text-center text-xs text-slate-400">{plan.highlight}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400">
            Need a custom plan?{' '}
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hi! I need a custom website plan. Please call me back.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Contact us for a tailored quote →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}