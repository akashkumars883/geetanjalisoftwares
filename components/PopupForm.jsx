'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, User, Mail, MessageSquare } from 'lucide-react';

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
    const handleOpenEnquiry = () => {
      setIsOpen(true);
    };

    window.addEventListener('open-enquiry-popup', handleOpenEnquiry);
    return () => window.removeEventListener('open-enquiry-popup', handleOpenEnquiry);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
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
            className="fixed inset-x-4 bottom-4 z-[10001] mx-auto max-w-[480px] overflow-hidden rounded-[36px] border border-black/5 bg-slate-50 shadow-2xl shadow-black/25 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
          >
            {/* Header with Luxury Brand Gradient */}
            <div className="relative h-36 w-full overflow-hidden bg-orange-600">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600" />
              <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-105 active:scale-95"
                aria-label="Close form"
              >
                <X size={16} />
              </button>

              <div className="relative flex h-full flex-col justify-center px-8 text-white text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-200">Start your project</span>
                <h3 className="text-2xl font-bold tracking-tight mt-1 text-white">Let&apos;s Build Masterpiece!</h3>
                <p className="text-xs text-orange-100 mt-1">Get an instant customized quote for your business.</p>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8 bg-white">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* 1. Full Name Input */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <div className="relative flex items-center">
                    <User size={15} className="absolute left-4 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-2xl border border-black/5 bg-slate-50/70 pl-11 pr-4 py-3.5 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* 2. Email Address Input */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail size={15} className="absolute left-4 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@company.com"
                      className="w-full rounded-2xl border border-black/5 bg-slate-50/70 pl-11 pr-4 py-3.5 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* 3. Phone Number Input (New Separate Field) */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Contact Number (WhatsApp)</label>
                  <div className="relative flex items-center">
                    <Phone size={15} className="absolute left-4 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full rounded-2xl border border-black/5 bg-slate-50/70 pl-11 pr-4 py-3.5 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* 4. Project Goal Textarea */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Project Details</label>
                  <div className="relative flex items-start">
                    <MessageSquare size={15} className="absolute left-4 top-4 text-slate-400" />
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Briefly describe your website or marketing goals..."
                      className="w-full resize-none rounded-2xl border border-black/5 bg-slate-50/70 pl-11 pr-4 py-3.5 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 py-4 text-xs font-semibold text-white shadow-xl shadow-orange-600/20 transition-all duration-300 hover:bg-orange-700 hover:shadow-orange-600/30 active:scale-[0.98] disabled:opacity-50"
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
