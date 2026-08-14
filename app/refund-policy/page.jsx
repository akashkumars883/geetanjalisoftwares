import Link from "next/link";
import { RefreshCw, ArrowRight } from "lucide-react";
import FaqSection from "@/components/FaqSection";

export const metadata = {
  title: "Cancellation & Refund Policy – Geetanjali Softwares",
  description:
    "Cancellation and Refund Policy for software development projects, monthly digital service retainers, and consulting engagements with Geetanjali Softwares.",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/refund-policy",
  },
};

const REFUND_FAQS = [
  {
    question: "Are upfront project deposits refundable if I cancel early?",
    answer:
      "Upfront deposits cover initial architecture planning and sprint scheduling. Deposits are refundable within 48 hours of project kickoff minus a 10% administrative discovery fee.",
  },
  {
    question: "What is the policy for completed and approved project milestones?",
    answer:
      "Once a milestone deliverable is reviewed, signed off, or approved by the Client, payments made for that milestone are non-refundable.",
  },
  {
    question: "How do I cancel a monthly recurring SEO or maintenance retainer?",
    answer:
      "Monthly retainers can be cancelled anytime with a 15-day written notice prior to the next billing cycle. No partial month charges will apply thereafter.",
  },
  {
    question: "How long does it take to process an approved refund?",
    answer:
      "Approved refunds are processed via original payment methods (wire transfer, UPI, card, bank transfer) within 7 to 14 business days.",
  },
  {
    question: "Who should I reach out to for billing or refund inquiries?",
    answer:
      "You can contact our accounts team directly at geetanjalisoftwares@gmail.com or through your assigned project manager.",
  },
];

export default function RefundPolicyPage() {
  const lastUpdated = "August 13, 2026";

  return (
    <main className="min-h-screen bg-white pt-16 text-left">
      {/* Header */}
      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <RefreshCw className="h-3.5 w-3.5 text-orange-600" /> Client Guarantee & Terms
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-stone-900 leading-[1.1]">
            Cancellation & Refund Policy
          </h1>
          <p className="text-sm text-stone-500 font-light">
            Last Updated: <span className="text-stone-900 font-semibold">{lastUpdated}</span>
          </p>
        </div>
      </section>

      {/* Content Body */}
      <section className="py-10 bg-white px-6">
        <div className="max-w-4xl mx-auto space-y-10 text-stone-600 text-sm sm:text-base leading-relaxed font-light">
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              1. General Principles
            </h2>
            <p>
              At Geetanjali Softwares, we strive to maintain complete clarity and mutual satisfaction across all client engagements. Because our work involves custom engineering, software architecture, technical design, and dedicated developer allocation, our refund and cancellation terms reflect the resource-intensive nature of custom software development.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              2. Custom Software & Web Projects (Milestone Based)
            </h2>
            <div className="space-y-3 pl-4 border-l-2 border-orange-600/30">
              <h3 className="text-base font-semibold text-stone-800">A. Initial Deposit & Discovery Phase</h3>
              <p className="text-stone-600 text-sm">
                Upfront initial project deposits cover project setup, architecture planning, UX wireframing, and sprint scheduling. Initial deposits are refundable if cancellation is requested in writing within 48 hours of project kickoff, minus an administrative discovery fee of 10%.
              </p>
            </div>

            <div className="space-y-3 pl-4 border-l-2 border-orange-600/30">
              <h3 className="text-base font-semibold text-stone-800">B. Completed Milestones</h3>
              <p className="text-stone-600 text-sm">
                Once a project milestone is reviewed, approved by the Client, or signed off, payments made for that completed milestone are non-refundable.
              </p>
            </div>

            <div className="space-y-3 pl-4 border-l-2 border-orange-600/30">
              <h3 className="text-base font-semibold text-stone-800">C. Unfulfilled Milestones</h3>
              <p className="text-stone-600 text-sm">
                In the event of contract termination prior to completion, the Client is only responsible for billable developer hours worked up to the date of formal cancellation notice. Any unused prepaid amounts for future unstarted milestones will be refunded within 14 business days.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              3. Ongoing Monthly Retainers & Maintenance
            </h2>
            <p>
              Monthly subscription retainers (such as ongoing SEO, server management, or monthly support packages) can be cancelled at any time by providing a 15-day notice before the start of the next billing cycle. No partial refunds are issued for the current active billing month.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-stone-900">
              4. How to Request a Cancellation or Refund
            </h2>
            <p>
              To cancel a project or request a refund evaluation, please send an official written request to your account manager or reach out directly to:
            </p>
            <div className="p-6 rounded-md bg-stone-50 border border-stone-100 space-y-2">
              <p className="text-stone-900 font-bold">Geetanjali Softwares Support</p>
              <p className="text-stone-600 text-sm">Email: geetanjalisoftwares@gmail.com</p>
              <p className="text-stone-600 text-sm">Response Time: Within 24-48 business hours</p>
            </div>
          </section>

          {/* FAQ Section */}
          <FaqSection
            title="Refund & Cancellation Frequently Asked Questions"
            subtitle="Clear answers regarding our deposit policies, billing cycles, and refunds."
            faqs={REFUND_FAQS}
          />

          {/* Bottom Navigation Links */}
          <div className="pt-8 border-t border-stone-100 flex items-center justify-between">
            <Link 
              href="/contact" 
              className="text-xs font-semibold text-stone-700 hover:text-black flex items-center gap-1.5 transition-colors"
            >
              Contact Customer Support <ArrowRight className="h-3.5 w-3.5 text-orange-600" />
            </Link>
            <Link 
              href="/terms-of-service" 
              className="text-xs text-stone-500 hover:text-stone-900 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
