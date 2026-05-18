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

export const metadata = {
  title: "Website Development & SEO Company in Faridabad | Geetanjali Softwares",
  description: "Geetanjali Softwares is the leading website development company and SEO agency in Faridabad & Delhi NCR. We provide custom web design, custom software development, and ROI-driven SEO solutions.",
  keywords: "website development company in faridabad, seo company in faridabad, web design company in delhi ncr, digital marketing agency faridabad, ai website builder india, seo optimized business websites",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.geetanjalisoftwares.in/#organization",
        "name": "Geetanjali Softwares",
        "url": "https://www.geetanjalisoftwares.in",
        "logo": "https://www.geetanjalisoftwares.in/images/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+917508657479",
          "contactType": "sales",
          "areaServed": "IN",
          "availableLanguage": ["en", "hi"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.geetanjalisoftwares.in/#website",
        "url": "https://www.geetanjalisoftwares.in",
        "name": "Geetanjali Softwares",
        "description": "Expert Web Design, Custom Software & SEO Solutions",
        "publisher": {
          "@id": "https://www.geetanjalisoftwares.in/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.geetanjalisoftwares.in/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.geetanjalisoftwares.in/#service",
        "name": "Geetanjali Softwares",
        "image": "https://www.geetanjalisoftwares.in/images/logo.png",
        "priceRange": "₹₹",
        "telephone": "+917508657479",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": "Haryana",
          "addressLocality": "Faridabad"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://www.geetanjalisoftwares.in/#sitelinks-list",
        "name": "Geetanjali Softwares Core Features",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Web Design & Development",
            "url": "https://www.geetanjalisoftwares.in/services"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "SEO & Digital Marketing",
            "url": "https://www.geetanjalisoftwares.in/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Instant SEO Speed Scanner",
            "url": "https://www.geetanjalisoftwares.in/#seo-scanner"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Our Work Portfolio",
            "url": "https://www.geetanjalisoftwares.in/portfolio"
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
