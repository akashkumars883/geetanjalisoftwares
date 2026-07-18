'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const openTimer = window.setTimeout(() => {
      setIsOpen(true);
    }, 1400);

    const handleOpenEnquiry = (event) => {
      const selectedService = event?.detail?.service;
      if (selectedService) {
        setFormData((prev) => ({
          ...prev,
          message: prev.message || `I am interested in ${selectedService}.`,
        }));
      }
      setIsOpen(true);
    };

    window.addEventListener('open-enquiry-popup', handleOpenEnquiry);
    return () => {
      window.clearTimeout(openTimer);
      window.removeEventListener('open-enquiry-popup', handleOpenEnquiry);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setStatus('idle');
  };

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
          service: 'Global Popup Enquiry',
          message: `Phone: ${formData.phone}\n\nMessage: ${formData.message}`
        }),
      });

      if (!res.ok) throw new Error('Failed to send enquiry');

      const whatsappMsg = `Hi Geetanjali Softwares, I'm interested in your services. \n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`;
      const waUrl = `https://wa.me/917508657479?text=${encodeURIComponent(whatsappMsg)}`;

      setTimeout(() => { 
        window.open(waUrl, '_blank'); 
        handleClose();
      }, 1000);

      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const inputClass = "w-full rounded-none border-b border-foreground/20 bg-transparent px-0 py-3 text-base text-foreground outline-none placeholder:text-foreground/30 focus:border-primary transition-all duration-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[10000] bg-background/90 backdrop-blur-md"
          />

          {/* Horizontal Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed inset-x-4 top-1/2 z-[10001] mx-auto w-full max-w-5xl -translate-y-1/2 rounded-none border border-foreground/10 bg-background shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
          >
            {/* Left Column: Branding / Pitch */}
            <div className="hidden md:flex md:w-[45%] bg-foreground/5 relative flex-col justify-between p-12 border-r border-foreground/10 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-widest text-primary mb-6">
                  <Sparkles size={12} />
                  Free Consultation
                </div>
                <h3 className="font-heading text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground leading-[0.9]">
                  BUILD THE <br /> <span className="text-primary">FUTURE</span>
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-foreground/70 font-medium max-w-sm">
                  Whether you need an enterprise web application, a sleek landing page, or a full-scale digital marketing campaign, our engineers and strategists are ready to collaborate.
                </p>
              </div>

              <div className="relative z-10 mt-12 space-y-4">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                  <CheckCircle2 size={14} className="text-primary" /> Expert Consultation
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                  <CheckCircle2 size={14} className="text-primary" /> Project Roadmap
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                  <CheckCircle2 size={14} className="text-primary" /> Transparent Pricing
                </div>
              </div>
            </div>

            {/* Right Column: Form Content */}
            <div className="flex-1 p-8 sm:p-12 relative overflow-y-auto">
              <button
                onClick={handleClose}
                className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-background text-foreground transition-all hover:border-primary hover:text-primary active:scale-95"
                aria-label="Close form"
              >
                <X size={17} />
              </button>

              <div className="md:hidden mb-8 border-b border-foreground/10 pb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                  <Sparkles size={12} />
                  Free Consultation
                </div>
                <h3 className="font-heading text-4xl font-bold uppercase tracking-tighter text-foreground leading-[0.9]">
                  BUILD THE <br /> <span className="text-primary">FUTURE</span>
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full justify-center">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 relative group">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">01. Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2 relative group">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">02. Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 relative group">
                  <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">03. WhatsApp Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2 relative group">
                  <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">04. Project Details</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Briefly describe your goals..."
                    className={inputClass + " resize-none"}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative flex w-full items-center justify-center gap-4 overflow-hidden border border-foreground/20 bg-transparent px-8 py-5 font-heading text-sm font-bold uppercase tracking-wider text-foreground transition-transform duration-300 hover:border-primary disabled:opacity-50"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
                      {status === 'loading' ? 'Transmitting...' : 'Get Free Proposal'}
                    </span>
                    <span className="relative z-10 flex items-center justify-center text-foreground transition-colors duration-300 group-hover:text-background">
                      <ArrowRight size={18} />
                    </span>
                    <div className="absolute inset-0 z-0 h-full w-full scale-x-0 transform bg-primary transition-transform duration-500 origin-left group-hover:scale-x-100" />
                  </button>

                  {status === 'success' && (
                    <div className="mt-4 border-l-2 border-primary bg-primary/5 p-3 text-xs font-heading tracking-widest uppercase text-primary text-center">
                      ✨ Sending to WhatsApp...
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="mt-4 border-l-2 border-red-500 bg-red-500/5 p-3 text-xs font-heading tracking-widest uppercase text-red-500 text-center">
                      ❌ Transmission failed.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
