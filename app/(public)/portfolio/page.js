import PortfolioSection from "@/components/PortfolioSection";
import FinalCtaSection from "@/components/FinalCtaSection";

export const metadata = {
  title: "Portfolio | Geetanjali Softwares",
  description:
    "Explore recent website development, branding, and digital marketing work delivered by Geetanjali Softwares.",
  alternates: {
    canonical: "https://www.geetanjalisoftwares.in/portfolio",
  },
  openGraph: {
    title: "Portfolio | Geetanjali Softwares",
    description:
      "Explore recent website development, branding, and digital marketing work delivered by Geetanjali Softwares.",
    url: "https://www.geetanjalisoftwares.in/portfolio",
    siteName: "Geetanjali Softwares",
    images: [{ url: "https://www.geetanjalisoftwares.in/icon.png", width: 512, height: 512 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Geetanjali Softwares",
    description:
      "Explore recent website development, branding, and digital marketing work delivered by Geetanjali Softwares.",
    images: ["https://www.geetanjalisoftwares.in/icon.png"],
  },
};

export default function PortfolioPage() {
  return (
    <div>
      <section className="pb-0 pt-12 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 sm:text-sm">
            Our Work
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl lg:text-7xl leading-[1.15]">
            Projects that reflect <span className="text-slate-500">craftsmanship and strategy.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Every project we deliver is built with purpose. From brand identity systems to full-stack web applications — explore our work and see how we turn complex requirements into clean, functional outcomes.
          </p>
        </div>
      </section>
      <PortfolioSection />
      <FinalCtaSection />
    </div>
  );
}
