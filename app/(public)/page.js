import ContactFormSection from "@/components/ContactFormSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import PopupForm from "@/components/PopupForm";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs";

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
