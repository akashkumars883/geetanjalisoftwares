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
    <div className="pt-4">
      <PortfolioSection />
      <FinalCtaSection />
    </div>
  );
}
