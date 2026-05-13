import React from 'react';

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-20">
      <div className="pt-12 sm:pt-20 pb-8 border-b border-black/5">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">Legal</span>
        <h1 className="mt-4 text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl leading-[1.15]">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-500">Last Updated: April 2026</p>
      </div>
      
      <div className="mt-12 space-y-12 text-base leading-relaxed text-slate-600">
        <section>
          <h2 className="text-2xl font-normal text-slate-900 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using the services provided by Geetanjali Softwares, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-normal text-slate-900 mb-4">2. Services Provided</h2>
          <p>Geetanjali Softwares provides web development, digital marketing, and branding services. The specific scope of work for each project will be outlined in a separate agreement or proposal.</p>
        </section>

        <section>
          <h2 className="text-2xl font-normal text-slate-900 mb-4">3. Intellectual Property</h2>
          <p>Unless otherwise agreed upon in writing, all materials produced by Geetanjali Softwares during the course of a project remain the intellectual property of Geetanjali Softwares until full payment is received.</p>
        </section>

        <section>
          <h2 className="text-2xl font-normal text-slate-900 mb-4">4. Limitation of Liability</h2>
          <p>Geetanjali Softwares shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use of our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-normal text-slate-900 mb-4">5. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of India.</p>
        </section>
      </div>
    </div>
  );
}
