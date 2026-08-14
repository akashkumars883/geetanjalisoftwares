import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, Users } from "lucide-react";

export const metadata = {
  title: "Custom Customer Portal Development | Geetanjali Softwares",
  description: "Secure customer-facing portals with account dashboards, support ticket management, document access, subscription controls, and real-time notification systems.",
  keywords: "customer portal development, client self-service dashboard, custom account portal, branded customer web portal, support ticket system",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"Custom Customer Portal Development","description":"Secure customer-facing portals with account dashboards, support ticket management, document access, subscription controls, and real-time notification systems.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const CUSTOMER_PORTALS_FAQS = [
  {
    "question": "What is a custom customer portal?",
    "answer": "A customer portal is a secure web application where clients can log in to view project status, download invoices, submit tickets, and share files."
  },
  {
    "question": "How does a client portal improve operational efficiency?",
    "answer": "It reduces repetitive support emails by 60% by giving clients 24/7 self-service access to their account data and project deliverables."
  },
  {
    "question": "Can clients upload and sign documents securely inside the portal?",
    "answer": "Yes, we integrate secure file uploads, PDF previews, and electronic signature API connectors."
  },
  {
    "question": "Is the portal mobile-friendly for clients on the go?",
    "answer": "Yes, all customer portals are fully responsive and optimized for mobile devices, tablets, and desktop screens."
  },
  {
    "question": "How long does it take to build a custom client portal?",
    "answer": "Custom customer portals are delivered within 4 to 6 weeks depending on feature requirements."
  }
];

export default function SolutionPage() {
  return (
    <main className="min-h-screen bg-white pt-16 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Header */}
      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Solutions Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Custom Customer <br />
            <span className="text-orange-600">Portal Development</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Branded self-service portals that delight your clients.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Empowering clients with self-service digital tools.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Secure customer-facing portals with account dashboards, support ticket management, document access, subscription controls, and real-time notification systems.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-md p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-white border border-stone-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Branded account dashboard with usage analytics</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Support ticket & live chat integrations</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Document upload & invoice management panels</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Subscription & billing self-management flows</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Customer Portal Solutions FAQs"
        subtitle="Questions about client portals, document sharing, and self-service apps."
        faqs={CUSTOMER_PORTALS_FAQS}
      />

      {/* CTA */}
      <section className="py-10 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-md p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-md blur-3xl pointer-events-none" />
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to build your custom solution?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Let our team design a tailored architecture that fits your industry, scale, and budget requirements.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Get a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


