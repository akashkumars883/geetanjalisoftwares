import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Palette, Compass, Layers, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Corporate Branding & Visual Identity Design | Geetanjali Softwares",
  description:
    "Corporate branding, visual identity systems, brand positioning, UI/UX design systems, and digital asset engineering for growing enterprises and startups worldwide.",
  keywords:
    "corporate branding services, brand identity design, company logo design, UI UX design systems, digital branding agency India, corporate brand strategy",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/services/branding",
  },
  openGraph: {
    title: "Corporate Branding & Visual Identity Design | Geetanjali Softwares",
    description: "Build an unforgettable, scalable corporate identity with custom visual design systems, brand guidelines, and modern UI kits.",
    url: "https://geetanjalisoftwares.com/services/branding",
    type: "website",
  },
};


const BRANDING_FAQS = [
  {
    "question": "What is included in your corporate branding packages?",
    "answer": "Our packages include logo design, brand positioning guidelines, typography systems, color palettes, social media kits, and UI design design tokens."
  },
  {
    "question": "How long does a complete brand identity redesign take?",
    "answer": "Corporate branding projects typically take 2 to 4 weeks from discovery moodboards to final asset handoff."
  },
  {
    "question": "Do you deliver vector source files and brand guidelines books?",
    "answer": "Yes, you receive all original vector source files (SVG, EPS, AI), high-res PNGs, and a comprehensive PDF brand guideline manual."
  },
  {
    "question": "Can you align our brand identity with our website UI/UX?",
    "answer": "Yes! We specialize in cohesive digital brand systems that translate seamlessly into modern, responsive web application interfaces."
  },
  {
    "question": "What is the process to start a brand redesign project?",
    "answer": "We begin with a brand discovery questionnaire, review competitive positioning, present 3 distinct visual concepts, and refine your chosen identity."
  }
];

export default function CorporateBrandingPage() {
  const pillars = [
    {
      title: "Brand Strategy & Positioning",
      icon: <Compass className="h-6 w-6 text-orange-600" />,
      tagline: "Define your market position and core narrative.",
      description: "We work with leadership teams to define value propositions, audience personas, competitive differentiation, and strategic brand positioning that resonates globally.",
      benefits: [
        "Core brand values & mission architecture",
        "Competitor positioning & market gap analysis",
        "Target audience personas & voice guidelines",
        "Strategic taglines & messaging frameworks"
      ],
    },
    {
      title: "Visual Identity & Logo Engineering",
      icon: <Palette className="h-6 w-6 text-orange-600" />,
      tagline: "Craft an iconic, memorable aesthetic.",
      description: "Designing timeless visual assets — from logo marks and typography hierarchies to cohesive color palettes crafted for both high-resolution screens and print collateral.",
      benefits: [
        "Vector logo mark design (SVG, EPS, PNG variants)",
        "Curated brand color systems & HSL specifications",
        "Typography pairings & WebFont licensing guides",
        "Dark & light mode visual asset adaptations"
      ],
    },
    {
      title: "Digital UI/UX Design Systems",
      icon: <Layers className="h-6 w-6 text-orange-600" />,
      tagline: "Standardize your product & web experience.",
      description: "Building scalable Figma design systems, UI kit component libraries, accessibility specs (WCAG 2.1), and interactive prototype patterns for web and mobile software.",
      benefits: [
        "Figma design tokens & UI component libraries",
        "Accessible color contrast & focus state specifications",
        "Micro-interaction & transition animation specs",
        "Cross-platform responsive layout breakpoints"
      ],
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Corporate Branding & Visual Identity Design Services",
    "description": "Bespoke corporate branding, visual identity systems, digital UI kit engineering, and brand strategy for growing businesses.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Geetanjali Softwares",
      "url": "https://geetanjalisoftwares.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Branding Pillars",
      "itemListElement": pillars.map((pillar) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": pillar.title,
          "description": pillar.description
        }
      }))
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 text-left selection:bg-orange-500/20 selection:text-orange-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Header Section */}
      <section className="py-20 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            <Palette className="h-3.5 w-3.5 text-orange-600" /> Services / Corporate Branding
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Corporate Branding & <br />
            <span className="text-orange-600">Visual Identity Design</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Craft a commanding corporate presence. We design high-impact visual identities, brand strategy blueprints, digital UI systems, and design guidelines that position your business for market leadership.
          </p>
        </div>
      </section>

      {/* Branding Pillars Grid */}
      <section className="py-16 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-stone-900">
              End-to-end brand transformation capabilities.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Our designers and brand architects combine strategy with precision UI execution to ensure your brand stands out on every digital touchpoint.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <article
                key={index}
                className="bg-stone-50 border border-stone-100 rounded-2xl p-8 flex flex-col justify-between hover:border-stone-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="h-12 w-12 rounded-xl bg-white border border-stone-100 flex items-center justify-center">
                    {pillar.icon}
                  </div>

                  {/* Header info */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-stone-900">{pillar.title}</h3>
                    <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider">{pillar.tagline}</div>
                  </div>

                  {/* Desc */}
                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Benefits list */}
                  <ul className="space-y-2.5 pt-4 border-t border-stone-200/60">
                    {pillar.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700 font-medium">
                        <Zap className="h-3.5 w-3.5 text-orange-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverable Kit Showcase */}
      <section className="py-16 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900">What You Receive</h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light">Complete brand ownership documentation and production-ready design asset kits.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Complete Brand Style Guide PDF",
              "Vector Logos & Social Avatars",
              "Figma UI Component Kit & Tokens",
              "Custom Email & Document Templates",
              "Typography & WebFont Bundles",
              "Color System Swatches (HEX/RGB/HSL)",
              "Iconography & Pattern Assets",
              "100% Full IP Transfer Rights",
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-800 flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-orange-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <FaqSection
        title="Corporate Branding Services FAQs"
        subtitle="Questions about brand strategy, visual identities, and UI design kits."
        faqs={BRANDING_FAQS}
      />

      {/* CTA Section */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to elevate your corporate brand identity?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Schedule a consultation with our lead brand designers to discuss your market positioning and visual design goals.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Request Branding Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
