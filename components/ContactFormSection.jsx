'use client';

import React, { useState } from 'react';

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

  const inputClass = "w-full rounded-lg border border-black/10 bg-stone-100/90 px-4 py-3 text-sm text-black outline-none placeholder:text-black/40 focus:border-orange-500/30 focus:ring-2 focus:ring-orange-500/10 transition";

  return (
    <section id="contact-form" className="scroll-mt-28 pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl rounded-lg border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Left: copy */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
              Contact Form
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-black sm:text-3xl lg:text-4xl">
              Tell us what your business needs next.
            </h2>
            <p className="mt-4 text-sm leading-7 text-black/70 sm:text-base">
              Share whether you need website design and development, digital marketing, branding, or a combination.
            </p>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              <a href="tel:+917508657479" className="flex items-center gap-3 text-sm font-medium text-black/60 hover:text-black transition">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 text-base shrink-0">📞</span>
                +91 7508657479
              </a>
              <a href="mailto:geetanjalisoftwares@gmail.com" className="flex items-center gap-3 text-sm font-medium text-black/60 hover:text-black transition">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 text-base shrink-0">✉️</span>
                geetanjalisoftwares@gmail.com
              </a>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className={inputClass}
              />
            </div>
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="Service you need"
              required
              className={inputClass}
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project"
              rows={5}
              required
              className={inputClass + " resize-none"}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 sm:w-fit sm:px-8"
            >
              {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
            </button>
            {status === 'success' && (
              <p className="text-sm font-medium text-green-600">Enquiry sent successfully! We&apos;ll be in touch soon.</p>
            )}
            {status === 'error' && (
              <p className="text-sm font-medium text-red-600">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
