'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Zap, 
  Layout, 
  Search, 
  Smartphone, 
  CheckCircle,
  ShieldCheck,
  Gauge,
  Star,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

const featuresList = [
  {
    icon: Zap,
    title: 'Instant AI Website Generation',
    description: 'Bypass conventional drag-and-drop complexity. Answer four essential business questions and our automated SaaS engine configures your website instantly.',
    proof: 'Under 60 seconds average deployment time.',
  },
  {
    icon: Layout,
    title: 'Curated Premium Aesthetics',
    description: 'Professional color profiles and modern typography designed by expert UI/UX architects to guarantee your business looks highly established and trustworthy.',
    proof: 'Engineered for maximum visitor conversion.',
  },
  {
    icon: Smartphone,
    title: '100% Mobile Responsive Layout',
    description: 'Every generated template is meticulously structured to adapt flawlessly across mobile phones, tablets, and high-resolution desktop displays.',
    proof: 'Passes core Google Mobile-Friendly tests.',
  },
  {
    icon: Search,
    title: 'Built-in Technical SEO Architecture',
    description: 'Clean semantic HTML5, automated meta descriptions, and rapid load times empower your business website to rank organically on search engines.',
    proof: 'Adheres to modern search ranking guidelines.',
  },
  {
    icon: Gauge,
    title: 'Ultra-Fast Global CDN Delivery',
    description: 'Hosted on enterprise-grade cloud networks, guaranteeing your business website loads in milliseconds for any customer around the globe.',
    proof: '99.9% Uptime SLA tracked continuously.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise SSL Encryption',
    description: 'Every website comes secured with automated HTTPS security certificates, establishing instant credibility and protecting visitor data.',
    proof: 'Zero technical configuration required.',
  },
];

const stepsList = [
  {
    number: "01",
    title: "Submit Business Information",
    description: "Provide your brand name, core service offerings, taglines, and direct WhatsApp contact number.",
    proof: "Takes less than 30 seconds."
  },
  {
    number: "02",
    title: "Select Professional Profile",
    description: "Choose from our curated professional visual aesthetics (Orange, Sage, Blue, or Purple theme profiles).",
    proof: "Real-time interactive preview."
  },
  {
    number: "03",
    title: "Publish & Share Instantly",
    description: "Click launch to immediately secure your live, shareable subdomain link without any processing delays.",
    proof: "Instantly live on global servers."
  }
];

const faqList = [
  {
    id: "free-creation",
    question: "How can I create a business website for free?",
    answer: "You can create a professional business website instantly by providing your company name, services, and WhatsApp contact in our automated SaaS builder. The system configures your layout, typography, and hosting in 60 seconds without requiring any coding."
  },
  {
    id: "free-hosting",
    question: "Is the website hosting really free forever?",
    answer: "Yes. Your website is hosted on our verified .geetanjalisoftwares.in subdomains completely free of charge, supported by global CDN delivery and complimentary SSL encryption."
  },
  {
    id: "custom-domain",
    question: "Can I connect my own custom domain (.com or .in)?",
    answer: "Absolutely. You can connect your own domain (e.g., yourbusiness.com) to your website. Note: You will need to purchase the domain from a registrar (like GoDaddy or Namecheap), and we will provide full technical support to connect it to our servers."
  },
  {
    id: "seo-rankings",
    question: "Is the generated website SEO friendly?",
    answer: "Yes, every template is structured with semantic HTML headings, responsive mobile code, and fast load speeds to ensure excellent visibility on Google and other search engines."
  }
];

export default function FreeWebsiteLandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Geetanjali Softwares AI Website Builder",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "999",
              "priceCurrency": "INR"
            },
            "description": "Professional AI Website Builder for local businesses. Create premium editorial websites in 60 seconds with SSL and hosting included.",
            "author": {
              "@type": "Organization",
              "name": "Geetanjali Softwares",
              "url": "https://www.geetanjalisoftwares.in",
              "logo": "https://www.geetanjalisoftwares.in/images/logo.jpg",
              "sameAs": [
                "https://www.facebook.com/geetanjalisoftwares",
                "https://www.instagram.com/geetanjalisoftwares",
                "https://www.linkedin.com/company/geetanjalisoftwares"
              ]
            }
          })
        }}
      />
      <div className="flex flex-col min-h-screen bg-transparent">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-8 sm:pt-12 sm:pb-12 bg-transparent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Mesh Gradient Background Accent */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start text-left lg:col-span-12 max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-200 shadow-sm px-5 py-2 text-[11px] font-semibold text-stone-500 mb-8 tracking-wider">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                PREMIUM AI WEBSITE ENGINE
              </div>

              <h1 className="text-4xl sm:text-7xl font-semibold leading-[1.05] tracking-tight text-stone-950">
                The Best <span className="text-orange-600">Free AI Website Builder</span> for Local Businesses
              </h1>

              <p className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-stone-500 font-medium">
                Scale your digital presence instantly. Our <strong>automated website maker</strong> uses AI to generate premium, mobile-ready business websites in 60 seconds.
              </p>

              <div className="mt-10 flex flex-col w-full sm:w-auto sm:flex-row gap-4">
                <Link
                  href="/builder"
                  className="group inline-flex items-center justify-center gap-2 rounded-[32px] bg-orange-600 px-10 py-5 text-sm font-semibold text-white shadow-2xl shadow-orange-600/30 transition-all duration-300 hover:bg-orange-700 hover:-translate-y-1 active:scale-95 text-center"
                >
                  Start Building For Free
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-[32px] border border-stone-200 bg-white px-10 py-5 text-sm font-semibold text-stone-900 shadow-sm transition-all duration-300 hover:bg-stone-50 hover:-translate-y-1 active:scale-95 text-center"
                >
                  Explore How It Works
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-black/5 w-full max-w-2xl flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center text-stone-500 font-medium">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider">5.0 CLIENT RATING</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">SECURE CLOUD HOSTING</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Premium Hero Visual Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 relative block w-full overflow-hidden rounded-[32px] bg-stone-100 aspect-[16/9] shadow-2xl border border-stone-200"
          >
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img
                src="/images/freesite-hero-image.png"
                alt="Free Website Builder Preview Mockup"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative w-full bg-transparent pt-8 pb-6 sm:pt-12 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col gap-4 sm:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-8 sm:pb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-orange-600">
                Core Capability
              </span>
              <h2 className="mt-3 sm:mt-4 text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-slate-900">
                Features
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 lg:max-w-xl"
            >
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                We eliminate the technical hurdles of web development. Our platform handles server configuration, security encryption, and responsive code automatically so your business stays ahead of competitors.
              </p>
            </motion.div>
          </div>

          <div className="mt-8 sm:mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            {featuresList.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col group"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/5 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight text-stone-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-stone-500 font-medium">
                    {item.description}
                  </p>
                  <div className="mt-8 pt-6 border-t border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest">
                        {item.proof}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative w-full bg-transparent pt-12 pb-10 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-12 border-t border-stone-100 pt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-orange-600">
                Simple Execution
              </span>
              <h2 className="mt-4 text-3xl sm:text-6xl font-semibold tracking-tight text-stone-950 leading-tight">
                How It Works
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 lg:max-w-xl"
            >
              <p className="text-lg text-stone-500 font-medium leading-relaxed">
                Going live takes less than 60 seconds. Follow our streamlined workflow to establish your verified business presence online instantly.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {stepsList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col pt-8 border-l border-stone-200 pl-8 relative"
              >
                <div className="absolute top-8 -left-[5px] w-[9px] h-[9px] rounded-full bg-stone-200" />
                <span className="text-sm font-semibold text-stone-400 uppercase tracking-widest">
                  STEP {item.number}
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-stone-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-stone-500 font-medium">
                  {item.description}
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest">
                    {item.proof}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing Options Section */}
      <section id="pricing" className="relative w-full bg-transparent pt-8 pb-6 sm:pt-12 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col gap-4 sm:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-8 sm:pb-12 border-t border-black/5 pt-8 sm:pt-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-orange-600">
                Transparent Plans
              </span>
              <h2 className="mt-3 sm:mt-4 text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-slate-900">
                Pricing
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 lg:max-w-xl"
            >
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                Start completely free to establish your presence. When your business is ready to scale, upgrade to custom branding and dedicated domain connection.
              </p>
            </motion.div>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col pt-6 sm:pt-8 border border-black/10 rounded-3xl p-6 sm:p-10 bg-white"
            >
              <div className="mb-6 sm:mb-8 overflow-hidden rounded-xl bg-slate-100 aspect-[16/9] border border-black/5">
                <img src="/images/pricing_free.png" alt="Free Starter Setup" className="h-full w-full object-cover object-center" />
              </div>

              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">Starter Plan</span>
              <h3 className="mt-3 sm:mt-4 text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl">
                ₹0 <span className="text-base sm:text-lg text-slate-500 font-normal">/forever</span>
              </h3>
              <p className="mt-3 sm:mt-4 text-base leading-relaxed text-slate-600">
                Perfect for independent service providers and local businesses starting out online.
              </p>

              <div className="my-6 sm:my-8 h-px w-full bg-black/5" />

              <ul className="flex flex-col gap-3.5 sm:gap-4 mb-8 sm:mb-10">
                {[
                  "Free .geetanjalisoftwares.in subdomain",
                  "Curated premium design themes",
                  "100% Mobile responsive layout",
                  "Direct WhatsApp chat integration",
                  "Geetanjali Softwares verification badge"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm sm:text-base text-slate-700">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/builder"
                className="mt-auto inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:-translate-y-0.5 active:scale-95 text-center"
              >
                Launch Free Site
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col pt-6 sm:pt-8 border-2 border-orange-600 rounded-3xl p-6 sm:p-10 bg-white shadow-xl shadow-orange-600/5 relative"
            >
              <div className="absolute top-0 right-6 sm:right-10 -translate-y-1/2 bg-orange-600 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full">
                Best Value
              </div>

              <div className="mb-6 sm:mb-8 overflow-hidden rounded-xl bg-orange-50 aspect-[16/9] border border-orange-600/20 shadow-inner">
                <img src="/images/pricing_pro.png" alt="Professional Domain Setup" className="h-full w-full object-cover object-center" />
              </div>

              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-orange-600">Growth Plan</span>
              <h3 className="mt-3 sm:mt-4 text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl">
                ₹199 <span className="text-base sm:text-lg text-slate-500 font-normal">/month</span>
              </h3>
              <p className="mt-3 sm:mt-4 text-base leading-relaxed text-slate-600">
                The most affordable way to get a professional .com or .in domain for your business.
              </p>

              <div className="my-6 sm:my-8 h-px w-full bg-black/5" />

              <ul className="flex flex-col gap-3.5 sm:gap-4 mb-8 sm:mb-10">
                {[
                  "Connect your own .com or .in Domain",
                  "Complete removal of Geetanjali branding",
                  "Advanced technical SEO configuration",
                  "Google Search Console indexing setup",
                  "Full Technical Support for domain setup"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-900">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mb-8 text-[11px] font-semibold text-slate-400 italic">
                *Note: Domain must be purchased by user separately. We provide complete setup support.
              </p>

              <a
                href="https://wa.me/917508657479?text=Hi%20Geetanjali%20Softwares,%20I%20want%20to%20upgrade%20to%20the%20199/month%20Growth%20Plan."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center rounded-2xl bg-orange-600 px-6 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold text-white shadow-xl shadow-orange-600/20 transition-all duration-300 hover:bg-orange-700 hover:-translate-y-0.5 active:scale-95 text-center"
              >
                Upgrade to Growth Plan
              </a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section id="faq" className="relative w-full bg-transparent pt-8 pb-6 sm:pt-12 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col gap-4 sm:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16 pb-8 sm:pb-12 border-t border-black/5 pt-8 sm:pt-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-orange-600">
                Got Questions?
              </span>
              <h2 className="mt-3 sm:mt-4 text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-slate-900">
                FAQs
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 lg:max-w-xl"
            >
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                Find clear answers on hosting, custom domains, and search visibility. Everything is transparent and structured for your success.
              </p>
            </motion.div>
          </div>

          <div className="mt-8 sm:mt-12 flex flex-col">
            {faqList.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <motion.div 
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="overflow-hidden border-b border-black/5 last:border-0"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="group flex w-full items-center justify-between py-5 sm:py-8 text-left"
                  >
                    <div className="flex items-center gap-4 sm:gap-8 pr-4">
                      <span className="text-xs sm:text-sm font-semibold text-slate-400 transition-colors group-hover:text-orange-600 sm:text-xl">
                        0{index + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-slate-900 transition-colors group-hover:text-orange-600 sm:text-4xl">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-180 bg-orange-600 border-orange-600 text-white' : 'border-black/10 bg-transparent text-slate-900 group-hover:border-orange-600 group-hover:text-orange-600'}`}>
                      <ChevronDown size={20} className="sm:w-6 sm:h-6" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="pb-8 pl-8 sm:pb-10 sm:pl-16 lg:pl-[88px]">
                          <p className="text-sm sm:text-base leading-relaxed text-slate-600 sm:text-lg max-w-4xl">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Final CTA Section */}
      <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative overflow-hidden py-8 sm:py-14 border-t border-black/5 mt-8 sm:mt-12"
          >
            <div className="flex flex-col gap-6 sm:gap-10 lg:flex-row lg:items-end lg:justify-between relative z-10">
              <div className="max-w-2xl">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-orange-600">
                  Instant Launch
                </span>
                <h2 className="mt-3 text-3xl font-normal tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
                  Ready to get your business online?
                </h2>
                <p className="mt-3 sm:mt-4 text-base leading-relaxed text-slate-600 sm:text-lg max-w-xl">
                  Join hundreds of businesses that have established their official online identity using our free builder.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:gap-4 sm:w-auto sm:flex-row">
                <Link
                  href="/builder"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-600 px-6 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition active:scale-95 sm:w-auto hover:bg-orange-700 hover:-translate-y-0.5 text-center"
                >
                  Start Building Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold text-slate-900 transition active:scale-95 sm:w-auto hover:bg-slate-50 hover:-translate-y-0.5 text-center"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
    </>
  );
}
