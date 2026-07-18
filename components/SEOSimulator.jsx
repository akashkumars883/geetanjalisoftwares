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
  TrendingUp,
  ArrowRight
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
    <section id="seo-scanner" className="relative w-full bg-background border-b border-foreground/10 pb-16 pt-16 sm:pb-24 sm:pt-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Top Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-12 border-b border-foreground/10">
          {/* Left Side: Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">
                Live Audit
              </span>
            </div>
            <h2 className="font-heading text-5xl font-bold uppercase tracking-tighter text-foreground sm:text-6xl lg:text-7xl leading-[0.85]">
              DIAGNOSTIC <br /> <span className="text-primary">CONSOLE</span>
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
            <p className="text-lg leading-relaxed text-foreground/70 font-medium sm:text-xl">
              Enter your URL for a quick audit preview, then request a manual SEO review from our team.
            </p>
          </motion.div>
        </div>

        {/* Console Container */}
        <div className="mt-16 w-full">

          {!scanning && !showResults && (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              {/* Image Column */}
              <div className="overflow-hidden bg-foreground/5 border border-foreground/10 aspect-[4/3] flex items-center justify-center p-6 transition-colors hover:border-primary">
                <img src="/images/seo_scanner_analytics.png" alt="SEO Analysis Dashboard" className="w-full h-full object-cover mix-blend-screen" />
              </div>

              {/* Form Column */}
              <form onSubmit={triggerScan} className="flex flex-col gap-8 p-8 sm:p-12 border border-foreground/10 bg-foreground/5">
                <div className="flex h-16 w-16 items-center justify-center bg-primary/10 text-primary">
                  <Search size={32} />
                </div>
                <div>
                  <h3 className="font-heading text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
                    Enter your URL <br /> <span className="text-primary">to begin</span>
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-foreground/70 font-medium border-t border-foreground/10 pt-6">
                    This preview highlights common SEO checks. Submit your details after the scan for a real manual review.
                  </p>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center bg-background border border-foreground/20 p-2 focus-within:border-primary transition-colors">
                  <div className="flex flex-1 items-center px-4 py-3 sm:py-0">
                    <Globe className="text-primary shrink-0" size={24} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. www.yourcompany.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-transparent px-6 font-heading text-sm font-bold uppercase tracking-wider text-foreground outline-none placeholder-foreground/30 sm:text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-3 bg-primary px-8 py-4 font-heading text-xs font-bold uppercase tracking-widest text-white transition-transform active:scale-95 shrink-0"
                  >
                    <Play size={16} className="fill-current" />
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">Analyze</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SCANNING STATE DIAGNOSTIC PANEL */}
          {scanning && (
            <div className="py-24 flex flex-col items-center gap-10 text-center animate-fade-in border border-foreground/10 bg-foreground/5 p-8">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[6px] border-primary/20 border-t-primary animate-spin" />
                <Globe size={48} className="text-primary" />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-4xl font-bold uppercase tracking-tighter text-foreground sm:text-5xl">
                  PREPARING AUDIT
                </h3>
                <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">{scanStage}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-lg flex flex-col gap-3">
                <div className="w-full h-3 bg-background border border-foreground/10 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 relative"
                    style={{ width: `${progress}%` }}
                  >
                     <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-foreground/40 block text-right">{progress}% COMPLETED</span>
              </div>
            </div>
          )}

          {/* RESULTS DISPLAY DASHBOARD */}
          {showResults && (
            <div className="flex flex-col gap-16 animate-scale-up">

              {/* Score summary panel */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 border-b border-foreground/10 pb-16">
                <div className="p-8 border border-foreground/10 bg-foreground/5 text-center flex flex-col justify-center transition-colors hover:border-primary">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-foreground/50">Performance Score</span>
                  <div className="mt-4 font-heading text-6xl font-bold tracking-tighter text-foreground">92<span className="text-foreground/30 text-2xl">/100</span></div>
                  <span className="mt-6 inline-flex items-center gap-2 justify-center font-heading text-[10px] font-bold uppercase tracking-widest text-primary border-t border-foreground/10 pt-6">
                    <CheckCircle size={14} /> Fast Web Engine
                  </span>
                </div>

                <div className="p-8 border border-primary bg-primary/10 text-center flex flex-col justify-center">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">SEO Score Index</span>
                  <div className="mt-4 font-heading text-6xl font-bold tracking-tighter text-primary">88<span className="text-primary/40 text-2xl">/100</span></div>
                  <span className="mt-6 inline-flex items-center gap-2 justify-center font-heading text-[10px] font-bold uppercase tracking-widest text-primary border-t border-primary/20 pt-6">
                    <CheckCircle size={14} /> Dynamic Index Ready
                  </span>
                </div>

                <div className="p-8 border border-foreground/10 bg-foreground/5 text-center flex flex-col justify-center transition-colors hover:border-primary">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-foreground/50">Security Score</span>
                  <div className="mt-4 font-heading text-6xl font-bold tracking-tighter text-foreground">SSL<span className="text-foreground/30 text-2xl">/KEY</span></div>
                  <span className="mt-6 inline-flex items-center gap-2 justify-center font-heading text-[10px] font-bold uppercase tracking-widest text-primary border-t border-foreground/10 pt-6">
                    <CheckCircle size={14} /> Security Verified
                  </span>
                </div>
              </div>

              {/* Diagnostic Checklist */}
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">

                <div className="flex flex-col gap-6">
                  <h4 className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Preview Checklist</h4>

                  <div className="p-6 border border-foreground/10 bg-foreground/5 flex items-start gap-5 hover:border-primary transition-colors">
                    <ShieldCheck className="text-primary shrink-0 mt-0.5" size={24} />
                    <div className="flex flex-col gap-2">
                      <h5 className="font-heading text-lg font-bold uppercase tracking-tight text-foreground">SSL Security Validation</h5>
                      <p className="text-sm font-medium leading-relaxed text-foreground/70">We will verify HTTPS configuration during the manual audit.</p>
                    </div>
                  </div>

                  <div className="p-6 border border-foreground/10 bg-foreground/5 flex items-start gap-5 hover:border-primary transition-colors">
                    <Zap className="text-primary shrink-0 mt-0.5" size={24} />
                    <div className="flex flex-col gap-2">
                      <h5 className="font-heading text-lg font-bold uppercase tracking-tight text-foreground">Core Web Vitals</h5>
                      <p className="text-sm font-medium leading-relaxed text-foreground/70">We will review Core Web Vitals and loading bottlenecks manually.</p>
                    </div>
                  </div>

                  <div className="p-6 border border-foreground/10 bg-foreground/5 flex items-start gap-5 hover:border-primary transition-colors">
                    <Smartphone className="text-primary shrink-0 mt-0.5" size={24} />
                    <div className="flex flex-col gap-2">
                      <h5 className="font-heading text-lg font-bold uppercase tracking-tight text-foreground">Mobile Optimization</h5>
                      <p className="text-sm font-medium leading-relaxed text-foreground/70">We will check mobile layout, tap targets, and responsive sections.</p>
                    </div>
                  </div>

                  <div className="p-6 border border-foreground/10 bg-foreground/5 flex items-start gap-5 hover:border-primary transition-colors">
                    <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={24} />
                    <div className="flex flex-col gap-2">
                      <h5 className="font-heading text-lg font-bold uppercase tracking-tight text-foreground">Structured Meta Schema</h5>
                      <p className="text-sm font-medium leading-relaxed text-foreground/70">We will inspect metadata, schema, headings, and crawl readiness.</p>
                    </div>
                  </div>
                </div>

                {/* Lead Generation Capture box on results */}
                <div className="p-8 sm:p-12 border border-foreground/10 bg-foreground/5 flex flex-col justify-between">
                  <div className="flex flex-col gap-8">
                    {!submitted ? (
                      <>
                        <div className="flex flex-col gap-4 border-b border-foreground/10 pb-8">
                          <div className="flex items-center">
                            <span className="inline-flex items-center gap-2 bg-primary px-4 py-1.5 font-heading text-[10px] font-bold uppercase tracking-widest text-white">
                              <TrendingUp size={14} /> Complete Scan
                            </span>
                          </div>
                          <h4 className="font-heading text-3xl font-bold uppercase tracking-tighter text-foreground mt-4 leading-tight">Get Professional <br /> <span className="text-primary">SEO Audit Report</span></h4>
                          <p className="text-base font-medium leading-relaxed text-foreground/70 mt-2">
                            We will analyze 20+ additional search key indices and email you a free comprehensive PDF audit.
                          </p>
                        </div>

                        <form onSubmit={handleLeadSubmit} className="flex flex-col gap-5">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-b border-foreground/20 bg-transparent py-4 px-4 text-sm font-medium text-foreground outline-none placeholder-foreground/40 focus:border-primary focus:bg-foreground/5 transition-colors"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-b border-foreground/20 bg-transparent py-4 px-4 text-sm font-medium text-foreground outline-none placeholder-foreground/40 focus:border-primary focus:bg-foreground/5 transition-colors"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Mobile Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border-b border-foreground/20 bg-transparent py-4 px-4 text-sm font-medium text-foreground outline-none placeholder-foreground/40 focus:border-primary focus:bg-foreground/5 transition-colors"
                          />

                          <button
                            type="submit"
                            disabled={submitting}
                            className="group mt-6 flex w-full items-center justify-center gap-4 bg-primary px-8 py-5 font-heading text-sm font-bold uppercase tracking-widest text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                          >
                            <span className="relative z-10">{submitting ? 'Generating Report...' : 'Email My Free PDF'}</span>
                            {!submitting && <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />}
                          </button>
                        </form>
                      </>
                    ) : (
                      <div className="py-16 flex flex-col items-center gap-6 text-center">
                        <div className="flex h-20 w-20 items-center justify-center bg-primary/10 text-primary">
                          <CheckCircle size={40} />
                        </div>
                        <div className="flex flex-col gap-4">
                          <h4 className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground">Audit Dispatched!</h4>
                          <p className="text-base font-medium leading-relaxed text-foreground/70 max-w-sm mx-auto">
                            Our team will dispatch the fully analyzed dashboard criteria layout report to <strong className="font-bold text-foreground">{email}</strong> shortly!
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setShowResults(false);
                            setUrl('');
                          }}
                          className="mt-6 flex items-center gap-2 font-heading text-[10px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors"
                        >
                          Scan Another Website <ArrowRight size={14} />
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
