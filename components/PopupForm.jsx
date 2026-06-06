'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, User, Mail, MessageSquare, Sparkles } from 'lucide-react';

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
      // Post to lead tracking backend API
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

      // Prepare professional WhatsApp message redirection
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
            className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-md"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed inset-x-3 top-1/2 z-[10001] mx-auto max-h-[calc(100vh-24px)] max-w-[520px] -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/25"
          >
            <button
              onClick={handleClose}
              className="fixed right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-slate-900 shadow-lg shadow-black/10 transition hover:bg-slate-100 active:scale-95"
              aria-label="Close form"
            >
              <X size={17} />
            </button>

            <div className="relative border-b border-black/5 bg-slate-950 px-6 py-6 text-white sm:px-8">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-200">
                <Sparkles size={12} />
                Free Consultation
              </div>
              <h3 className="mt-4 max-w-sm text-2xl font-semibold tracking-tight text-white">Tell us what you want to build.</h3>
              <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/60">
                Share your website, SEO, or marketing requirement. We will respond with the next steps.
              </p>
            </div>

            {/* Form Content */}
            <div className="p-5 sm:p-7 bg-white">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* 1. Full Name Input */}
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <div className="relative flex items-center">
                    <User size={15} className="absolute left-4 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-black/10 bg-slate-50 pl-11 pr-4 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500 focus:bg-white transition-all duration-300"
                    />
                  </div>
                </div>

                {/* 2. Email Address Input */}
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail size={15} className="absolute left-4 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@company.com"
                      className="w-full rounded-xl border border-black/10 bg-slate-50 pl-11 pr-4 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500 focus:bg-white transition-all duration-300"
                    />
                  </div>
                </div>

                {/* 3. Phone Number Input (New Separate Field) */}
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Contact Number (WhatsApp)</label>
                  <div className="relative flex items-center">
                    <Phone size={15} className="absolute left-4 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full rounded-xl border border-black/10 bg-slate-50 pl-11 pr-4 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500 focus:bg-white transition-all duration-300"
                    />
                  </div>
                </div>

                {/* 4. Project Goal Textarea */}
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Project Details</label>
                  <div className="relative flex items-start">
                    <MessageSquare size={15} className="absolute left-4 top-4 text-slate-400" />
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Briefly describe your website or marketing goals..."
                      className="w-full resize-none rounded-xl border border-black/10 bg-slate-50 pl-11 pr-4 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500 focus:bg-white transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:bg-orange-700 active:scale-[0.98] disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    'Submitting details...'
                  ) : (
                    <>
                      <span>Get Free Proposal</span>
                      <Send size={13} />
                    </>
                  )}
                </button>

                {/* Status Logs */}
                {status === 'success' && (
                  <p className="text-center text-[10px] font-bold text-emerald-600 italic animate-pulse">
                    Enquiry saved successfully! Redirecting to WhatsApp...
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-center text-[10px] font-bold text-red-500 italic">
                    Connection failed. Please verify inputs and retry.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
