import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";
import FaqSection from "@/components/FaqSection";

export const metadata = {
  title: "Privacy Policy – Geetanjali Softwares",
  description:
    "Privacy Policy for Geetanjali Softwares. Learn how we collect, protect, and handle your data when using our software development services and website.",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/privacy-policy",
  },
};

const PRIVACY_FAQS = [
  {
    question: "What personal data does Geetanjali Softwares collect?",
    answer:
      "We collect basic contact information (name, business email, phone, company name) provided voluntarily via contact forms, as well as technical device logs (IP address, browser type) to optimize performance.",
  },
  {
    question: "Do you sell or share client data with third-party advertisers?",
    answer:
      "No. We never sell, trade, or rent client data to third parties. Data is shared exclusively with necessary infrastructure partners (AWS, Vercel, payment gateways) under strict confidentiality agreements.",
  },
  {
    question: "How do you protect proprietary source code and client NDAs?",
    answer:
      "We enforce mutual Non-Disclosure Agreements (NDAs), encrypted git repository permissions, two-factor authentication, and strict access controls to ensure your project IP remains confidential.",
  },
  {
    question: "How can I request deletion or correction of my personal data?",
    answer:
      "Simply email geetanjalisoftwares@gmail.com with your data request. Our compliance team will process and confirm your data deletion within 5 business days.",
  },
  {
    question: "Do you use cookies on Geetanjali Softwares website?",
    answer:
      "We use essential and basic performance analytics cookies to understand page load speeds and visitor flow. You can disable non-essential cookies via your browser settings at any time.",
  },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 13, 2026";

  return (
    <main className="min-h-screen bg-white pt-24 text-left">
      {/* Header */}
      <section className="py-20 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <Shield className="h-3.5 w-3.5 text-orange-600" /> Legal & Transparency
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-stone-900 leading-[1.1]">
            Privacy Policy
          </h1>
          <p className="text-sm text-stone-500 font-light">
            Last Updated: <span className="text-stone-900 font-semibold">{lastUpdated}</span>
          </p>
        </div>
      </section>

      {/* Content Body */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-4xl mx-auto space-y-10 text-stone-600 text-sm sm:text-base leading-relaxed font-light">
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              1. Introduction & Overview
            </h2>
            <p>
              Geetanjali Softwares (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal and technical information when you visit our website (geetanjalisoftwares.com), use our software applications, or engage our custom software engineering, digital automation, and SEO services.
            </p>
            <p>
              By accessing or using our services, you signify your agreement to the terms described in this policy. If you disagree with any portion of this Privacy Policy, please discontinue use of our site and services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              2. Information We Collect
            </h2>
            <p>We may collect information about you in several ways depending on how you interact with our website and services:</p>
            
            <div className="space-y-3 pl-4 border-l-2 border-orange-600/30">
              <h3 className="text-base font-semibold text-stone-800">A. Personal Information You Provide</h3>
              <p className="text-stone-600 text-sm">
                When you fill out contact forms, request a consultation, subscribe to our newsletter, or contract our custom software services, we may collect:
              </p>
              <ul className="list-disc list-inside text-sm text-stone-600 space-y-1">
                <li>Full name and business title</li>
                <li>Email address and telephone number</li>
                <li>Company name, website URL, and office address</li>
                <li>Project requirements, scope notes, and technical documentation</li>
                <li>Billing address and payment details</li>
              </ul>
            </div>

            <div className="space-y-3 pl-4 border-l-2 border-orange-600/30">
              <h3 className="text-base font-semibold text-stone-800">B. Automatically Collected Technical Data</h3>
              <p className="text-stone-600 text-sm">
                When you navigate our website, our servers automatically log technical metadata, including:
              </p>
              <ul className="list-disc list-inside text-sm text-stone-600 space-y-1">
                <li>IP address and approximate geographic location</li>
                <li>Browser type, operating system, and device details</li>
                <li>Referral sources, pages viewed, time spent, and clickstream data</li>
                <li>Performance metrics and error diagnostic telemetry</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              3. How We Use Your Information
            </h2>
            <p>We utilize the collected information strictly for legitimate business purposes, including:</p>
            <ul className="list-disc list-inside space-y-2 text-stone-600">
              <li>Providing, operating, and maintaining our software development & consulting services.</li>
              <li>Processing contact inquiries, providing project quotes, and onboarding new clients.</li>
              <li>Communicating project updates, technical reports, and invoice notifications.</li>
              <li>Improving website speed, security posture, and user experience.</li>
              <li>Complying with legal obligations, fraud prevention, and enforcing terms.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              4. Cookies and Tracking Technologies
            </h2>
            <p>
              We use essential and analytical cookies to analyze site traffic, optimize performance, and personalize experience. You can choose to disable cookies through your web browser settings, though doing so may affect certain website functionalities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              5. Data Protection and Confidentiality
            </h2>
            <p>
              We enforce strict Non-Disclosure Agreements (NDAs) across our engineering team and implement industry-standard encryption (SSL/TLS), secure cloud architecture, and access controls to guard your confidential code and business information against unauthorized access, loss, or disclosure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              6. Third-Party Service Providers
            </h2>
            <p>
              We do not sell, trade, or rent your personal data to third parties. We may share necessary data with trusted infrastructure providers (e.g., Vercel, AWS, analytics tools, payment processors) solely for delivering our services under strict confidentiality agreements.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              7. Your Rights & Data Requests
            </h2>
            <p>
              Depending on your location, you have the right to access, rectify, delete, or restrict the processing of your personal data. To exercise any of these rights, please submit a request to our compliance team.
            </p>
          </section>

          <section className="space-y-4 border-t border-stone-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              8. Contacting Us Regarding Privacy
            </h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please reach out to us at:
            </p>
            <div className="p-6 rounded-xl bg-stone-50 border border-stone-100 space-y-2">
              <p className="text-stone-900 font-bold">Geetanjali Softwares</p>
              <p className="text-stone-600 text-sm">Email: geetanjalisoftwares@gmail.com</p>
              <p className="text-stone-600 text-sm">Website: https://geetanjalisoftwares.com/contact</p>
            </div>
          </section>

          {/* FAQ Section */}
          <FaqSection
            title="Privacy Frequently Asked Questions"
            subtitle="Common questions regarding data privacy, security, and client confidentiality."
            faqs={PRIVACY_FAQS}
          />

          {/* Bottom Navigation Links */}
          <div className="pt-8 border-t border-stone-100 flex items-center justify-between">
            <Link 
              href="/terms-of-service" 
              className="text-xs font-semibold text-stone-700 hover:text-black flex items-center gap-1.5 transition-colors"
            >
              Read Terms of Service <ArrowRight className="h-3.5 w-3.5 text-orange-600" />
            </Link>
            <Link 
              href="/" 
              className="text-xs text-stone-500 hover:text-stone-900 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
