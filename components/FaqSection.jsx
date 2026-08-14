"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our services, pricing, and process.",
  faqs = [],
}) {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  if (!faqs || faqs.length === 0) return null;

  // Generate FAQPage JSON-LD Schema for Google Rich Search Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-stone-50 border-t border-stone-200/80 relative z-10 px-6 text-left">
      {/* FAQ Schema for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <HelpCircle className="h-3.5 w-3.5 text-orange-600" /> FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-stone-900 leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-stone-300 shadow-md"
                    : "border-stone-200/80 hover:border-stone-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-stone-900 pr-4 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`h-8 w-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-orange-600 text-white border-orange-600" : "bg-stone-50"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-stone-600 font-light leading-relaxed border-t border-stone-100 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
