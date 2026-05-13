'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Award, 
  FileText, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  Send,
  Search,
  Layers,
  AlertTriangle,
  X,
  Code,
  Heart,
  Smile,
  ShieldCheck
} from 'lucide-react';

const RECRUITMENT_STEPS = [
  {
    step: "01",
    title: "Application Review",
    desc: "Our recruitment specialists carefully screen your submitted CV, portfolio, and code repositories to evaluate core technical competency."
  },
  {
    step: "02",
    title: "Technical Assessment",
    desc: "A hands-on, real-world coding task or design assignment to test your practical approach, code hygiene, and problem-solving skills."
  },
  {
    step: "03",
    title: "Technical Interview",
    desc: "A live 1-on-1 interaction with our tech lead or lead designer covering system architecture, framework logic, and project deep-dives."
  },
  {
    step: "04",
    title: "HR & Values Fitment",
    desc: "A conversation with human resources focusing on soft skills, work culture, salary structure, and growth alignment."
  },
  {
    step: "05",
    title: "Formal Offer",
    desc: "Upon successful clearance of all evaluation rounds, you will receive a formal offer letter detailing compensation, benefits, and joining details."
  }
];

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
    question: "How long does the entire selection process take?",
    answer: "From your initial form submission to the final offer letter, the process typically takes 5 to 10 business days. We respect candidate time and ensure fast, transparent feedback at every evaluation stage."
  },
  {
    question: "Do I need to pay any deposit or background check fee to apply?",
    answer: "Absolutely NOT. Geetanjali Softwares adheres to strict global fair hiring policies. We never charge any money, registration fees, background checking deposits, or security money at any point in the recruitment journey. Please beware of fraudulent job postings."
  }
];

export default function CareersPage() {
  const [openPositions, setOpenPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedPath, setSelectedPath] = useState('All');
  const [activeJob, setActiveJob] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Dedicated applicant state for the selected job modal
  const [applyingJob, setApplyingJob] = useState(null);
  const [candidateInfo, setCandidateInfo] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '1 - 2 Years',
    portfolio: '',
    resume_url: '',
    message: ''
  });
  
  // Job-specific custom answers map
  const [customAnswers, setCustomAnswers] = useState({});

  // Fetch jobs dynamically from backend Supabase router on mount
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        if (res.ok) {
          const data = await res.json();
          setOpenPositions(data);
        }
      } catch (err) {
        console.error("Error loading careers data from database:", err);
      }
    };
    loadJobs();
  }, []);

  const toggleJob = (jobId) => {
    setActiveJob(activeJob === jobId ? null : jobId);
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Launch the detailed job-specific application flow
  const handleApplyNow = (job) => {
    setApplyingJob(job);
    setCustomAnswers({});
    setSuccess(false);
  };

  const filteredJobs = useMemo(() => {
    return openPositions.filter((job) => {
      const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = selectedDept === 'All' || job.department === selectedDept;
      const matchPath = selectedPath === 'All' || job.path === selectedPath;
      return matchSearch && matchDept && matchPath;
    });
  }, [openPositions, searchTerm, selectedDept, selectedPath]);

  // Handle submit of the job-specific detailed application
  const handleDetailedSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare complete data including specific technical questions answers
    const payloadMessage = `
--- JOB DETAILED APPLICATION ---
Selected Role: ${applyingJob.title}
Experience: ${candidateInfo.experience}

${applyingJob.questions ? applyingJob.questions.map(q => `
${q.label}:
=> ${customAnswers[q.id] || 'Not Answered'}
`).join('') : ''}

Candidate's Message / Pitch:
${candidateInfo.message || 'No custom message provided.'}
    `;

    const finalPayload = {
      name: candidateInfo.name,
      email: candidateInfo.email,
      phone: candidateInfo.phone,
      role: applyingJob.title,
      experience: candidateInfo.experience,
      portfolio: candidateInfo.portfolio || customAnswers['github_url'] || customAnswers['figma_link'] || '',
      resume_url: candidateInfo.resume_url,
      message: payloadMessage.trim()
    };

    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        toast.success(`Application for ${applyingJob.title} submitted successfully!`);
        setCandidateInfo({
          name: '',
          email: '',
          phone: '',
          experience: '1 - 2 Years',
          portfolio: '',
          resume_url: '',
          message: ''
        });
        setCustomAnswers({});
      } else {
        toast.error(data.error || 'Failed to submit application.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans antialiased relative">
      
      {/* ────── CORPORATE HERO BANNER (With optimized compact vertical padding) ────── */}
      <section className="relative pt-12 pb-8 overflow-hidden sm:pt-20 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Rich Text content */}
            <div className="lg:col-span-7 text-left space-y-4">
              <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/10 text-orange-600 text-[10px] font-semibold uppercase tracking-wider">
                Global Talent Hub <Sparkles size={11} className="text-orange-600" />
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.15] text-slate-900">
                Discover Your Next <br />
                <span className="text-slate-500">Professional Milestone</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                At Geetanjali Softwares, we match elite global requirements with world-class engineering and creative expertise. Explore a culture engineered around design excellence, high impact, and continuous learning.
              </p>

              {/* Core Paths (Enterprise-style) */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button 
                  onClick={() => { setSelectedPath('All'); setSelectedDept('All'); }}
                  className={`px-4 py-2 rounded-full text-[9px] font-semibold uppercase tracking-wider transition duration-200 ${selectedPath === 'All' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10' : 'bg-black/5 border border-black/5 text-black/70 hover:bg-slate-100'}`}
                >
                  All Roles
                </button>
                <button 
                  onClick={() => { setSelectedPath('Experienced'); setSelectedDept('All'); }}
                  className={`px-4 py-2 rounded-full text-[9px] font-semibold uppercase tracking-wider transition duration-200 ${selectedPath === 'Experienced' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10' : 'bg-black/5 border border-black/5 text-black/70 hover:bg-slate-100'}`}
                >
                  Experienced
                </button>
                <button 
                  onClick={() => { setSelectedPath('Campus/Intern'); setSelectedDept('All'); }}
                  className={`px-4 py-2 rounded-full text-[9px] font-semibold uppercase tracking-wider transition duration-200 ${selectedPath === 'Campus/Intern' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10' : 'bg-black/5 border border-black/5 text-black/70 hover:bg-slate-100'}`}
                >
                  Campus/Interns
                </button>
              </div>
            </div>

            {/* Right Column: Stunning Workplace Showcase Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-black/5 shadow-sm hover:scale-[1.01] transition-transform duration-500">
                <Image 
                  src="/images/careers/creative_workspace.png" 
                  alt="Geetanjali Softwares Premium Studio Space" 
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                
                {/* Micro Floater Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-black/5 rounded-2xl p-2.5 flex items-center justify-between shadow-lg">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-900">Patna Creative Studio</p>
                    <p className="text-[9px] text-slate-500">Where visual ideas come to life</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ────── JOB SEEKER SEARCH & FILTERING BAR (Optimized height and spacing) ────── */}
      <section className="relative z-20 max-w-5xl mx-auto px-4 mt-2">
        <div className="bg-white rounded-2xl border border-black/5 shadow-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search positions by keywords (e.g. Next.js, Figma)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-black/5 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white"
            />
          </div>
          {/* Department dropdown */}
          <div className="relative">
            <select 
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-slate-50 border border-black/5 rounded-xl py-2.5 px-4 text-xs text-slate-700 outline-none transition appearance-none cursor-pointer focus:border-orange-500"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                backgroundSize: '12px',
              }}
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering & Tech</option>
              <option value="Design">UX/UI & Brand Design</option>
              <option value="Growth">Growth & Digital Marketing</option>
            </select>
          </div>
        </div>
      </section>

      {/* ────── OPEN POSITIONS RESULTS PANEL (Compact margins) ────── */}
      <section className="py-10 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Briefcase size={18} className="text-orange-600" />
                Available Vacancies ({filteredJobs.length})
              </h2>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Showing roles matching your preferences (Click to read details & apply)
              </p>
            </div>
            {/* Filter tags reset */}
            {(searchTerm || selectedDept !== 'All' || selectedPath !== 'All') && (
              <button 
                onClick={() => { setSearchTerm(''); setSelectedDept('All'); setSelectedPath('All'); }}
                className="text-[10px] font-semibold uppercase tracking-wider text-orange-600 hover:text-slate-900 transition"
              >
                Clear Filters
              </button>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="rounded-2xl border border-black/5 bg-white p-8 text-center space-y-3 shadow-sm">
              <Layers size={32} className="mx-auto text-slate-300" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900">No positions match your filters</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed max-w-md mx-auto">
                  We don&apos;t have any active vacancy matching this query right now. Feel free to contact our recruitment desk!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map((job) => {
                const isOpen = activeJob === job.id;
                return (
                  <div 
                    key={job.id}
                    className={`rounded-[24px] border transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? 'border-orange-500/20 bg-white shadow-xl shadow-orange-500/[0.01]' 
                        : 'border-black/[0.03] bg-white hover:border-black/[0.08]'
                    }`}
                  >
                    {/* Header bar */}
                    <button 
                      onClick={() => toggleJob(job.id)}
                      className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 sm:p-6 text-left outline-none gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/10">
                            {job.department}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-slate-500">
                            <Clock size={10} /> {job.type}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                          {job.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin size={11} /> {job.experience}
                        </span>
                        <div className={`h-7 w-7 rounded-full border border-black/5 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-orange-500/5 text-orange-600' : 'bg-slate-50 text-slate-900'}`}>
                          <ChevronDown size={12} />
                        </div>
                      </div>
                    </button>

                    {/* Expanding Content */}
                    <div 
                      className={`transition-all duration-500 ease-in-out ${
                        isOpen ? 'max-h-[1000px] border-t border-black/5 p-5 sm:p-6 bg-slate-50/50' : 'max-h-0'
                      }`}
                    >
                      {isOpen && (
                        <div className="space-y-4 animate-fade-in text-left">
                          <div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {job.description}
                            </p>
                          </div>

                          {/* Responsibilities */}
                          {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-900">
                                Core Responsibilities
                              </h4>
                              <ul className="space-y-1.5">
                                {job.responsibilities.map((r, i) => (
                                  <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                                    <span className="h-1 w-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Requirements */}
                          {Array.isArray(job.requirements) && job.requirements.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-900">
                                Technical Skillsets Required
                              </h4>
                              <ul className="space-y-1.5">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                                    <span className="h-1 w-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Apply CTA Button */}
                          <div className="pt-3 flex justify-end border-t border-black/5">
                            <button
                              onClick={() => handleApplyNow(job)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 py-2.5 px-5 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-orange-600 transition shadow-sm active:scale-95 duration-150"
                            >
                              Apply for this Position
                              <ArrowRight size={10} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ────── RECRUITMENT JOURNEY TIMELINE (Compact paddings) ────── */}
      <section className="py-12 border-t border-black/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-600 mb-1">
              The Journey
            </p>
            <h2 className="text-xl sm:text-2xl font-normal text-slate-900">
              Our 5-Step Evaluation Journey
            </h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              We focus on a quick, transparent, and structured assessment process that respects candidate experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {RECRUITMENT_STEPS.map((step, idx) => (
              <div key={idx} className="space-y-3 text-left relative">
                <div className="text-3xl font-semibold tracking-tight text-slate-200 transition duration-300">
                  {step.step}
                </div>
                <div className="h-0.5 w-10 bg-orange-500 rounded" />
                <h3 className="text-sm font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── 'LIFE & CULTURE' SECTION WITH PREMIUM GRAPHICS (Compact spacing) ────── */}
      <section className="py-12 border-t border-black/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Team Collaboration Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-black/5 shadow-sm hover:scale-[1.01] transition-transform duration-500">
                <Image 
                  src="/images/careers/team_collaboration.png" 
                  alt="Creative Design & Code Collaboration at Geetanjali Softwares" 
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Work Culture Narration */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-600">
                Workplace Culture
              </p>
              <h2 className="text-2xl font-normal text-slate-900 tracking-tight">
                Life at Geetanjali Softwares
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe exceptional software is built by happier teams. We have replaced boring hierarchies and mundane corporate routines with an agile, high-ownership product ecosystem.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <div className="h-6 w-6 rounded bg-orange-500/10 flex items-center justify-center text-orange-600">
                    <Heart size={12} />
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900">People First Always</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Structured learning credits, comprehensive medical covers, and absolute well-being initiatives.</p>
                </div>
                <div className="space-y-1">
                  <div className="h-6 w-6 rounded bg-orange-500/10 flex items-center justify-center text-orange-600">
                    <Clock size={12} />
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900">Flexible Autonomy</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Flexible hybrid layouts. We measure deliverables, visual quality, and client happiness — not work hours.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ────── RECRUITMENT FRAUD ALERT CARD ────── */}
      <section className="py-8 bg-transparent border-t border-b border-black/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-[24px] border border-amber-500/15 bg-white p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4 shadow-sm">
            <div className="h-9 w-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 mx-auto sm:mx-0">
              <AlertTriangle size={18} />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Anti-Fraud Recruitment Disclaimer
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Geetanjali Softwares, like TCS and HCL, values professional integrity. We **never** ask for monetary deposits, processing fees, security payments, or training charges at any point in our recruitment process. All official offers are dispatched exclusively from domain email addresses ending in `@geetanjalisoftwares.com`. Please report suspicious career listings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────── FREQUENTLY ASKED QUESTIONS SECTION (Compact spaces) ────── */}
      <section className="py-12 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              FAQs
            </p>
            <h2 className="text-xl sm:text-2xl font-normal text-slate-900">
              Hiring FAQs
            </h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Find instant answers to common questions about our application cycles, internship stipulations, and recruitment guidelines.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen ? 'border-orange-500/20 bg-slate-50/50' : 'border-black/5 bg-white'
                  }`}
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left outline-none"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 pr-4">
                      {faq.question}
                    </span>
                    <div className={`h-6 w-6 rounded-full border border-black/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-orange-500/5 text-orange-600' : 'bg-slate-50 text-slate-900'}`}>
                      <ChevronDown size={10} />
                    </div>
                  </button>
                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[300px] border-t border-black/5 p-5' : 'max-h-0'
                    }`}
                  >
                    {isOpen && (
                      <p className="text-xs text-slate-600 leading-relaxed animate-fade-in">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────── 💎 BRAND NEW SPLIT DIALOG FULLSCREEN APPLICATION OVERLAY 💎 ────── */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in transition-all p-4">
          
          {/* Centered widescreen glassmorphic dialogue container */}
          <div className="w-full max-w-5xl h-[90vh] md:h-[82vh] bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-up relative border border-black/5">
            
            {/* LEFT SPLIT COLUMN */}
            <div className="hidden md:block md:w-[40%] bg-slate-100 relative h-full shrink-0 border-r border-black/5">
              <Image 
                src="/images/careers/team_collaboration.png" 
                alt="Build your dreams with Geetanjali Softwares team" 
                fill
                sizes="30vw"
                className="object-cover"
                priority
              />
              {/* Premium dark visual gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              
              {/* Culture Pitch details over the image */}
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-4">
                <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/10 text-white text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md">
                  We Are Hiring <Sparkles size={10} className="text-orange-400" />
                </p>
                <div className="space-y-2">
                  <h3 className="text-xl font-normal leading-tight tracking-tight">
                    Shape Global Product Landscapes
                  </h3>
                  <p className="text-[10px] text-white/70 leading-relaxed font-light">
                    Join our team of designers and code craftsmen to ship premium web products. We don&apos;t just code; we design visual landmarks of digital performance.
                  </p>
                </div>
                
                <div className="pt-2 border-t border-white/10 flex items-center gap-6">
                  <div>
                    <p className="text-lg font-semibold tracking-tight">100%</p>
                    <p className="text-[9px] uppercase tracking-wider text-white/50">Performance Culture</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold tracking-tight">Remote</p>
                    <p className="text-[9px] uppercase tracking-wider text-white/50">Work From Anywhere</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SPLIT COLUMN: Detailed Candidate Form Fields (Scrolling panel) */}
            <div className="flex-1 h-full overflow-y-auto p-6 sm:p-10 flex flex-col justify-between relative bg-white">
              
              {/* Close Dialog Button */}
              <button 
                onClick={() => { setApplyingJob(null); setSuccess(false); }}
                className="absolute right-6 top-6 h-8 w-8 rounded-full border border-black/5 bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition text-slate-900 z-10"
              >
                <X size={14} />
              </button>

              {/* Header inside the form */}
              <div className="border-b border-black/5 pb-5 mb-5 pr-8">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600">
                    {applyingJob.department}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    Applying for {applyingJob.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span><MapPin size={10} className="inline mr-0.5" /> {applyingJob.type}</span>
                    <span>•</span>
                    <span><Award size={10} className="inline mr-0.5" /> Experience: {applyingJob.experience}</span>
                  </p>
                </div>
              </div>

              {success ? (
                <div className="flex-1 py-12 flex flex-col items-center justify-center text-center space-y-5 animate-fade-in">
                  <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={28} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-semibold text-slate-900">Application Received!</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Your application profile for **{applyingJob.title}** has been sent successfully. An auto-confirmation email is dispatched to your inbox.
                    </p>
                  </div>
                  <button
                    onClick={() => { setApplyingJob(null); setSuccess(false); }}
                    className="rounded-xl bg-slate-900 py-2.5 px-6 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-orange-600 transition"
                  >
                    Return to Careers
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDetailedSubmit} className="space-y-5 text-left flex-grow">
                  
                  {/* 1. Profile section */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-orange-600 border-b border-black/5 pb-0.5">
                      1. Candidate Profile Info
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                          <User size={10} className="text-black/30" /> Full Name <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Akash Kumar"
                          value={candidateInfo.name}
                          onChange={(e) => setCandidateInfo({ ...candidateInfo, name: e.target.value })}
                          className="w-full rounded-xl border border-black/10 bg-slate-50 py-2.5 px-3 text-xs text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white shadow-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                          <Mail size={10} className="text-black/30" /> Email Address <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. akash@gmail.com"
                          value={candidateInfo.email}
                          onChange={(e) => setCandidateInfo({ ...candidateInfo, email: e.target.value })}
                          className="w-full rounded-xl border border-black/10 bg-slate-50 py-2.5 px-3 text-xs text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                          <Phone size={10} className="text-black/30" /> Phone Number <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={candidateInfo.phone}
                          onChange={(e) => setCandidateInfo({ ...candidateInfo, phone: e.target.value })}
                          className="w-full rounded-xl border border-black/10 bg-slate-50 py-2.5 px-3 text-xs text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white shadow-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                          <Award size={10} className="text-black/30" /> Experience Level <span className="text-orange-500">*</span>
                        </label>
                        <select
                          value={candidateInfo.experience}
                          onChange={(e) => setCandidateInfo({ ...candidateInfo, experience: e.target.value })}
                          className="w-full rounded-xl border border-black/10 bg-slate-50 py-2.5 px-3 text-xs text-slate-700 outline-none transition focus:border-orange-500 focus:bg-white cursor-pointer appearance-none shadow-sm"
                          style={{
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            backgroundSize: '10px',
                          }}
                        >
                          <option value="Self-Taught / Freshman">Self-Taught / Freshman</option>
                          <option value="1 - 2 Years">1 - 2 Years</option>
                          <option value="3+ Years of Experience">3+ Years of Experience</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 2. Custom screening questions */}
                  {applyingJob.questions && applyingJob.questions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-semibold uppercase tracking-wider text-orange-600 border-b border-black/5 pb-0.5 flex items-center gap-1">
                        <Code size={10} /> 2. Job-Specific Screening
                      </h4>
                      {applyingJob.questions.map((q) => (
                        <div key={q.id} className="space-y-1">
                          <label className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                            {q.label} {q.required && <span className="text-orange-500">*</span>}
                          </label>
                          {q.type === 'select' ? (
                            <select
                              required={q.required}
                              value={customAnswers[q.id] || ''}
                              onChange={(e) => setCustomAnswers({ ...customAnswers, [q.id]: e.target.value })}
                              className="w-full rounded-xl border border-black/10 bg-slate-50 py-2.5 px-3 text-xs text-slate-700 outline-none transition focus:border-orange-500 focus:bg-white cursor-pointer appearance-none shadow-sm"
                              style={{
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 12px center',
                                backgroundSize: '10px',
                              }}
                            >
                              <option value="">Select an option...</option>
                              {q.options.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={q.type}
                              required={q.required}
                              placeholder={q.placeholder}
                              value={customAnswers[q.id] || ''}
                              onChange={(e) => setCustomAnswers({ ...customAnswers, [q.id]: e.target.value })}
                              className="w-full rounded-xl border border-black/10 bg-slate-50 py-2.5 px-3 text-xs text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white shadow-sm"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 3. Attachments */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-orange-600 border-b border-black/5 pb-0.5 flex items-center gap-1">
                      <FileText size={10} /> 3. Attachments & Verification
                    </h4>
                    <div className="space-y-1">
                      <label className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <FileText size={10} className="text-slate-400" /> Resume / CV URL Link <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="e.g. shareable Google Drive or Canva link"
                        value={candidateInfo.resume_url}
                        onChange={(e) => setCandidateInfo({ ...candidateInfo, resume_url: e.target.value })}
                        className="w-full rounded-xl border border-black/10 bg-slate-50 py-2.5 px-3 text-xs text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <Globe size={10} className="text-slate-400" /> Portfolio or Website Link <span className="text-slate-300 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        placeholder="e.g. https://yourportfolio.dev"
                        value={candidateInfo.portfolio}
                        onChange={(e) => setCandidateInfo({ ...candidateInfo, portfolio: e.target.value })}
                        className="w-full rounded-xl border border-black/10 bg-slate-50 py-2.5 px-3 text-xs text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        Your Pitch / Best Achievement <span className="text-slate-300 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Briefly pitch your primary skillset or motivation..."
                        value={candidateInfo.message}
                        onChange={(e) => setCandidateInfo({ ...candidateInfo, message: e.target.value })}
                        className="w-full rounded-xl border border-black/10 bg-slate-50 py-2 px-3 text-xs text-slate-900 placeholder-slate-400 outline-none resize-none transition focus:border-orange-500 focus:bg-white shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-black/5 flex flex-col gap-3">
                    <p className="text-[9px] text-slate-500 leading-relaxed">
                      By submitting, you confirm that your resume link is fully viewable and matches standard corporate fair-hiring guidelines.
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-3 px-5 text-[10px] font-semibold uppercase tracking-wider text-white transition hover:bg-orange-600 disabled:opacity-50 active:scale-95"
                    >
                      {loading ? 'Submitting Application...' : `Submit Application for ${applyingJob.title}`}
                      <Send size={10} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
