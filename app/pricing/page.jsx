import Pricing from "@/components/Pricing";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Transparent Pricing & Investment Packages",
  description:
    "Explore transparent fixed pricing packages for custom website development, SEO services, local SEO, e-commerce, and white label SEO reseller programs.",
  keywords:
    "website development cost India, SEO package pricing, web design pricing Delhi NCR, custom software development cost, SEO reseller pricing",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/pricing",
  },
  openGraph: {
    title: "Transparent Pricing & Investment Packages | Geetanjali Softwares",
    description: "Transparent fixed-price software development and SEO growth packages.",
    url: "https://geetanjalisoftwares.com/pricing",
    type: "website",
  },
};

const PRICING_FAQS = [
  {
    question: "Are your pricing packages fixed or are there hidden monthly charges?",
    answer:
      "All our packages feature 100% transparent fixed-price quotes. There are no hidden fees or unexpected maintenance charges. What we quote during scope alignment is what you pay.",
  },
  {
    question: "Do you offer custom enterprise pricing for complex software projects?",
    answer:
      "Yes! If your application requires bespoke database architecture, custom AI model integration, or multi-tenant SaaS pipelines, we build tailored proposals with clear milestone pricing.",
  },
  {
    question: "What is included in your monthly SEO retainer packages?",
    answer:
      "Our SEO retainers include comprehensive technical audits, keyword research, on-page optimization, content publishing, high-authority link acquisition, GMB local optimization, and monthly ROI performance reporting.",
  },
  {
    question: "What payment methods and currency options do you accept?",
    answer:
      "We accept bank wire transfers, UPI, credit/debit cards, and international payment portals (Stripe, Razorpay, Wise, PayPal) supporting INR ($/₹) and USD ($).",
  },
  {
    question: "What is your refund policy if project requirements change?",
    answer:
      "We operate a fair, milestone-based policy. If work has not yet commenced on a milestone, unearned retainer funds are refundable per our service agreement policy.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white pt-24 text-left">
      <section className="py-16 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Transparent Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Predictable pricing for <br />
            <span className="text-orange-600">high-impact digital engineering.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Choose a fixed-price package or request a custom milestone-based quote tailored to your exact software and search growth requirements.
          </p>
        </div>
      </section>

      <Pricing />

      <FaqSection
        title="Frequently Asked Pricing Questions"
        subtitle="Clear answers regarding billing, package inclusions, and payment options."
        faqs={PRICING_FAQS}
      />

      <ContactForm />
    </main>
  );
}
