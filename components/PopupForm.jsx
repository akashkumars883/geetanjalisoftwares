'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone } from 'lucide-react';

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    // Show popup after 1.5 seconds if not shown before
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Set flag immediately so it doesn't reappear on reload
        localStorage.setItem('hasSeenPopup', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
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
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          email: formData.contact, // Map contact to email for existing API
          service: 'Popup Inquiry'
        }),
      });

      if (!res.ok) throw new Error('Failed to send enquiry');

      const whatsappMsg = `Hi Geetanjali Softwares, I'm interested in your services. \n\n*Name:* ${formData.name}\n*Contact:* ${formData.contact}\n*Message:* ${formData.message}`;
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-[450px] overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-2xl shadow-black/20 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
          >
            {/* Header with Background Gradient */}
            <div className="relative h-32 w-full overflow-hidden bg-orange-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600" />
              <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-black/10 blur-3xl" />
              
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
              >
                <X size={18} />
              </button>

              <div className="relative flex h-full flex-col justify-center px-8 text-white">
                <h3 className="text-2xl font-bold tracking-tight">Get a Quote!</h3>
                <p className="text-sm font-medium text-white/80">Let&apos;s build something amazing together.</p>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-black/[0.05] bg-stone-50 px-5 py-4 text-sm text-black outline-none placeholder:text-black/30 focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Email or WhatsApp</label>
                  <input
                    type="text"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="example@mail.com / +91..."
                    className="w-full rounded-2xl border border-black/[0.05] bg-stone-50 px-5 py-4 text-sm text-black outline-none placeholder:text-black/30 focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">How can we help?</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Briefly tell us about your project..."
                    className="w-full resize-none rounded-2xl border border-black/[0.05] bg-stone-50 px-5 py-4 text-sm text-black outline-none placeholder:text-black/30 focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 py-5 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition hover:bg-orange-600 active:scale-95 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <p className="text-center text-xs font-bold text-green-600 italic">Redirecting to WhatsApp...</p>
                )}
                {status === 'error' && (
                  <p className="text-center text-xs font-bold text-red-600 italic">Oops! Please try again.</p>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
