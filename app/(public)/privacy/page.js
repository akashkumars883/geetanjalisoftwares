import React from 'react';

export const metadata = {
  title: "Privacy Policy | Geetanjali Softwares",
  description:
    "Read the Privacy Policy for Geetanjali Softwares: what data we collect, how we use it, and how we protect it.",
  alternates: {
    canonical: "https://www.geetanjalisoftwares.in/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Geetanjali Softwares",
    description:
      "Read the Privacy Policy for Geetanjali Softwares: what data we collect, how we use it, and how we protect it.",
    url: "https://www.geetanjalisoftwares.in/privacy",
    siteName: "Geetanjali Softwares",
    images: [{ url: "https://www.geetanjalisoftwares.in/icon.png", width: 512, height: 512 }],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Geetanjali Softwares",
    description:
      "Read the Privacy Policy for Geetanjali Softwares: what data we collect, how we use it, and how we protect it.",
    images: ["https://www.geetanjalisoftwares.in/icon.png"],
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-20">
      <div className="pt-12 sm:pt-20 pb-8 border-b border-black/5">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">Legal</span>
        <h1 className="mt-4 text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl leading-[1.15]">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last Updated: June 2026</p>
      </div>
      
      <div className="mt-12 space-y-12 text-base leading-relaxed text-slate-600">
        <section>
          <h2 className="text-2xl font-normal text-slate-900 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you fill out a contact form or request a consultation. This may include your name, email address, phone number, and any details about your project.</p>
        </section>

        <section>
          <h2 className="text-2xl font-normal text-slate-900 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to respond to enquiries, prepare quotes, provide project support, improve website performance, and communicate about services you requested.</p>
        </section>

        <section>
          <h2 className="text-2xl font-normal text-slate-900 mb-4">3. Cookies and Analytics</h2>
          <p>We may use essential cookies and analytics tools such as Google Analytics to understand website usage, improve page performance, and measure marketing effectiveness. You can control cookies through your browser settings.</p>
        </section>

        <section>
          <h2 className="text-2xl font-normal text-slate-900 mb-4">4. DPDP Act Readiness</h2>
          <p>For Indian users, we aim to handle personal data in line with the Digital Personal Data Protection Act, 2023 principles, including purpose limitation, reasonable security safeguards, and clear contact options for data-related requests.</p>
        </section>

        <section>
          <h2 className="text-2xl font-normal text-slate-900 mb-4">5. Data Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, and disclosure.</p>
        </section>

        <section>
          <h2 className="text-2xl font-normal text-slate-900 mb-4">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at geetanjalisoftwares@gmail.com.</p>
        </section>
      </div>
    </div>
  );
}
