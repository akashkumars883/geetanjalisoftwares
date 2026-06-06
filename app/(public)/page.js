import ContactFormSection from "@/components/ContactFormSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import WebsiteBuilderCTA from "@/components/WebsiteBuilderCTA";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import SEOSimulator from "@/components/SEOSimulator";
import { SITE_URL, localBusinessSchema, organizationSchema } from "@/lib/seo";

export const metadata = {
  title: "Website Development & SEO Company in Faridabad | Geetanjali Softwares",
  description:
    "Geetanjali Softwares is the leading website development company and SEO agency in Faridabad & Delhi NCR. We provide custom web design, custom software development, and ROI-driven SEO solutions.",
  keywords:
    "website development company in faridabad, seo company in faridabad, web design company in delhi ncr, digital marketing agency faridabad, ai website builder india, seo optimized business websites",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Website Development & SEO Company in Faridabad | Geetanjali Softwares",
    description:
      "Custom website development, SEO, digital marketing, and branding services for businesses in Faridabad, Delhi NCR, and India.",
    url: SITE_URL,
    siteName: "Geetanjali Softwares",
    images: [{ url: `${SITE_URL}/icon.png`, width: 512, height: 512 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development & SEO Company in Faridabad | Geetanjali Softwares",
    description:
      "Fast websites, SEO, digital marketing, and lead generation services by Geetanjali Softwares.",
    images: [`${SITE_URL}/icon.png`],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Geetanjali Softwares",
        description: "Expert Web Design, Custom Software & SEO Solutions",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      localBusinessSchema(),
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#sitelinks-list`,
        name: "Geetanjali Softwares Core Features",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Web Design & Development",
            url: `${SITE_URL}/services/website-design-development`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "SEO & Digital Marketing",
            url: `${SITE_URL}/services/digital-marketing/seo`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Instant SEO Speed Scanner",
            url: `${SITE_URL}/#seo-scanner`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Pricing",
            url: `${SITE_URL}/pricing`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Our Work Portfolio",
            url: `${SITE_URL}/portfolio`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <MarqueeSection />
      <WhoWeAreSection />
      <ServicesSection />
      <WebsiteBuilderCTA />
      <WhyChooseUs />
      <PortfolioSection />
      <SEOSimulator />
      <ContactFormSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
}
