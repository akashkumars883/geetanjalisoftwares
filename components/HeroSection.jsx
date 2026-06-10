'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, Send, ShieldCheck, Star, User } from 'lucide-react';

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Website Development',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: `Hero Form: ${formData.service}`,
          message: `Phone: ${formData.phone}\nService: ${formData.service}`,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit hero form');

      setStatus('success');
      setFormData({ name: '', phone: '', email: '', service: 'Website Development' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-12 bg-transparent">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">

          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-start text-left lg:col-span-7"
          >
            <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
              Building <span className="text-orange-600">Digital Solutions</span> for Modern Businesses
            </h1>

            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              We help businesses establish, manage, and scale their digital operations through websites, software, and automation solutions.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col w-full sm:w-auto sm:flex-row gap-4"
            >
              <Link
                href="/#contact-form"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-orange-600/20 transition-all duration-300 hover:bg-orange-700 hover:-translate-y-0.5 active:scale-95"
              >
                Get Free Consultation
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#portfolio"
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:-translate-y-0.5 active:scale-95"
              >
                View Portfolio
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={fadeInUp} className="mt-10 pt-6 border-t border-black/5 w-full max-w-2xl flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-700">5.0 Client Rating</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span className="text-xs font-semibold">100% ROI Tracked & Verified</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <form onSubmit={handleSubmit} className="rounded-2xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5 sm:p-6">
              <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-600">Quick Quote</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Start with a free consultation</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">Get a practical plan for website, SEO, or digital marketing.</p>
              </div>

              <div className="grid gap-3">
                <label className="relative block">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="h-12 w-full rounded-xl border border-black/10 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                  />
                </label>

                <label className="relative block">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="WhatsApp number"
                    className="h-12 w-full rounded-xl border border-black/10 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                  />
                </label>

                <label className="relative block">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email address"
                    className="h-12 w-full rounded-xl border border-black/10 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                  />
                </label>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-black/10 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-orange-500 focus:bg-white"
                >
                  <option>Website Development</option>
                  <option>Digital Marketing</option>
                  <option>SEO Services</option>
                  <option>Google Ads PPC</option>
                  <option>Branding</option>
                </select>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98] disabled:opacity-60"
                >
                  {status === 'loading' ? 'Sending...' : 'Request Callback'}
                  <Send size={15} />
                </button>
              </div>

              {status === 'success' && (
                <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                  Enquiry received. We will contact you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-3 rounded-xl bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
