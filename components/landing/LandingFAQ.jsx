'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'How quickly can you build my website?',
    answer: 'We deliver most standard business websites within 5-7 days. Larger projects with custom features may take 10-14 days. You will get a live demo to review before final delivery.',
  },
  {
    question: 'Do I need to buy hosting separately?',
    answer: 'No! All our packages include 1 year of free hosting (2 years for Premium). We handle everything — hosting, domain, SSL certificate, and technical setup. You just focus on your business.',
  },
  {
    question: 'Will my website show up on Google?',
    answer: 'Yes! All our websites are SEO-optimized from day one. We follow Google\'s best practices, add proper meta tags, structured data, and submit your site to Google Search Console. Basic plan includes basic SEO, Business & Premium include advanced SEO.',
  },
  {
    question: 'Can I see a demo before making payment?',
    answer: 'Absolutely! We build your website on a staging server first, show you a live demo, and make revisions until you are 100% satisfied. You pay only after you approve the final design.',
  },
  {
    question: 'What if I don\'t like the design?',
    answer: 'We offer unlimited revisions during the development phase. Your satisfaction is our priority. We keep revising until you love the design. No extra charges.',
  },
  {
    question: 'Do you provide website maintenance?',
    answer: 'Yes! We offer monthly maintenance at just ₹999/month which includes content updates, security patches, backups, and minor design changes. Premium plan includes 6 months free maintenance.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer: 'Yes, we specialize in website redesigns. We can transform your old website into a modern, fast, and mobile-friendly design. Contact us for a custom quote based on your current website.',
  },
  {
    question: 'What if I need additional pages later?',
    answer: 'No problem! We charge just ₹999 per additional page. You can add more pages anytime. All new pages will match your existing design perfectly.',
  },
];

export default function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Everything you need to know before getting started. Still have questions? We are here to help.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 ${
                openIndex === index
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-sm font-semibold text-slate-800">
                  {faq.question}
                </span>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-blue-600' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-sm leading-relaxed text-slate-500">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}