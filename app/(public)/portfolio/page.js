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
    <div className="bg-background min-h-screen">
      <section className="pb-16 pt-2 sm:pt-4 border-b border-foreground/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-primary"></span>
            <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60">
              Our Work
            </span>
          </div>
          <h1 className="mt-6 max-w-4xl font-heading text-5xl sm:text-7xl lg:text-[7rem] font-bold uppercase tracking-tighter text-foreground leading-[0.85]">
            CRAFTSMANSHIP <br />
            <span className="text-primary">& STRATEGY</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl font-medium">
            Every project we deliver is built with purpose. From brand identity systems to full-stack web applications — explore our work and see how we turn complex requirements into clean, functional outcomes.
          </p>
        </div>
      </section>
      <PortfolioSection />
      <FinalCtaSection />
    </div>
  );
}
