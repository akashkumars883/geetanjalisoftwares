import ContactFormSection from "@/components/ContactFormSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import PopupForm from "@/components/PopupForm";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export const metadata = {
  title: "Geetanjali Softwares | Expert Website Development & SEO Services",
  description: "Get high-performance websites and ROI-driven SEO from Geetanjali Softwares. We are a leading digital agency specializing in custom software and digital growth.",
  keywords: "website development, seo agency, custom software development, digital marketing",
};

export default function Home() {
  return (
    <>
      <PopupForm />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <PortfolioSection />
      <ContactFormSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
}
