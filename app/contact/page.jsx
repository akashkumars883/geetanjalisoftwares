import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import FaqSection from "@/components/FaqSection";

export const metadata = {
  title: "Contact Us – Get a Free Software Development Consultation",
  description:
    "Contact Geetanjali Softwares for custom web development, AI chatbot, SEO, or business automation projects. Get a free consultation within 24 hours. Serving clients in India and globally.",
  keywords:
    "contact software development company, hire web developer India, get SEO quote India, custom software consultation, project inquiry Geetanjali Softwares",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/contact",
  },
  openGraph: {
    title: "Contact Geetanjali Softwares – Free Project Consultation",
    description: "Get a free consultation for your web app, AI, or SEO project. We respond within 24 hours.",
    url: "https://geetanjalisoftwares.com/contact",
    type: "website",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Geetanjali Softwares",
  "url": "https://geetanjalisoftwares.com/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "Geetanjali Softwares",
    "telephone": "+91-6201231875",
    "email": "geetanjalisoftwares@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-6201231875",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-7508657479",
        "contactType": "technical support",
        "availableLanguage": ["English", "Hindi"],
      }
    ],
  },
};

const CONTACT_FAQS = [
  {
    question: "How quickly can I expect a response after submitting an inquiry?",
    answer:
      "Our technical team guarantees a reply within 24 hours (usually within 2-4 hours during business hours). We will review your project details and send a preliminary assessment.",
  },
  {
    question: "Is the initial project discovery consultation free?",
    answer:
      "Yes, 100% free! We provide a complimentary technical consultation call to understand your requirements, evaluate scope feasibility, and provide a fixed transparent quote.",
  },
  {
    question: "What information should I prepare before our initial call?",
    answer:
      "It helps to share a high-level summary of your business goals, target audience, any reference websites you like, key feature requirements, and your target launch timeline.",
  },
  {
    question: "Do you sign Non-Disclosure Agreements (NDAs) before discussing ideas?",
    answer:
      "Absolutely. We respect your intellectual property and business confidentiality. We are happy to execute a standard mutual NDA prior to reviewing sensitive specifications.",
  },
  {
    question: "How are project payments structured for custom development?",
    answer:
      "We typically structure payments into milestone-based installments: an initial deposit upon contract kickoff, progress milestone deliverables, and final balance upon deployment.",
  },
];

const contactDetails = [
  {
    icon: <Mail className="h-5 w-5 text-orange-600" />,
    label: "Email",
    value: "geetanjalisoftwares@gmail.com",
    href: "mailto:geetanjalisoftwares@gmail.com",
  },
  {
    icon: <Phone className="h-5 w-5 text-orange-600" />,
    label: "Phone / WhatsApp",
    value: "+91 6201231875 / +91 7508657479",
    href: "tel:+916201231875",
  },
  {
    icon: <MapPin className="h-5 w-5 text-orange-600" />,
    label: "Location",
    value: "India (Delhi NCR & Global Remote)",
    href: null,
  },
  {
    icon: <Clock className="h-5 w-5 text-orange-600" />,
    label: "Response Time",
    value: "Within 24 hours guaranteed",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-16 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* Hero */}
      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Contact Us
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Let's build something <br />
            <span className="text-orange-600">exceptional together.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Tell us about your project and we'll send a detailed proposal within 24 hours. No commitment required.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-10 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900">
                Get in touch directly.
              </h2>
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                Whether you need a full web application, a new SEO strategy, an AI integration, or just a consultation — we're here to help.
              </p>
            </div>

            <div className="space-y-4">
              {contactDetails.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-stone-50 border border-stone-100 rounded-md">
                  <div className="h-9 w-9 rounded-md bg-white border border-stone-100 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-semibold text-stone-800 hover:text-orange-600 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm font-semibold text-stone-800">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Connect Box */}
            <div className="p-6 rounded-md bg-stone-50 border border-stone-100 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-800">
                Connect On Social Media
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/geetanjalisoftwares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-blue-600">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/geetanjalisoftwares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-pink-600">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>

                {/* Pinterest */}
                <a
                  href="https://www.pinterest.com/geetanjalisoftwares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-red-600">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                  <span>Pinterest</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/geetanjalisoftwares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-blue-700">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                {/* Twitter X */}
                <a
                  href="https://x.com/geetanjalisoftwares"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter X"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current text-stone-800">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Twitter X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-stone-50 border border-stone-100 rounded-md p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-bold text-stone-900">Send us a project inquiry</h2>
            <form method="POST" action="/api/contact" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Full Name</label>
                  <input id="contact-name" name="name" type="text" required placeholder="Your full name"
                    className="w-full bg-white border border-stone-200 rounded-md px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black transition-colors" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Email Address</label>
                  <input id="contact-email" name="email" type="email" required placeholder="your@company.com"
                    className="w-full bg-white border border-stone-200 rounded-md px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black transition-colors" />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="contact-service" className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Service Required</label>
                <select id="contact-service" name="service"
                  className="w-full bg-white border border-stone-200 rounded-md px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-black transition-colors cursor-pointer">
                  <option value="web-development">Web Application Development</option>
                  <option value="ai-chatbot">AI Chatbot / Automation</option>
                  <option value="seo">SEO / Technical SEO</option>
                  <option value="ecommerce">E-Commerce Development</option>
                  <option value="crm">Custom CRM / Software</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="contact-budget" className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Approximate Budget</label>
                <select id="contact-budget" name="budget"
                  className="w-full bg-white border border-stone-200 rounded-md px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-black transition-colors cursor-pointer">
                  <option value="under-50k">Under ₹50,000</option>
                  <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                  <option value="1l-5l">₹1,00,000 – ₹5,00,000</option>
                  <option value="5l-plus">₹5,00,000+</option>
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Project Details</label>
                <textarea id="contact-message" name="message" required rows={4}
                  placeholder="Describe your project requirements, timeline, and goals..."
                  className="w-full bg-white border border-stone-200 rounded-md px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-black text-white hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer">
                Send Project Inquiry
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection
        title="Frequently Asked Questions"
        subtitle="Common questions about starting a project, contracts, and consultation calls."
        faqs={CONTACT_FAQS}
      />
    </main>
  );
}
