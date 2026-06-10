'use client';

import React, { useState } from 'react';

export default function LandingLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'website-design',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const phoneNumber = '917508657479';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const msg = encodeURIComponent(
      `🚀 New Website Lead!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service === 'website-design' ? 'Website Design' : formData.service === 'ecommerce' ? 'E-Commerce' : formData.service === 'seo' ? 'SEO' : formData.service === 'redesign' ? 'Redesign' : 'Other'}\n\nSource: Google Ads Landing Page`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');

    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('leads').insert([
        {
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          source: 'google-ads-landing',
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.log('Supabase save optional:', err);
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
      });
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="lead-form" className="relative bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-bold text-slate-900">Thank You! 🎉</h3>
            <p className="mt-4 text-slate-600">
              We have received your enquiry. Our team will contact you on WhatsApp within 30 minutes during business hours.
            </p>
            <p className="mt-6 text-sm text-slate-400">
              In the meantime, check your WhatsApp — we might have already messaged you!
            </p>
            <a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-600 hover:shadow-lg"
            >
              💬 Open WhatsApp
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="relative bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Get Your{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
              Free Consultation
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Fill the form below and we will call you back within 30 minutes. No commitment required.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Rajesh Kumar"
                className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="e.g. 9876543210"
                className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-sm font-semibold text-slate-700">
                I Need Help With
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="website-design">New Website Design</option>
                <option value="ecommerce">E-Commerce Website</option>
                <option value="seo">SEO & Digital Marketing</option>
                <option value="redesign">Website Redesign</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                100% Privacy Guaranteed
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                30 Min Response Time
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                No Spam Guaranteed
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                '🚀 Get Free Consultation'
              )}
            </button>
          </div>
        </form>

        {/* Extra CTA */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Prefer WhatsApp?{' '}
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hi! I need a professional website for my business. Please share details.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Chat with us directly →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}