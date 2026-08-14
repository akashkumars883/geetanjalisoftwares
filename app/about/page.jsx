import Link from "next/link";
import { ArrowRight, Users, Star, Globe, Clock, ShieldCheck, Cpu, Code2, Zap, Rocket, CheckCircle2 } from "lucide-react";
import FaqSection from "@/components/FaqSection";

export const metadata = {
  title: "About Geetanjali Softwares – Custom Software Development Company India",
  description:
    "Learn about Geetanjali Softwares – a premier custom software engineering & digital transformation agency in India specializing in full-stack web apps, AI automation, CRM systems, headless e-commerce, and technical SEO for global enterprises and startups.",
  keywords:
    "about Geetanjali Softwares, custom software company India, web development agency, AI development company, SEO agency India, software engineering team",
  alternates: {
    canonical: "https://geetanjalisoftwares.com/about",
  },
  openGraph: {
    title: "About Geetanjali Softwares – Custom Software Development Company India",
    description:
      "We build scalable web apps, AI tools, custom CRM systems, and high-performance SEO strategies for businesses across India and globally.",
    url: "https://geetanjalisoftwares.com/about",
    type: "website",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Geetanjali Softwares",
  "url": "https://geetanjalisoftwares.com/about",
  "description":
    "Geetanjali Softwares is a custom software development and digital technology agency based in India, serving businesses globally with next-generation web apps, AI automation, and technical SEO.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Geetanjali Softwares",
    "foundingDate": "2020",
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": "10-50" },
    "knowsAbout": [
      "Custom Software Development",
      "Web Application Engineering",
      "AI Chatbot & Automation",
      "Search Engine Optimization",
      "Headless E-Commerce Solutions",
      "Enterprise CRM & SaaS Systems",
    ],
  },
};

const ABOUT_FAQS = [
  {
    question: "Where is Geetanjali Softwares located and do you serve international clients?",
    answer:
      "Geetanjali Softwares is headquartered in India with primary delivery hubs across Delhi NCR and Noida. We serve clients globally across North America, Europe, Australia, and Asia with 100% remote agility.",
  },
  {
    question: "What makes Geetanjali Softwares different from traditional web agencies?",
    answer:
      "Unlike traditional agencies that rely on slow, heavy frameworks and bloated overhead, we focus on performance-first engineering (Next.js, Node.js, AI APIs), zero unnecessary seat fees, built-in technical SEO, and complete code ownership.",
  },
  {
    question: "What size of companies do you typically collaborate with?",
    answer:
      "We partner with high-growth startups building MVPs, medium-sized enterprises scaling their online sales pipelines, and established corporations needing custom CRM or internal tool modernization.",
  },
  {
    question: "Who owns the intellectual property and code upon project completion?",
    answer:
      "You retain 100% full code ownership and intellectual property rights. Upon final delivery, all GitHub repositories, database credentials, and server configurations are transferred to your team.",
  },
  {
    question: "How do you handle communication and milestone tracking during development?",
    answer:
      "We provide weekly sprint updates, transparent progress dashboards, dedicated Slack/WhatsApp channels, and direct communication with senior lead engineers throughout your build cycle.",
  },
];

const stats = [
  { value: "100+", label: "Projects Delivered", icon: <Star className="h-5 w-5 text-orange-600" /> },
  { value: "50+", label: "Global Clients", icon: <Globe className="h-5 w-5 text-orange-600" /> },
  { value: "5+", label: "Years Experience", icon: <Clock className="h-5 w-5 text-orange-600" /> },
  { value: "15+", label: "Senior Engineers", icon: <Users className="h-5 w-5 text-orange-600" /> },
];

const coreValues = [
  {
    icon: <Code2 className="h-6 w-6 text-orange-600" />,
    title: "Clean Code & Quality",
    description: "We craft maintainable, modular, and extensively documented code solutions tailored to long-term enterprise growth.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-orange-600" />,
    title: "Full Code Ownership",
    description: "You retain 100% intellectual property rights, source code repository access, and deployment ownership upon project completion.",
  },
  {
    icon: <Cpu className="h-6 w-6 text-orange-600" />,
    title: "Modern Tech Stack",
    description: "Leveraging cutting-edge technologies like Next.js, React, Node.js, Python, AI APIs, and cloud-native serverless infrastructure.",
  },
  {
    icon: <Zap className="h-6 w-6 text-orange-600" />,
    title: "Performance & SEO First",
    description: "Engineered from day one for sub-second page load times, strict Core Web Vitals compliance, and top search engine rankings.",
  },
];

const technologies = [
  "Next.js", "React.js", "Node.js", "TypeScript", "Python", 
  "Tailwind CSS", "PostgreSQL", "MongoDB", "Redis", "Docker",
  "AWS Cloud", "OpenAI / Claude API", "GraphQL", "REST APIs"
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-16 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* Hero Section */}
      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            About Geetanjali Softwares
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-stone-900 leading-[1.1] max-w-5xl">
            Engineering digital solutions <br />
            <span className="text-orange-600">that scale, perform, and lead.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-3xl leading-relaxed">
            Geetanjali Softwares is a custom software development and digital growth agency helping businesses in India and globally build high-performance web platforms, AI tools, and scalable marketing systems.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-left space-y-3 p-6 bg-stone-50 rounded-md border border-stone-100">
                <div className="h-10 w-10 rounded-md bg-white border border-stone-100 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{stat.value}</div>
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
              Our Vision & Mission
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-stone-900 leading-tight">
              Democratizing enterprise-grade software development.
            </h2>
            <p className="text-sm md:text-base text-stone-600 font-light leading-relaxed">
              We believe every ambitious business deserves bespoke software architecture, smooth automated pipelines, and fast digital platforms — without the complexity and astronomical overhead of legacy agency models.
            </p>
            <p className="text-sm md:text-base text-stone-600 font-light leading-relaxed">
              From our development hub in India, our senior engineers collaborate closely with clients across North America, Europe, Asia, and Australia to deliver full-cycle software engineering — from strategy and UI/UX design to cloud deployment and search engine domination.
            </p>
          </div>

          {/* Feature Highlight Box */}
          <div className="p-8 rounded-md bg-white border border-stone-100 space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <Rocket className="h-5 w-5 text-orange-600" />
              Why Businesses Choose Us
            </h3>
            <ul className="space-y-4">
              {[
                "100% Transparent communication and agile sprints.",
                "Direct line of access to senior technical architects.",
                "Zero bloated dependencies — high performance code guarantee.",
                "Built-in SEO structure, schema markup & Core Web Vitals optimization.",
                "Comprehensive post-launch technical support & maintenance.",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-10 bg-white border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-stone-900">
              Our Core Principles
            </h2>
            <p className="text-sm text-stone-600 font-light">
              The foundational values that guide how we build products and manage client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, i) => (
              <div key={i} className="p-6 rounded-md bg-stone-50 border border-stone-100 space-y-4">
                <div className="h-10 w-10 rounded-md bg-white border border-stone-100 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-stone-900">{value.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="py-10 bg-stone-50 border-b border-stone-100 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-stone-900">Technologies We Master</h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light">Battle-tested tools and frameworks we use to build robust software.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, i) => (
              <span 
                key={i} 
                className="px-4 py-2 rounded-md text-xs font-semibold bg-white border border-stone-200 text-stone-700 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection
        title="Frequently Asked Questions About Us"
        subtitle="Learn more about our agency background, engagement models, and engineering standards."
        faqs={ABOUT_FAQS}
      />

      {/* CTA */}
      <section className="py-10 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-md p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-md blur-3xl pointer-events-none" />
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Have a project in mind?</h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Whether you need a custom web platform, AI tool, or enterprise automation, our engineers are ready to build it.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shrink-0 shadow-lg"
            >
              Get Free Technical Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
