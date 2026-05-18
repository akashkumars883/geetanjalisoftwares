'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: `Phone: ${formData.phone}\n\nMessage: ${formData.message}`
        }),
      });

      if (!res.ok) throw new Error('Failed to send enquiry');

      const whatsappMsg = `Hi Team, I just submitted an inquiry on your website. \n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Service:* ${formData.service}\n*Message:* ${formData.message}\n\nLooking forward to hearing from you!`;
      const waUrl = `https://wa.me/917508657479?text=${encodeURIComponent(whatsappMsg)}`;

      setTimeout(() => { window.open(waUrl, '_blank'); }, 1000);

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const inputClass = "w-full rounded-xl border border-black/5 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500 focus:bg-white transition-all duration-300";

  return (
    <section id="contact-form" className="relative w-full bg-transparent pt-8 pb-6 sm:pt-12 sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-12">
          {/* Left Side: Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-600">
              Get In Touch
            </span>
            <h2 className="mt-3 text-3xl font-normal tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
              Start Your Journey
            </h2>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl"
          >
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Share your project requirements, goals, or timeline with us. Our technical team will review your brief and respond within 24 hours.
            </p>
          </motion.div>
        </div>

        {/* Content Layout */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:mt-16 items-stretch">
          
          {/* Contact Details (Left Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between h-full lg:col-span-5"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-normal tracking-tight text-slate-900 sm:text-3xl">
                Direct Channels
              </h3>
              <p className="text-base leading-relaxed text-slate-600">
                Have an urgent requirement or prefer direct communication? Reach out to our dedicated support lines instantly.
              </p>
            </div>

            <div className="flex flex-col gap-6 pt-12 mt-auto">
              <a href="tel:+917508657479" className="group flex items-center gap-6 rounded-2xl border border-black/5 bg-slate-50 p-6 shadow-inner transition-all hover:border-orange-600 hover:bg-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white shrink-0">
                  <Phone size={24} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Phone Support</span>
                  <span className="mt-1 text-base font-semibold text-slate-900 truncate">+91 7508657479</span>
                </div>
              </a>

              <a href="mailto:geetanjalisoftwares@gmail.com" className="group flex items-center gap-6 rounded-2xl border border-black/5 bg-slate-50 p-6 shadow-inner transition-all hover:border-orange-600 hover:bg-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white shrink-0">
                  <Mail size={24} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</span>
                  <span className="mt-1 text-base font-semibold text-slate-900 truncate">geetanjalisoftwares@gmail.com</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Form Container (Right Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between h-full lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full gap-6">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Required Service</label>
                    <input
                      type="text"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      placeholder="e.g. Website & SEO Package"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Project Brief</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your goals, timeline, or requirements..."
                    rows={5}
                    required
                    className={inputClass + " resize-none"}
                  />
                </div>
              </div>
              
              <div className="mt-auto pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 py-4 px-8 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition active:scale-[0.98] disabled:opacity-50 sm:w-fit"
                >
                  {status === 'loading' ? 'Sending Enquiry...' : 'Submit Project Brief'}
                </button>

                {status === 'success' && (
                  <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 shadow-sm">
                    ✨ Enquiry sent successfully! We&apos;ll be in touch within 24 hours.
                  </div>
                )}
                {status === 'error' && (
                  <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm font-semibold text-rose-800 shadow-sm">
                    ❌ Something went wrong. Please try again.
                  </div>
                )}
              </div>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
