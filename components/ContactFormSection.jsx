'use client';

import React, { useState } from 'react';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

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

      if (!res.ok) {
        throw new Error('Failed to send enquiry');
      }

      // WhatsApp Auto-Redirect
      const whatsappMsg = `Hi Team, I just submitted an inquiry on your website. \n\n*Name:* ${formData.name}\n*Service:* ${formData.service}\n*Message:* ${formData.message}\n\nLooking forward to hearing from you!`;
      const waUrl = `https://wa.me/917508657479?text=${encodeURIComponent(whatsappMsg)}`;
      
      // Small delay before redirect for better UX
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1000);

      setStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact-form" className="scroll-mt-28 pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-black/10 bg-white/78 p-6 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
              Contact Form
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              Tell us what your business needs next.
            </h2>
            <p className="mt-4 text-sm leading-7 text-black/70 sm:text-base">
              Share whether you need website design and development, digital marketing, branding, or a combination of these services.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="h-13 rounded-2xl border border-black/10 bg-stone-100/90 px-4 text-sm text-black outline-none placeholder:text-black/45"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="h-13 rounded-2xl border border-black/10 bg-stone-100/90 px-4 text-sm text-black outline-none placeholder:text-black/45"
            />
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="Service you need"
              required
              className="h-13 rounded-2xl border border-black/10 bg-stone-100/90 px-4 text-sm text-black outline-none placeholder:text-black/45"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project"
              rows="5"
              required
              className="rounded-2xl border border-black/10 bg-stone-100/90 px-4 py-4 text-sm text-black outline-none placeholder:text-black/45"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 sm:w-fit sm:px-8 sm:text-base"
            >
              {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
            </button>
            {status === 'success' && (
              <p className="text-sm font-medium text-green-600">Enquiry sent successfully!</p>
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
