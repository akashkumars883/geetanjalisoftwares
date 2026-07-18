'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Clock, 
  ChevronDown, 
  Sparkles,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

const FAQS = [
  {
    question: "What is the recruitment model at Geetanjali Softwares?",
    answer: "Our hiring model is completely performance-based. We prioritize solid portfolios, technical craftsmanship, and clean communication over formal college degrees. Our selection process consists of CV screening, a short test, and interview rounds."
  },
  {
    question: "Does Geetanjali Softwares support remote or hybrid work?",
    answer: "Yes. Most of our engineering, design, and growth roles are fully remote-first. However, some leadership, sales, or specific on-site requirements might operate in a hybrid setup from our regional work locations."
  },
  {
    question: "Are internships at Geetanjali Softwares paid?",
    answer: "Absolutely. All internships are fully paid and include a structured monthly stipend. Interns who demonstrate outstanding ownership and deliverables are frequently offered permanent Pre-Placement Offers (PPOs)."
  },
  {
    question: "How can I apply when there are no open positions?",
    answer: "We are always on the lookout for exceptional talent. Even if there are no current openings, you can share your resume and portfolio at hr@geetanjalisoftwares.com, and we will reach out when a suitable role opens."
  }
];

export default function CareersPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  const stagger = {
    whileInView: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased relative">
      
      {/* ────── CORPORATE HERO BANNER ────── */}
      <section className="relative pb-16 pt-0 sm:pb-24 sm:pt-4 border-b border-foreground/10">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-7xl px-6 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Rich Text content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-12 bg-primary"></span>
                <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-primary flex items-center gap-2">
                  Global Talent Hub <Sparkles size={11} className="text-primary" />
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-tight"
              >
                Build your career at the <br />
                <span className="text-primary">intersection of tech & design.</span>
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="max-w-xl text-lg leading-relaxed text-foreground/70 font-medium"
              >
                At Geetanjali Softwares, we match elite global requirements with world-class engineering and creative expertise. We're building a team of problem-solvers who care deeply about craftsmanship, code quality, and client impact.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="pt-4 p-4 border border-primary/20 bg-primary/5 rounded-2xl max-w-lg">
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Current Openings</p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  We are not actively hiring at the moment. However, we are always eager to connect with brilliant minds. Drop your portfolio at <a href="mailto:hr@geetanjalisoftwares.com" className="text-foreground font-bold hover:text-primary transition-colors">hr@geetanjalisoftwares.com</a>.
                </p>
              </motion.div>
            </div>

            {/* Right Column: Stunning Workplace Showcase Image */}
            <motion.div variants={fadeInUp} className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-foreground/10 hover:border-primary transition-colors duration-500">
                <Image 
                  src="/images/careers/creative_workspace.png" 
                  alt="Geetanjali Softwares Premium Studio Space" 
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
                
                {/* Micro Floater Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md border border-foreground/10 rounded-xl p-4 flex items-center justify-between shadow-lg">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Creative Studio</p>
                    <p className="text-[10px] text-foreground/60 mt-1">Where visual ideas come to life</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ────── 'LIFE & CULTURE' SECTION ────── */}
      <section className="py-24 border-b border-foreground/10 bg-background">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-7xl px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Team Collaboration Image */}
            <motion.div variants={fadeInUp} className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-foreground/10 transition-colors duration-500 hover:border-primary">
                <Image 
                  src="/images/careers/team_collaboration.png" 
                  alt="Creative Design & Code Collaboration at Geetanjali Softwares" 
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Right Column: Work Culture Narration */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div variants={fadeInUp} className="flex items-center gap-3">
                <span className="h-[1px] w-12 bg-primary"></span>
                <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
                  Workplace Culture
                </span>
              </motion.div>
              
              <motion.h2 
                variants={fadeInUp}
                className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-foreground leading-tight"
              >
                Life at <span className="text-primary">Geetanjali Softwares</span>
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg leading-relaxed text-foreground/70 font-medium"
              >
                We believe exceptional software is built by happier teams. We have replaced boring hierarchies and mundane corporate routines with an agile, high-ownership product ecosystem.
              </motion.p>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-foreground/10">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Heart size={18} />
                  </div>
                  <h4 className="text-lg font-heading font-bold uppercase tracking-tight text-foreground">People First Always</h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">Structured learning credits, comprehensive medical covers, and absolute well-being initiatives.</p>
                </div>
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Clock size={18} />
                  </div>
                  <h4 className="text-lg font-heading font-bold uppercase tracking-tight text-foreground">Flexible Autonomy</h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">Flexible hybrid layouts. We measure deliverables, visual quality, and client happiness — not work hours.</p>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ────── FREQUENTLY ASKED QUESTIONS SECTION ────── */}
      <section className="py-24 bg-background">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-4xl px-6"
        >
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div variants={fadeInUp} className="flex justify-center items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
                FAQs
              </span>
              <span className="h-[1px] w-12 bg-primary"></span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tighter text-foreground">
              Hiring FAQs
            </motion.h2>
          </div>

          <motion.div variants={fadeInUp} className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`border transition-colors duration-300 ${
                    isOpen ? 'border-primary bg-foreground/5' : 'border-foreground/10 bg-transparent hover:border-foreground/30'
                  }`}
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left outline-none"
                  >
                    <span className="text-base sm:text-lg font-heading font-semibold tracking-tight text-foreground pr-4">
                      {faq.question}
                    </span>
                    <div className={`h-8 w-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 bg-primary/10 border-primary text-primary' : 'bg-transparent border-foreground/10 text-foreground/50'}`}>
                      <ChevronDown size={14} />
                    </div>
                  </button>
                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[300px] border-t border-foreground/10 p-6' : 'max-h-0'
                    }`}
                  >
                    {isOpen && (
                      <p className="text-sm text-foreground/70 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
