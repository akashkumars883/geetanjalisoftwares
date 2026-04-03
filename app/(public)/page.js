import ContactFormSection from "@/components/ContactFormSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
import Services from "@/components/Services";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustStrip from "@/components/TrustStrip";
import WhyChooseUs from "@/components/WhyChooseUs";
import AreasWeServe from "@/components/AreasWeServe";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <Services />
      <WhyChooseUs />
      <PortfolioSection />
      <ContactFormSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
}
