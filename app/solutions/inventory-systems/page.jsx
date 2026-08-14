import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, Package } from "lucide-react";

export const metadata = {
  title: "Custom Inventory Management System Development | Geetanjali Softwares",
  description: "Bespoke inventory tracking dashboards, barcode scanning integrations, automated low-stock alert systems, purchase order management modules, and warehouse logistics APIs.",
  keywords: "custom inventory management system, warehouse software development, stock tracking dashboard, barcode scanner integration, purchase order system",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"Custom Inventory Management System Development","description":"Bespoke inventory tracking dashboards, barcode scanning integrations, automated low-stock alert systems, purchase order management modules, and warehouse logistics APIs.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const INVENTORY_SYSTEMS_FAQS = [
  {
    "question": "What features are included in a custom inventory management system?",
    "answer": "Features include real-time stock level tracking, barcode/QR scanner integration, low-stock alerts, multi-warehouse sync, and supplier PO management."
  },
  {
    "question": "Can the inventory system connect to our e-commerce store and marketplaces?",
    "answer": "Yes! Stock levels automatically update across your website, Amazon, Flipkart, and physical store POS in real time."
  },
  {
    "question": "Can warehouse staff scan products using mobile smartphones?",
    "answer": "Yes, we build web-based camera barcode scanning modules so staff can scan stock directly from mobile devices without expensive hardware."
  },
  {
    "question": "Does the system generate automated purchase orders when stock is low?",
    "answer": "Yes, automated triggers alert managers and generate draft purchase orders when inventory reaches predefined reorder thresholds."
  },
  {
    "question": "How long does it take to build a custom inventory system?",
    "answer": "Custom inventory management solutions take 4 to 6 weeks to deploy."
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
            Custom Inventory Management <br />
            <span className="text-orange-600">System Development</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Real-time stock control built around your product flows.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Full-visibility inventory control for modern operations.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Bespoke inventory tracking dashboards, barcode scanning integrations, automated low-stock alert systems, purchase order management modules, and warehouse logistics APIs.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-md p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-white border border-stone-100 flex items-center justify-center">
                <Package className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Real-time multi-warehouse stock level tracking</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Barcode / QR code scanning module integrations</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Automated restock alert & purchase order workflows</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Sales channel synchronization across platforms</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Inventory Management Solutions FAQs"
        subtitle="Questions about real-time inventory tracking and warehouse software."
        faqs={INVENTORY_SYSTEMS_FAQS}
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


