import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Website Design Cost in Faridabad | Geetanjali Softwares",
  description:
    "Compare practical website design, SEO, and e-commerce package starting prices for Faridabad and Delhi NCR businesses.",
  alternates: { canonical: `${SITE_URL}/pricing` },
  keywords:
    "website design cost in faridabad, website design price faridabad, seo package cost india, web development packages",
};

const packages = [
  {
    name: "Starter Website",
    price: "Rs 15,000+",
    description: "A focused online presence for consultants, service businesses, and local brands.",
    features: ["Up to 5 core pages", "Mobile-responsive design", "Contact form + WhatsApp CTA", "Basic on-page SEO setup"],
  },
  {
    name: "Business Website",
    price: "Rs 35,000+",
    description: "A stronger conversion-focused website for growing companies and lead generation.",
    features: ["Up to 10 pages", "Custom UI sections", "Service landing pages", "Analytics and technical SEO basics"],
  },
  {
    name: "E-Commerce / Custom",
    price: "Rs 65,000+",
    description: "Advanced stores, dashboards, booking flows, and custom software-style requirements.",
    features: ["Product or custom workflow setup", "Payment / API integrations", "Performance optimization", "Launch and support handoff"],
  },
];

const faqs = [
  {
    question: "Why does a business website cost more than Rs 5,000?",
    answer:
      "A serious business website includes planning, responsive design, copy structure, technical SEO, speed work, contact flows, and launch checks. Cheap template work usually skips the parts that help the site convert.",
  },
  {
    question: "Can you give a fixed quote before starting?",
    answer:
      "Yes. After a short requirement call, we share a clear scope, timeline, and fixed project quote so there are no surprise costs.",
  },
  {
    question: "Do packages include SEO?",
    answer:
      "Every website includes basic technical and on-page SEO setup. Ongoing SEO campaigns are quoted separately based on keywords, competition, and content needs.",
  },
];

export default function PricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen bg-background pt-0 pb-24 sm:pt-4">
        <section className="mx-auto max-w-7xl px-6 border-b border-foreground/10 pb-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60">
                Pricing
              </span>
            </div>
            <h1 className="mt-6 font-heading text-5xl sm:text-7xl lg:text-[7rem] font-bold uppercase tracking-tighter text-foreground leading-[0.85]">
              TRANSPARENT <br /> <span className="text-primary">INVESTMENT</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl font-medium">
              Every project starts with a clear scope and a fixed quote. These starting points help you plan a realistic budget before our first conversation — no hidden costs, no surprises.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {packages.map((item, index) => (
              <article key={item.name} className="flex flex-col border border-foreground/10 bg-foreground/5 p-8 transition-colors hover:border-primary">
                <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                  0{index + 1}. PLAN
                </p>
                <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground">{item.name}</h2>
                <p className="mt-4 font-heading text-5xl font-bold tracking-tight text-primary">{item.price}</p>
                <p className="mt-6 text-base leading-relaxed text-foreground/70 border-b border-foreground/10 pb-6">{item.description}</p>
                <ul className="mt-6 space-y-4 flex-grow">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex gap-4 text-sm font-medium text-foreground/80">
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-4 sm:flex-row">
            <Link href="/#contact-form" className="group relative inline-flex items-center justify-center gap-4 overflow-hidden border border-foreground/20 bg-primary px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white transition-transform duration-300 hover:scale-105 active:scale-95">
              <span className="relative z-10 transition-colors duration-300">
                Get a Fixed Quote
              </span>
              <span className="relative z-10 flex items-center justify-center transition-colors duration-300">
                <ArrowRight size={18} />
              </span>
            </Link>
            <Link href="/services/website-design-development" className="group relative inline-flex items-center justify-center gap-4 overflow-hidden border border-foreground/20 bg-transparent px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background">
              <span>View Website Services</span>
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-4xl px-6">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-foreground mb-12">Pricing Questions</h2>
          <div className="space-y-6">
            {faqs.map((item) => (
              <details key={item.question} className="group border-b border-foreground/10 pb-6 last:border-0 last:pb-0">
                <summary className="cursor-pointer font-heading text-xl font-bold uppercase tracking-tight text-foreground hover:text-primary transition-colors list-none flex justify-between items-center">
                  {item.question}
                  <span className="text-primary group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <p className="mt-6 text-lg leading-relaxed text-foreground/70 font-medium pl-4 border-l-2 border-primary/30">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
