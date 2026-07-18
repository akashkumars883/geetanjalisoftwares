'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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

  const inputClass = "w-full rounded-none border-b border-foreground/20 bg-transparent px-0 py-4 text-lg text-foreground outline-none placeholder:text-foreground/30 focus:border-primary transition-all duration-300";

  return (
    <section id="contact-form" className="relative w-full bg-background pt-12 pb-12 sm:pt-20 sm:pb-20 overflow-hidden border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6">

        {/* Top Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-16 lg:pb-24 border-b border-foreground/10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-foreground/60">
                Get In Touch
              </span>
            </div>
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-[7rem] font-bold uppercase tracking-tighter text-foreground leading-[0.9]">
              START YOUR <br /> <span className="text-primary">JOURNEY</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 lg:max-w-xl text-left pb-4"
          >
            <p className="text-lg leading-relaxed text-foreground/70 sm:text-xl">
              Share your project requirements, goals, or timeline with us. Our technical team will review your brief and respond within 24 hours to kickstart our collaboration.
            </p>
          </motion.div>
        </div>

        {/* Content Layout */}
        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24 lg:mt-24">
          
          {/* Form Container (Left Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
                <div className="flex flex-col gap-2 relative group">
                  <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">01. Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2 relative group">
                  <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">02. Email Address</label>
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

              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
                <div className="flex flex-col gap-2 relative group">
                  <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">03. Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2 relative group">
                  <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">04. Required Service</label>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder="Website & SEO Package"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 relative group">
                <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">05. Project Brief</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Briefly describe your goals, timeline, or requirements..."
                  rows={4}
                  required
                  className={inputClass + " resize-none"}
                />
              </div>
              
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-4 overflow-hidden border border-foreground/20 bg-transparent px-10 py-5 font-heading text-sm font-bold uppercase tracking-wider text-foreground transition-transform duration-300 hover:border-primary disabled:opacity-50"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
                    {status === 'loading' ? 'Transmitting...' : 'Submit Brief'}
                  </span>
                  <span className="relative z-10 flex items-center justify-center text-foreground transition-colors duration-300 group-hover:text-background">
                    <ArrowRight size={18} />
                  </span>
                  <div className="absolute inset-0 z-0 h-full w-full scale-x-0 transform bg-primary transition-transform duration-500 origin-left group-hover:scale-x-100" />
                </button>
                <p className="mt-6 max-w-xl text-xs leading-relaxed text-foreground/40 font-heading uppercase tracking-widest">
                  By submitting, you agree to our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                </p>

                {status === 'success' && (
                  <div className="mt-6 border-l-2 border-primary bg-primary/5 p-4 text-sm font-heading tracking-widest uppercase text-primary">
                    ✨ Enquiry sent. We'll be in touch shortly.
                  </div>
                )}
                {status === 'error' && (
                  <div className="mt-6 border-l-2 border-red-500 bg-red-500/5 p-4 text-sm font-heading tracking-widest uppercase text-red-500">
                    ❌ Transmission failed. Please try again.
                  </div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Contact Details (Right Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-end border-t border-foreground/10 lg:border-t-0 lg:border-l lg:pl-16 pt-16 lg:pt-0"
          >
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                  Direct Line
                </h3>
                <p className="text-lg leading-relaxed text-foreground/60">
                  Have an urgent requirement or prefer direct communication? Reach out to our technical team instantly.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <a href="tel:+917508657479" className="group flex items-start gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-background">
                    <Phone size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">Phone Support</span>
                    <span className="mt-2 text-xl font-medium text-foreground transition-colors group-hover:text-primary">+91 7508657479, 6201231875</span>
                  </div>
                </a>

                <a href="mailto:geetanjalisoftwares@gmail.com" className="group flex items-start gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-background">
                    <Mail size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">Email Address</span>
                    <span className="mt-2 text-xl font-medium text-foreground transition-colors group-hover:text-primary break-all">geetanjalisoftwares@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
