import AutomixaSection from "@/components/AutomixaSection";
import ContactFormSection from "@/components/ContactFormSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import PopupForm from "@/components/PopupForm";
import PricingSection from "@/components/PricingSection";
import Services from "@/components/Services";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <PopupForm />
      <HeroSection />
      <Services />
      <WhyChooseUs />
      <PortfolioSection />
      <ContactFormSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
}


