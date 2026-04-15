'use client';

import { motion } from 'framer-motion';
import { Bot, ChartNoAxesCombined, Megaphone, ShieldCheck, Sparkles, Workflow, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <Bot className="text-blue-600" size={22} />,
    title: 'AI Comment + DM Automation',
    text: 'Auto-reply from brand voice with safety controls and lead qualification.',
  },
  {
    icon: <Workflow className="text-blue-600" size={22} />,
    title: 'Plan-Based Feature Unlocks',
    text: 'Starter, Growth, and Pro plans expose only the tools a user paid for.',
  },
  {
    icon: <ChartNoAxesCombined className="text-blue-600" size={22} />,
    title: 'Live Analytics and Usage',
    text: 'Track account activity, limits, response quality, and daily usage in real time.',
  },
  {
    icon: <Megaphone className="text-blue-600" size={22} />,
    title: 'Influencer Outreach Workflows',
    text: 'Queue leads, prospect profiles, and campaign follow-ups with scheduling.',
  },
  {
    icon: <ShieldCheck className="text-blue-600" size={22} />,
    title: 'Secure Meta Integration',
    text: 'Store tokens, manage expiry, and keep integration state in Supabase.',
  },
  {
    icon: <Smartphone className="text-blue-600" size={22} />,
    title: 'Fully Responsive SaaS UI',
    text: 'The entire product is designed to feel native on compact mobile screens.',
  },
];

export default function SaasFeatureGrid() {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-700 sm:text-sm">
            Product Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Everything users need to understand the product at a glance.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            These are the main SaaS capabilities we now present on the home page so the product feels complete, premium, and easy to grasp.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className="glass-panel rounded-[28px] p-6 shadow-[0_24px_80px_rgba(37,99,235,0.06)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {feature.text}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 rounded-[32px] bg-slate-950 p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-300">How It Feels</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                A product surface that feels like a real SaaS, not a brochure site.
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {['Plan gating', 'Promo codes', 'Live visuals'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
