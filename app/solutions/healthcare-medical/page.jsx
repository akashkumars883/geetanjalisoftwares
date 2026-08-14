import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, Heart } from "lucide-react";

export const metadata = {
  title: "Healthcare & Medical Web Solutions | Geetanjali Softwares",
  description: "Secure patient portals, appointment booking systems, telehealth integrations, and SEO-optimized medical service landing pages compliant with healthcare data privacy standards.",
  keywords: "healthcare web development, medical website design, HIPAA compliant patient portal, doctor appointment booking system, medical SEO",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"Healthcare & Medical Web Solutions","description":"Secure patient portals, appointment booking systems, telehealth integrations, and SEO-optimized medical service landing pages compliant with healthcare data privacy standards.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const HEALTHCARE_MEDICAL_FAQS = [
  {
    "question": "What healthcare digital solutions do you build?",
    "answer": "We build patient appointment portals, telemedicine video consultation apps, electronic health records (EHR) viewers, and clinic management tools."
  },
  {
    "question": "How is patient data privacy protected?",
    "answer": "We enforce strict encryption at rest and in transit, HIPAA compliance guidelines, role-based clinician access, and secure cloud storage."
  },
  {
    "question": "Can patients book appointments and pay consultation fees online?",
    "answer": "Yes! Patients can view real-time doctor availability, book appointments, receive SMS/WhatsApp reminders, and pay online securely."
  },
  {
    "question": "Can the app integrate video calling for online consultations?",
    "answer": "Yes, we integrate encrypted WebRTC / Twilio Video APIs for high-quality, private doctor-patient video consultations."
  },
  {
    "question": "How long does it take to launch a healthcare portal?",
    "answer": "Healthcare patient portals and telemedicine web apps are delivered in 6 to 8 weeks."
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
            Healthcare & Medical <br />
            <span className="text-orange-600">Web Solutions</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            HIPAA-aware digital tools built for modern medical practices.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Helping medical services grow their digital reach.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Secure patient portals, appointment booking systems, telehealth integrations, and SEO-optimized medical service landing pages compliant with healthcare data privacy standards.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <Heart className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>HIPAA-aware secure patient data handling systems</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Online appointment booking & calendar sync APIs</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Telehealth & video consultation integrations</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Local SEO for clinic & specialist search rankings</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Healthcare & Medical Solutions FAQs"
        subtitle="Questions about telemedicine apps, patient portals, and clinic software."
        faqs={HEALTHCARE_MEDICAL_FAQS}
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


