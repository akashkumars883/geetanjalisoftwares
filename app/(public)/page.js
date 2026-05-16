import ContactFormSection from "@/components/ContactFormSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import WebsiteBuilderCTA from "@/components/WebsiteBuilderCTA";
import PortfolioSection from "@/components/PortfolioSection";
import PopupForm from "@/components/PopupForm";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import SEOSimulator from "@/components/SEOSimulator";

export const metadata = {
  title: "Geetanjali Softwares | Expert Website Development & SEO Services",
  description: "Get high-performance websites and ROI-driven SEO from Geetanjali Softwares. We are a leading digital agency specializing in custom software and digital growth.",
  keywords: "website development, seo agency, custom software development, digital marketing",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.geetanjalisoftwares.com/#organization",
        "name": "Geetanjali Softwares",
        "url": "https://www.geetanjalisoftwares.com",
        "logo": "https://www.geetanjalisoftwares.com/images/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-XXXXXXXXXX",
          "contactType": "sales",
          "areaServed": "IN",
          "availableLanguage": ["en", "hi"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.geetanjalisoftwares.com/#website",
        "url": "https://www.geetanjalisoftwares.com",
        "name": "Geetanjali Softwares",
        "description": "Expert Web Design, Custom Software & SEO Solutions",
        "publisher": {
          "@id": "https://www.geetanjalisoftwares.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.geetanjalisoftwares.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.geetanjalisoftwares.com/#service",
        "name": "Geetanjali Softwares",
        "image": "https://www.geetanjalisoftwares.com/images/logo.png",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": "Bihar",
          "addressLocality": "Patna"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://www.geetanjalisoftwares.com/#sitelinks-list",
        "name": "Geetanjali Softwares Core Features",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Web Design & Development",
            "url": "https://www.geetanjalisoftwares.com/services"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "SEO & Digital Marketing",
            "url": "https://www.geetanjalisoftwares.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Instant SEO Speed Scanner",
            "url": "https://www.geetanjalisoftwares.com/#seo-scanner"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Our Work Portfolio",
            "url": "https://www.geetanjalisoftwares.com/portfolio"
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Search Engine Optimization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PopupForm />
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
