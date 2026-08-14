import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";

export const revalidate = 60;

const HOMEPAGE_FAQS = [
  {
    question: "What core services does Geetanjali Softwares specialize in?",
    answer:
      "Geetanjali Softwares specializes in high-converting custom website development, enterprise web applications, SEO services (Local SEO, E-Commerce SEO, Technical SEO), White Label SEO Reseller programs, AI chatbot integration, and custom CRM software development for businesses across India, Delhi NCR, Noida, USA, and global markets.",
  },
  {
    question: "How long does a typical web development or digital marketing campaign take?",
    answer:
      "Custom business website development typically takes 2 to 4 weeks depending on feature complexity. Comprehensive SEO and digital marketing campaigns begin delivering measurable organic growth, keyword rankings, and lead traffic within 30 to 90 days.",
  },
  {
    question: "Do you offer white-label SEO reseller programs for agencies?",
    answer:
      "Yes, we provide confidential White Label SEO and SEO Reseller services for digital agencies worldwide. We handle technical audits, link building, content creation, and monthly reporting under your brand agency umbrella.",
  },
  {
    question: "How do you guarantee fast website load speeds and Core Web Vitals?",
    answer:
      "We build applications using Next.js App Router, serverless architecture, optimized image pipelines, and clean CSS styling to ensure sub-second page rendering and perfect Lighthouse Core Web Vitals scores.",
  },
  {
    question: "What is the onboarding process to start a project with Geetanjali Softwares?",
    answer:
      "Simply reach out through our contact form or consultation link. We schedule a discovery call, analyze your technical requirements, provide a transparent fixed-price proposal, and assign a dedicated project manager to execute your roadmap.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Hero />
      <FadeIn direction="up">
        <Services />
      </FadeIn>
      <FadeIn direction="up">
        <SelectedWork />
      </FadeIn>
      <FadeIn direction="up">
        <Process />
      </FadeIn>
      <FadeIn direction="up">
        <Pricing />
      </FadeIn>
      <FadeIn direction="up">
        <Testimonials />
      </FadeIn>
      <FadeIn direction="up">
        <Blog />
      </FadeIn>
      <FadeIn direction="up">
        <FaqSection
          title="Frequently Asked Questions"
          subtitle="Common questions about our digital marketing, SEO, and custom software development services."
          faqs={HOMEPAGE_FAQS}
        />
      </FadeIn>
      <FadeIn direction="up">
        <ContactForm />
      </FadeIn>
    </main>
  );
}
