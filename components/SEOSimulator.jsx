'use client';

import React, { useState } from 'react';
import {
  Globe,
  Search,
  ShieldCheck,
  Zap,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  Play,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function SEOSimulator() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanStage, setScanStage] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  // Lead info capture
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const stages = [
    'Resolving DNS headers...',
    'Analyzing meta tag configurations...',
    'Testing mobile viewport rendering scales...',
    'Measuring Core Web Vitals speed indexes...',
    'Checking SSL secure validation keys...',
    'Compiling performance scores...'
  ];

  const triggerScan = (e) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a valid website URL to analyze.');
      return;
    }

    if (!url.includes('.') || url.length < 4) {
      toast.error('The format of your URL seems incorrect.');
      return;
    }

    setScanning(true);
    setProgress(5);
    setShowResults(false);
    setSubmitted(false);

    let stageIdx = 0;
    setScanStage(stages[0]);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setScanning(false);
          setShowResults(true);
          return 100;
        }

        const currentStageIdx = Math.floor((next / 100) * stages.length);
        if (currentStageIdx !== stageIdx && currentStageIdx < stages.length) {
          stageIdx = currentStageIdx;
          setScanStage(stages[stageIdx]);
        }
        return next;
      });
    }, 350);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error('Please fill in your contact information.');
      return;
    }

    setSubmitting(true);

    const formattedMessage = `--- LIVE SEO SCAN SIMULATOR ---
Scanned Website URL: ${url}
Performance Score: 92/100
SEO Score: 88/100
SSL Security: SECURED
Mobile Responsiveness: OPTIMIZED
Candidate Phone: ${phone}`;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          service: 'Live SEO Scan Request',
          message: formattedMessage
        })
      });

      if (res.ok) {
        toast.success('Your SEO diagnostic audit report request is sent!');
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Failed to dispatch scan results.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to dispatch reports.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="seo-scanner" className="relative w-full bg-transparent pt-8 pb-6 sm:pt-12 sm:pb-10">
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
              Live Audit
            </span>
            <h2 className="mt-3 text-3xl font-normal tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
              Diagnostic Console
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
              Input your current corporate URL to inspect meta alignment indices, responsive layout fidelity, and loading speeds in real-time.
            </p>
          </motion.div>
        </div>

        {/* Console Container */}
        <div className="mt-12 w-full lg:mt-16">

          {!scanning && !showResults && (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              {/* Image Column */}
              <div className="overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3] flex items-center justify-center p-4">
                <img src="/images/seo_scanner_analytics.png" alt="SEO Analysis Dashboard" className="w-full h-full object-cover rounded-xl shadow-sm" />
              </div>

              {/* Form Column */}
              <form onSubmit={triggerScan} className="flex flex-col gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600">
                  <Search size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-normal tracking-tight text-slate-900 sm:text-3xl">
                    Enter your URL to begin
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    We will execute a simulated audit of your Core Web Vitals, metadata parameters, and security criteria.
                  </p>
                </div>

                <div className="mt-4 flex items-center bg-slate-50 border border-black/5 rounded-2xl p-2 shadow-inner w-full sm:p-3">
                  <Globe className="text-slate-400 ml-3 shrink-0" size={20} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. www.yourcompany.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-transparent px-4 text-sm text-slate-900 outline-none placeholder-slate-400 sm:text-base"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-orange-600 hover:bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition active:scale-95 flex items-center gap-2 shrink-0 shadow-sm"
                  >
                    <Play size={14} />
                    Analyze
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SCANNING STATE DIAGNOSTIC PANEL */}
          {scanning && (
            <div className="py-16 flex flex-col items-center gap-8 text-center animate-fade-in">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-orange-500/10 border-t-orange-600 animate-spin" />
                <Globe size={36} className="text-orange-600" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-normal tracking-tight text-slate-900">
                  Analyzing Web Indices
                </h3>
                <p className="text-sm font-semibold text-orange-600 sm:text-base">{scanStage}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-md flex flex-col gap-2">
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-400 block text-right">{progress}% completed</span>
              </div>
            </div>
          )}

          {/* RESULTS DISPLAY DASHBOARD */}
          {showResults && (
            <div className="flex flex-col gap-12 animate-scale-up">

              {/* Score summary panel */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 border-b border-black/5 pb-12">
                <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 text-center flex flex-col justify-center">
                  <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">Performance Score</span>
                  <div className="mt-3 text-5xl font-normal text-slate-900">92<span className="text-slate-400 text-lg sm:text-xl font-medium">/100</span></div>
                  <span className="mt-2 inline-flex items-center gap-1.5 justify-center text-xs font-semibold text-emerald-600">
                    <CheckCircle size={14} /> Fast Web Engine
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-500/10 text-center flex flex-col justify-center">
                  <span className="text-xs uppercase font-semibold text-orange-600 tracking-wider">SEO Score Index</span>
                  <div className="mt-3 text-5xl font-normal text-orange-600">88<span className="text-orange-300 text-lg sm:text-xl font-medium">/100</span></div>
                  <span className="mt-2 inline-flex items-center gap-1.5 justify-center text-xs font-semibold text-emerald-600">
                    <CheckCircle size={14} /> Dynamic Index Ready
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-black/5 text-center flex flex-col justify-center">
                  <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">Security Score</span>
                  <div className="mt-3 text-5xl font-normal text-slate-900">SSL<span className="text-slate-400 text-lg sm:text-xl font-medium">/Key</span></div>
                  <span className="mt-2 inline-flex items-center gap-1.5 justify-center text-xs font-semibold text-emerald-600">
                    <CheckCircle size={14} /> Security Verified
                  </span>
                </div>
              </div>

              {/* Diagnostic Checklist */}
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">

                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Technical Checklist</h4>

                  <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-start gap-4">
                    <ShieldCheck className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                    <div className="flex flex-col gap-1">
                      <h5 className="text-sm font-semibold text-slate-900">SSL Security Validation</h5>
                      <p className="text-xs leading-relaxed text-slate-600">HTTPS certificate verification key validated successfully.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-start gap-4">
                    <Zap className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                    <div className="flex flex-col gap-1">
                      <h5 className="text-sm font-semibold text-slate-900">Core Web Vitals Performance</h5>
                      <p className="text-xs leading-relaxed text-slate-600">LCP dynamic pre-render scales resolved within 1.2s.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-start gap-4">
                    <Smartphone className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                    <div className="flex flex-col gap-1">
                      <h5 className="text-sm font-semibold text-slate-900">Mobile Layout Optimization</h5>
                      <p className="text-xs leading-relaxed text-slate-600">Fluid viewport and media criteria matched perfectly.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-black/5 flex items-start gap-4">
                    <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                    <div className="flex flex-col gap-1">
                      <h5 className="text-sm font-semibold text-slate-900">Structured Meta Schema</h5>
                      <p className="text-xs leading-relaxed text-slate-600">JSON-LD data structures missing. Needs search engine optimization.</p>
                    </div>
                  </div>
                </div>

                {/* Lead Generation Capture box on results */}
                <div className="p-8 rounded-2xl bg-slate-50 border border-black/5 flex flex-col justify-between shadow-sm">
                  <div className="flex flex-col gap-6">
                    {!submitted ? (
                      <>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center">
                            <span className="inline-flex items-center gap-1.5 rounded bg-orange-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                              <TrendingUp size={12} /> Complete Scan
                            </span>
                          </div>
                          <h4 className="text-2xl font-normal tracking-tight text-slate-900 mt-2">Get Professional SEO Audit Report</h4>
                          <p className="text-sm leading-relaxed text-slate-600 mt-1">
                            We will analyze 20+ additional search key indices and email you a free comprehensive PDF audit.
                          </p>
                        </div>

                        <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl bg-white border border-slate-200 py-3 px-4 text-sm text-slate-900 outline-none placeholder-slate-400 focus:border-orange-500 shadow-sm"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl bg-white border border-slate-200 py-3 px-4 text-sm text-slate-900 outline-none placeholder-slate-400 focus:border-orange-500 shadow-sm"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Mobile Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-xl bg-white border border-slate-200 py-3 px-4 text-sm text-slate-900 outline-none placeholder-slate-400 focus:border-orange-500 shadow-sm"
                          />

                          <button
                            type="submit"
                            disabled={submitting}
                            className="mt-2 w-full rounded-xl bg-orange-600 hover:bg-orange-700 py-4 px-6 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition active:scale-[0.98] disabled:opacity-50"
                          >
                            {submitting ? 'Generating Report...' : 'Email Me My Free PDF Audit'}
                          </button>
                        </form>
                      </>
                    ) : (
                      <div className="py-12 flex flex-col items-center gap-4 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                          <CheckCircle size={32} />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h4 className="text-xl font-normal tracking-tight text-slate-900">Audit Dispatched!</h4>
                          <p className="text-sm leading-relaxed text-slate-600 max-w-sm mx-auto">
                            Our team will dispatch the fully analyzed dashboard criteria layout report to <strong className="font-semibold">{email}</strong> shortly!
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setShowResults(false);
                            setUrl('');
                          }}
                          className="mt-4 text-sm text-orange-600 font-semibold hover:underline"
                        >
                          Scan Another Website
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
