import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import FaqSection from "@/components/FaqSection";

export const metadata = {
  title: "Terms of Service – Geetanjali Softwares",
  description:
    "Terms of Service and legal agreement governing custom software development, web engineering, AI automation, and technical SEO services by Geetanjali Softwares.",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/terms-of-service",
  },
};

const TERMS_FAQS = [
  {
    question: "When do these Terms of Service take effect?",
    answer:
      "These terms take effect upon accessing our website or executing a formal project proposal / statement of work (SOW) with Geetanjali Softwares.",
  },
  {
    question: "When is full source code ownership transferred to my business?",
    answer:
      "Full code ownership, intellectual property rights, and repository access are assigned and transferred upon receipt of final milestone payment.",
  },
  {
    question: "What happens if our team requests additional features during sprint cycles?",
    answer:
      "Scope additions are handled smoothly via transparent Change Requests (CR). We outline the estimated effort, cost, and timeline adjustments before proceeding.",
  },
  {
    question: "How are third-party open-source libraries and APIs licensed?",
    answer:
      "Custom application logic is 100% owned by you. Standard third-party open-source dependencies (e.g. Next.js, React) remain governed by their respective permissive licenses (MIT/Apache).",
  },
  {
    question: "What is the notice requirement for project termination?",
    answer:
      "Either party may terminate an active statement of work upon 14 days written notice. Payment is due strictly for work completed up to the date of termination.",
  },
];

export default function TermsOfServicePage() {
  const lastUpdated = "August 13, 2026";

  return (
    <main className="min-h-screen bg-white pt-24 text-left">
      {/* Header */}
      <section className="py-20 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <FileText className="h-3.5 w-3.5 text-orange-600" /> Legal Terms
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-stone-900 leading-[1.1]">
            Terms of Service
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
              1. Agreement to Terms
            </h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Client&quot;, &quot;User&quot;, or &quot;You&quot;) and Geetanjali Softwares (&quot;Company&quot;, &quot;We&quot;, or &quot;Us&quot;). By accessing our website or contracting our software engineering, website development, AI integration, CRM custom build, or SEO services, you agree to comply with and be bound by these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              2. Scope of Services
            </h2>
            <p>
              Geetanjali Softwares provides custom software application development, website design and engineering, artificial intelligence workflow automation, search engine optimization, and enterprise consulting. Specific project deliverables, timelines, milestones, and fees will be governed by individual Master Services Agreements (MSA), Statements of Work (SOW), or project proposals executed between the Client and Company.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              3. Client Responsibilities
            </h2>
            <p>To ensure project success and timely delivery, Client agrees to:</p>
            <ul className="list-disc list-inside space-y-1 text-stone-600 pl-2">
              <li>Provide required assets, technical documentation, API keys, and content promptly.</li>
              <li>Designate a primary technical point of contact for review approvals and feedback.</li>
              <li>Ensure all provided content does not infringe upon any third-party intellectual property.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              4. Intellectual Property & Code Ownership
            </h2>
            <div className="p-6 rounded-xl bg-stone-50 border border-stone-100 space-y-3">
              <h3 className="text-base font-bold text-stone-900">Full IP Transfer Upon Settlement</h3>
              <p className="text-sm text-stone-700">
                Upon final payment of all agreed project milestone fees, Geetanjali Softwares assigns and transfers to Client all custom source code, application assets, designs, and intellectual property developed explicitly for the Client project.
              </p>
              <p className="text-xs text-stone-500">
                * Note: Third-party open-source libraries, frameworks, or proprietary underlying developer tools retained by Us remain subject to their respective software licenses.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              5. Payment Terms & Invoicing
            </h2>
            <p>
              Invoices are issued according to project milestones specified in the proposal/SOW. Payments are due within the payment timeframe stated on the invoice. Milestone deliverables are released for production deployment upon receipt of cleared funds.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Geetanjali Softwares shall not be liable for any indirect, incidental, consequential, special, or punitive damages (including loss of profits, data loss, or business interruption) arising out of or related to the use or inability to use the software systems created.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              7. Termination of Engagement
            </h2>
            <p>
              Either party may terminate a project agreement upon 14 days written notice if the other party breaches any material term of the agreement and fails to cure such breach within the notice period. Client shall be responsible for payment for all work completed up to the date of termination.
            </p>
          </section>

          <section className="space-y-4 border-t border-stone-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              8. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any legal action or proceeding arising under these Terms shall be subject to the exclusive jurisdiction of courts located in India.
            </p>
          </section>

          {/* FAQ Section */}
          <FaqSection
            title="Terms of Service Frequently Asked Questions"
            subtitle="Common questions regarding legal agreements, code transfer, and project terms."
            faqs={TERMS_FAQS}
          />

          {/* Bottom Navigation Links */}
          <div className="pt-8 border-t border-stone-100 flex items-center justify-between">
            <Link 
              href="/refund-policy" 
              className="text-xs font-semibold text-stone-700 hover:text-black flex items-center gap-1.5 transition-colors"
            >
              Read Cancellation & Refund Policy <ArrowRight className="h-3.5 w-3.5 text-orange-600" />
            </Link>
            <Link 
              href="/privacy-policy" 
              className="text-xs text-stone-500 hover:text-stone-900 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
