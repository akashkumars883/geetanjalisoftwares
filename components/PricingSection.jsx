'use client';

import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Rs. 4,999',
    description: 'For creators and small brands launching their first automation stack.',
    points: ['1 account', 'Auto replies', 'Basic auto-like', 'Usage tracking'],
    badge: 'Best for launch',
  },
  {
    name: 'Growth',
    price: 'Rs. 9,999',
    description: 'For businesses ready to scale with influencer and DM workflows.',
    points: ['3 accounts', 'Influencer workflows', 'Scheduling', 'Advanced analytics'],
    badge: 'Most popular',
    featured: true,
  },
  {
    name: 'Pro',
    price: 'Custom',
    description: 'For agencies that need multi-account operations and premium support.',
    points: ['10 accounts', 'Priority onboarding', 'Custom knowledge base', 'White-glove support'],
    badge: 'Agency tier',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-28 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-700 sm:text-sm">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Clear plans, real feature unlocks, and promo-code discounts.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Every plan is now tied to actual product capabilities so users get the features they paid for.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative overflow-hidden rounded-[34px] border p-6 shadow-[0_24px_80px_rgba(37,99,235,0.08)] transition duration-300 hover:-translate-y-1 sm:p-7 ${
                plan.featured
                  ? 'border-blue-300 bg-slate-950 text-white'
                  : 'border-white/70 bg-white/85'
              }`}
            >
              <div className={`absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl ${plan.featured ? 'bg-blue-500/15' : 'bg-blue-500/10'}`} />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${plan.featured ? 'bg-white/10 text-blue-100' : 'bg-blue-50 text-blue-700'}`}>
                      <Sparkles size={12} />
                      {plan.badge}
                    </div>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight">{plan.name}</h3>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${plan.featured ? 'bg-white/10 text-blue-200' : 'bg-blue-50 text-blue-600'}`}>
                    <ShieldCheck size={20} />
                  </div>
                </div>

                <p className={`mt-4 text-sm leading-7 ${plan.featured ? 'text-white/70' : 'text-slate-600'}`}>
                  {plan.description}
                </p>

                <p className={`mt-6 text-4xl font-black tracking-tight ${plan.featured ? 'text-white' : 'text-slate-950'}`}>
                  {plan.price}
                </p>

                <div className="mt-6 space-y-2">
                  {plan.points.map((point) => (
                    <div key={point} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${plan.featured ? 'bg-white/5 text-white/85' : 'bg-slate-50 text-slate-700'}`}>
                      <CheckCircle2 size={16} className={plan.featured ? 'text-blue-300' : 'text-blue-600'} />
                      {point}
                    </div>
                  ))}
                </div>

                <Link
                  href="/automixa"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-sm font-bold transition ${
                    plan.featured
                      ? 'bg-white text-slate-950 hover:bg-blue-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  View plan details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
