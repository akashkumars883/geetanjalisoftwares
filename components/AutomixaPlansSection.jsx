'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, BadgePercent, Sparkles, ArrowRight } from 'lucide-react';
import { automixaPlans } from '@/lib/automixa';

export default function AutomixaPlansSection() {
  const [selectedPlan, setSelectedPlan] = useState(automixaPlans[1].id);
  const [promoCode, setPromoCode] = useState('');
  const [quote, setQuote] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    note: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const selectedPlanData = automixaPlans.find((plan) => plan.id === selectedPlan) || automixaPlans[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateQuote = async () => {
    setLoadingQuote(true);
    try {
      const res = await fetch('/api/automixa/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          promoCode,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not calculate price');
      }

      setQuote(data);
    } catch (error) {
      setQuote({
        error: error.message,
      });
    } finally {
      setLoadingQuote(false);
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const quoteRes = await fetch('/api/automixa/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          promoCode,
        }),
      });

      const quoteData = await quoteRes.json();
      if (!quoteRes.ok) {
        throw new Error(quoteData.error || 'Could not calculate plan quote');
      }

      const leadMessage = `
Selected Plan: ${quoteData.plan.name}
Base Price: Rs. ${quoteData.pricing.basePrice}
Discount: Rs. ${quoteData.pricing.discountAmount}
Final Price: Rs. ${quoteData.pricing.finalPrice}
Promo Code: ${promoCode || 'N/A'}
Business: ${formData.business || 'N/A'}
Notes: ${formData.note || 'N/A'}
Enabled Features:
${quoteData.enabledFeatures.map((feature) => `- ${feature}`).join('\n')}
      `.trim();

      const leadRes = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: `Automixa ${quoteData.plan.name}`,
          message: leadMessage,
        }),
      });

      if (!leadRes.ok) {
        const leadError = await leadRes.json();
        throw new Error(leadError.error || 'Failed to submit request');
      }

      setQuote(quoteData);
      window.location.href = '/contact?from=automixa';
    } catch (error) {
      setQuote({
        error: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pb-20 pt-4 sm:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-700 sm:text-sm">
            Automixa Pricing
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">
            Pick a plan, add a promo code, and unlock the right Instagram automation stack.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
            This is where users can choose their plan, enter a promo code for discount, and see which automation features they get.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {automixaPlans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`group text-left rounded-[32px] border p-6 shadow-xl transition duration-300 hover:-translate-y-1 ${
                  isSelected
                    ? 'border-orange-500/30 bg-orange-500/[0.03]'
                    : 'border-black/5 bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">
                      {plan.billing}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-black">
                      {plan.name}
                    </h2>
                  </div>
                  {isSelected && (
                    <span className="rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      Selected
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm leading-7 text-black/60">{plan.description}</p>

                <p className="mt-5 text-3xl font-bold tracking-tight text-black">
                  {plan.price === 19999 ? 'Custom' : `Rs. ${plan.price.toLocaleString('en-IN')}`}
                </p>

                <div className="mt-6 space-y-2">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-2xl border border-black/[0.03] bg-stone-50/70 px-4 py-3 text-sm text-black/70"
                    >
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[36px] border border-black/5 bg-white p-6 shadow-xl sm:p-8">
            <div className="flex items-center gap-2 text-sm font-bold text-orange-700">
              <BadgePercent size={18} />
              Promo Code / Discount
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto]">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code like LAUNCH10"
                className="h-14 rounded-2xl border border-black/10 bg-[#fcfcfc] px-5 text-sm font-medium text-black outline-none transition focus:border-orange-500/40 focus:ring-4 focus:ring-orange-500/10"
              />
              <button
                type="button"
                onClick={calculateQuote}
                disabled={loadingQuote}
                className="inline-flex h-14 items-center justify-center rounded-2xl bg-black px-6 text-sm font-bold text-white transition hover:bg-orange-600 disabled:opacity-50"
              >
                {loadingQuote ? 'Checking...' : 'Calculate'}
              </button>
            </div>

            <div className="mt-8 rounded-[28px] bg-stone-50 p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-black/30">
                <Sparkles size={14} />
                Plan Preview
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-black">
                {selectedPlanData.name}
              </h3>

              <p className="mt-2 text-sm leading-7 text-black/60">
                {selectedPlanData.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">Base</p>
                  <p className="mt-2 text-lg font-bold text-black">
                    {selectedPlanData.price === 19999 ? 'Custom' : `Rs. ${selectedPlanData.price.toLocaleString('en-IN')}`}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">Discount</p>
                  <p className="mt-2 text-lg font-bold text-black">
                    {quote?.pricing?.discountAmount ? `Rs. ${quote.pricing.discountAmount.toLocaleString('en-IN')}` : 'Rs. 0'}
                  </p>
                </div>
                <div className="rounded-2xl bg-black p-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Final</p>
                  <p className="mt-2 text-lg font-bold">
                    {quote?.pricing?.finalPrice ? `Rs. ${quote.pricing.finalPrice.toLocaleString('en-IN')}` : 'Calculate to see'}
                  </p>
                </div>
              </div>

              {quote?.error && (
                <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {quote.error}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Request Setup <ArrowRight size={16} />
              </Link>
              <Link
                href="/dashboard/automixa"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-6 py-4 text-sm font-bold text-black transition hover:bg-black/5"
              >
                Admin View
              </Link>
            </div>
          </div>

          <form onSubmit={handleRequest} className="rounded-[36px] border border-black/5 bg-black p-6 text-white shadow-xl sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/40">Setup Request</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight">Send your plan request to the team</h2>

            <div className="mt-6 grid gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-white/30"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                placeholder="Email address"
                className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-white/30"
              />
              <input
                name="business"
                value={formData.business}
                onChange={handleChange}
                placeholder="Business / brand name"
                className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-white/30"
              />
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us what you want to automate..."
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-white/30 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-black transition hover:bg-orange-100 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Send Setup Request'}
              <ArrowRight size={16} />
            </button>

            <p className="mt-4 text-xs leading-6 text-white/45">
              Use the promo code field on the left to get your discount before submitting the request.
            </p>
          </form>
        </div>

        <div className="mt-10 rounded-[32px] border border-black/[0.03] bg-white p-6 shadow-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/30">Included Features</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-black">What the selected plan unlocks</h2>
            </div>
            <div className="text-sm text-black/50">
              Current plan: <span className="font-bold text-black">{selectedPlanData.name}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {selectedPlanData.features.map((feature) => (
              <div key={feature} className="rounded-2xl border border-black/[0.03] bg-stone-50 px-4 py-4 text-sm font-medium text-black/75">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
