'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send enquiry');

      const whatsappMsg = `Hi Team, I just submitted an inquiry on your website. \n\n*Name:* ${formData.name}\n*Service:* ${formData.service}\n*Message:* ${formData.message}\n\nLooking forward to hearing from you!`;
      const waUrl = `https://wa.me/917508657479?text=${encodeURIComponent(whatsappMsg)}`;

      setTimeout(() => { window.open(waUrl, '_blank'); }, 1000);

      setStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const inputClass = "w-full rounded-2xl border border-black/[0.05] bg-stone-50 px-5 py-4 text-sm text-black outline-none placeholder:text-black/30 focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5 transition-all duration-300";

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <section id="contact-form" className="scroll-mt-28 pb-16 sm:pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl rounded-[40px] border border-black/[0.03] bg-white p-6 shadow-xl shadow-black/5 backdrop-blur-xl sm:p-10 lg:p-16"
      >
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Left: copy */}
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.p variants={fadeInUp} className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-600 sm:text-xs">
              Contact Form
            </motion.p>
            <motion.h2 variants={fadeInUp} className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl leading-[1.2]">
              Tell us what your business <span className="text-black/40">needs next.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-6 text-sm leading-relaxed text-black/60 sm:text-base">
              Share whether you need website design and development, digital marketing, branding, or a combination. Our team will get back to you within 24 hours.
            </motion.p>

            {/* Contact info */}
            <motion.div variants={fadeInUp} className="mt-10 space-y-4">
              <a href="tel:+917508657479" className="group flex items-center gap-4 text-sm font-bold text-black/60 hover:text-black transition-all duration-300">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/5 text-orange-600 text-lg shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">📞</span>
                +91 7508657479
              </a>
              <a href="mailto:geetanjalisoftwares@gmail.com" className="group flex items-center gap-4 text-sm font-bold text-black/60 hover:text-black transition-all duration-300">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/5 text-orange-600 text-lg shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">✉️</span>
                geetanjalisoftwares@gmail.com
              </a>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit} 
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-black/30 ml-2">Full Name</label>
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
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-black/30 ml-2">Email Address</label>
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
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-black/30 ml-2">Required Service</label>
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
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-black/30 ml-2">Project Brief</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly describe your goals..."
                rows={5}
                required
                className={inputClass + " resize-none"}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'loading'}
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-8 py-5 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition-all hover:bg-orange-600 disabled:opacity-50 sm:w-fit"
            >
              {status === 'loading' ? 'Sending Enquiry...' : 'Start Your Journey'}
            </motion.button>

            {status === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold text-green-600 bg-green-50 p-4 rounded-xl border border-green-100 italic">✨ Enquiry sent successfully! We&apos;ll be in touch soon.</motion.p>
            )}
            {status === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 italic">❌ Something went wrong. Please try again.</motion.p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
