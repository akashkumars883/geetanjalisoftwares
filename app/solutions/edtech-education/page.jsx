import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Zap, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "EdTech & Education Platform Development | Geetanjali Softwares",
  description: "Custom LMS portals, interactive course delivery systems, student dashboards, and SEO-optimized content marketing frameworks for education technology companies.",
  keywords: "edtech platform development, LMS portal development, online course website, student dashboard portal, education SEO strategy",
};

const serviceSchema = {"@context":"https://schema.org","@type":"Service","name":"EdTech & Education Platform Development","description":"Custom LMS portals, interactive course delivery systems, student dashboards, and SEO-optimized content marketing frameworks for education technology companies.","provider":{"@type":"ProfessionalService","name":"Geetanjali Softwares","url":"https://geetanjalisoftwares.com"}};


const EDTECH_EDUCATION_FAQS = [
  {
    "question": "What features can be included in a custom EdTech LMS platform?",
    "answer": "Features include video streaming, interactive quizzes, student progress tracking, certificate generation, assignment uploads, and live classes."
  },
  {
    "question": "How do you secure video content from unauthorized downloading?",
    "answer": "We implement encrypted HLS video streaming, signed URLs, DRM protection, and watermarking to prevent content piracy."
  },
  {
    "question": "Can the platform handle live classes and Zoom integration?",
    "answer": "Yes, we integrate Zoom SDK, WebRTC, and Jitsi for seamless live virtual classroom experiences directly inside the portal."
  },
  {
    "question": "Can students access courses on mobile devices?",
    "answer": "Yes, our EdTech web applications are mobile-first, ensuring smooth course navigation on smartphones and tablets."
  },
  {
    "question": "How long does it take to build a custom EdTech LMS platform?",
    "answer": "Custom EdTech platforms take 6 to 10 weeks from initial design to launch."
  }
];

export default function SolutionPage() {
  return (
    <main className="min-h-screen bg-white pt-24 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Header */}
      <section className="py-20 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Solutions Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            EdTech & Education <br />
            <span className="text-orange-600">Platform Development</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Modern learning platforms and course marketplaces.
          </p>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-16 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900 leading-tight">
              Powering modern digital learning experiences.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Custom LMS portals, interactive course delivery systems, student dashboards, and SEO-optimized content marketing frameworks for education technology companies.
            </p>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Every solution we deliver is engineered with performance, scalability, and SEO visibility in mind — ensuring your platform compounds growth over time.
            </p>
          </div>

          <div className="lg:col-span-6 bg-stone-50 border border-stone-100 rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-white border border-stone-100 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                What We Deliver
              </div>
            </div>
            <ul className="space-y-4" aria-label="Key deliverables">
              
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Custom LMS with video, quiz & certificate modules</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Student progress tracking & analytics dashboards</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>Stripe subscription & course checkout integrations</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <Zap className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <span>SEO content strategy for course discovery ranking</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="EdTech & Education Solutions FAQs"
        subtitle="Questions about learning management systems (LMS) and course portals."
        faqs={EDTECH_EDUCATION_FAQS}
      />

      {/* CTA */}
      <section className="py-16 bg-stone-50 px-6">
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


