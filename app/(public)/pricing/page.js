import Link from "next/link";
import { CheckCircle } from "lucide-react";
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
      <main className="pb-24 pt-12 sm:pt-20">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 sm:text-sm">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-normal tracking-tight text-slate-900 sm:text-6xl">
            Transparent pricing for <span className="text-slate-500">serious digital investment.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
            Every project starts with a clear scope and a fixed quote. These starting points help you plan a realistic budget before our first conversation — no hidden costs, no surprises.
          </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {packages.map((item) => (
              <article key={item.name} className="rounded-2xl border border-black/5 bg-slate-50 p-6">
                <h2 className="text-2xl font-normal tracking-tight text-slate-900">{item.name}</h2>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-orange-600">{item.price}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description}</p>
                <ul className="mt-6 space-y-3">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-slate-700">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact-form" className="inline-flex items-center justify-center rounded-2xl bg-orange-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-700">
              Get a Fixed Quote
            </Link>
            <Link href="/services/website-design-development" className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              View Website Services
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-normal tracking-tight text-slate-900">Pricing Questions</h2>
          <div className="mt-8 space-y-4 rounded-2xl border border-black/5 bg-slate-50 p-6">
            {faqs.map((item) => (
              <details key={item.question} className="border-b border-black/5 pb-4 last:border-0 last:pb-0">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">{item.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
