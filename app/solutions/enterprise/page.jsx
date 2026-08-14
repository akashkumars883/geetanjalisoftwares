import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, Building } from "lucide-react";

export const metadata = {
  title: "Enterprise Software & Web Solutions | Geetanjali Softwares",
  description: "Large-scale enterprise web platforms, internal workflow management tools, role-based access systems, custom CRM, ERP databases, and multi-tenant SaaS architectures.",
  keywords: "enterprise web application development, large scale SaaS platform, ERP system development, custom enterprise CRM, multi-tenant web architecture",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"Enterprise Software & Web Solutions","description":"Large-scale enterprise web platforms, internal workflow management tools, role-based access systems, custom CRM, ERP databases, and multi-tenant SaaS architectures.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const ENTERPRISE_FAQS = [
  {
    "question": "What enterprise software solutions does Geetanjali Softwares build?",
    "answer": "We engineer custom ERP modules, enterprise CRMs, automated data pipelines, legacy system migrations, and cloud SaaS architectures."
  },
  {
    "question": "How do you ensure enterprise-grade security and compliance?",
    "answer": "We follow SOC2 principles, OWASP guidelines, ISO standards, end-to-end data encryption, and role-based access control (RBAC)."
  },
  {
    "question": "Can you integrate with our existing SAP, Oracle, or Microsoft systems?",
    "answer": "Yes, we build robust enterprise API bridges and middleware to sync with SAP, Oracle, Salesforce, and legacy mainframes."
  },
  {
    "question": "Do you offer SLA agreements for 24/7 technical support?",
    "answer": "Yes, we provide formal Service Level Agreements (SLAs) guaranteeing 99.9% uptime and 24/7 priority emergency support."
  },
  {
    "question": "What is your enterprise engagement model?",
    "answer": "We offer dedicated team retainers, fixed-price milestone sprints, and augmented staff models tailored to enterprise procurement."
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Solutions Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Enterprise Software & <br />
            <span className="text-orange-600">Web Solutions</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Complex systems engineered for scale and reliability.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Engineering systems that support enterprise operations.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Large-scale enterprise web platforms, internal workflow management tools, role-based access systems, custom CRM, ERP databases, and multi-tenant SaaS architectures.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <Building className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Multi-region deployment architectures & SLAs</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Role-based access control & audit logging</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Custom ERP, CRM & workflow management systems</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Enterprise SSO & Active Directory integrations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Enterprise Solutions FAQs"
        subtitle="Questions about enterprise digital transformation and custom software."
        faqs={ENTERPRISE_FAQS}
      />

      {/* CTA */}
      <section className="py-10 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
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


