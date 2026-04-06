'use client';

import React, { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const packages = [
  { id: 'starter', label: 'Starter', price: 8000, description: 'Basic (5 Pages)' },
  { id: 'growth', label: 'Growth', price: 15000, description: 'Business (10 Pages)' },
  { id: 'premium', label: 'Premium', price: 25000, description: 'Enterprise (20 Pages)' },
];

const addOns = [
  { id: 'domain_hosting', label: 'Domain + Hosting', price: 4500 },
  { id: 'logo', label: 'Logo Design', price: 3000 },
  { id: 'chatbot', label: 'WhatsApp Chatbot', price: 3000 },
  { id: 'ads', label: 'Google Ads Setup', price: 2500 },
  { id: 'maintenance', label: 'Maintenance (/mo)', price: 1500 },
];

export default function ProjectCalculator() {
  const [selectedPackage, setSelectedPackage] = useState('starter');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const pkg = packages.find(p => p.id === selectedPackage);
    const addOnTotal = selectedAddOns.reduce((acc, id) => {
      const item = addOns.find(a => a.id === id);
      return acc + (item ? item.price : 0);
    }, 0);
    setTotal((pkg ? pkg.price : 0) + addOnTotal);
  }, [selectedPackage, selectedAddOns]);

  const toggleAddOn = (id) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const scrollToContact = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactForm.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
            Estimate your <span className="text-orange-500">project investment.</span>
          </h2>
        </div>

        <div className="relative rounded-[32px] border border-black/10 bg-white p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-start">
            
            {/* Step 1: Packages */}
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">1. Choose Package</p>
              <div className="flex flex-col gap-2">
                {packages.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPackage(p.id)}
                    className={`flex items-center justify-between rounded-xl px-5 py-4 border transition-all ${
                      selectedPackage === p.id 
                        ? 'border-orange-500 bg-orange-500/[0.03] text-orange-600 ring-1 ring-orange-500' 
                        : 'border-black/5 bg-transparent text-black/60 hover:border-black/20'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm leading-none">{p.label}</p>
                      <p className="text-[10px] mt-1 opacity-50">{p.description}</p>
                    </div>
                    <p className="font-bold">₹{p.price.toLocaleString()}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-full bg-black/5"></div>

            {/* Step 2: Add-ons */}
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">2. Select Add-ons</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {addOns.map(add => (
                  <button
                    key={add.id}
                    onClick={() => toggleAddOn(add.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 border transition-all ${
                      selectedAddOns.includes(add.id) 
                        ? 'border-black bg-black text-white' 
                        : 'border-black/5 bg-transparent text-black/50 hover:border-black/20'
                    }`}
                  >
                    <span className="text-[11px] font-bold">{add.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-40">₹{add.price.toLocaleString()}</span>
                      <div className={`h-3.5 w-3.5 rounded flex items-center justify-center ${
                        selectedAddOns.includes(add.id) ? 'bg-orange-500 text-white' : 'bg-black/5 text-transparent'
                      }`}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Bar */}
          <div className="mt-12 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/30 mb-1">Total Investment</p>
              <p className="text-5xl font-bold text-black tracking-tighter">₹{total.toLocaleString()}</p>
            </div>
            
            <button 
              onClick={scrollToContact}
              className="group w-full sm:w-auto flex items-center gap-3 justify-center rounded-2xl bg-orange-500 px-10 py-5 text-sm font-bold text-white shadow-xl shadow-orange-500/20 hover:bg-black transition-all duration-300"
            >
              Book Your Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


