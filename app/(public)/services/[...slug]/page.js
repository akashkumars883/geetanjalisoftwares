import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/services";
import { createClient } from '@supabase/supabase-js';
import { SITE_URL, BUSINESS_PHONE, founder } from "@/lib/seo";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug.split("/"),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const fullSlug = Array.isArray(slug) ? slug.join("/") : slug;
  const service = getServiceBySlug(fullSlug);

  if (!service) return {};

  const { data: settings } = await supabaseAdmin
    .from('settings')
    .select('local_focus')
    .eq('id', 1)
    .single();

  const city = settings?.local_focus;
  const isGlobal = !city || city.trim().toLowerCase() === "global" || city.trim().toLowerCase() === "worldwide" || city.trim().toLowerCase() === "bihar" || city.trim().toLowerCase() === "patna";
  const titleSuffix = isGlobal ? "" : ` in ${city}`;
  const url = `${SITE_URL}/services/${fullSlug}`;
  const title = `${service.title} Services${titleSuffix} | Geetanjali Softwares`;
  const description = `${service.description}. Premium ${service.title} solutions with Geetanjali Softwares.`.slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Geetanjali Softwares",
      images: [{ url: "https://www.geetanjalisoftwares.in/icon.png", width: 512, height: 512 }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.geetanjalisoftwares.in/icon.png"],
    },
  };
}

// ── Shared card styling tokens ──
const cardClass = "flex flex-col border border-foreground/10 bg-foreground/5 p-8 transition-colors hover:border-primary";
const sectionClass = "pb-16 sm:pb-24 bg-background";
const headingClass = "font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tighter text-foreground leading-tight";
const eyebrowClass = "font-heading text-[10px] font-bold uppercase tracking-widest text-primary";

function SpecializedSolutions({ parentSlug }) {
  const subServices = services.filter((s) => s.slug.startsWith(`${parentSlug}/`));
  if (subServices.length === 0) return null;

  return (
    <section className={sectionClass}>
      <div className="mx-auto max-w-7xl px-6 border-t border-foreground/10 pt-16">
        <div className="max-w-5xl mb-12">
          <p className={eyebrowClass}>More Services</p>
          <h2 className={`mt-3 ${headingClass}`}>SPECIALIZED <br /> <span className="text-primary">SOLUTIONS</span></h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {subServices.map((sub) => (
            <Link
              key={sub.slug}
              href={`/services/${sub.slug}`}
              className="group relative flex flex-col justify-between border border-foreground/10 bg-foreground/5 p-6 transition-colors duration-300 hover:border-primary"
            >
              <div>
                <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {sub.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70 font-medium line-clamp-3 border-b border-foreground/10 pb-6">
                  {sub.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-heading font-bold uppercase tracking-widest text-primary">
                Explore Now
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Hero + CTAs (shared between page types) ──
function ServiceHero({ service }) {
  const { detail } = service;
  return (
    <section className="pb-16 pt-0 sm:pb-24 sm:pt-4 bg-background border-b border-foreground/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`grid gap-12 lg:grid-cols-2 lg:items-center`}>
          <div className={`flex flex-col items-start text-left ${!detail.hero.image ? "lg:col-span-2" : ""}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className={eyebrowClass}>{detail.hero.eyebrow}</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground leading-tight">
              {detail.hero.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl font-medium">
              {detail.hero.description}
            </p>
            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center w-full sm:w-auto">
              <Link href={detail.hero.primaryCta.href} className="group relative inline-flex w-full items-center justify-center gap-4 overflow-hidden border border-foreground/20 bg-primary px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white transition-transform duration-300 hover:scale-105 active:scale-95 sm:w-auto">
                <span className="relative z-10 transition-colors duration-300">
                  {detail.hero.primaryCta.label}
                </span>
                <span className="relative z-10 flex items-center justify-center transition-colors duration-300">
                  <ArrowRight size={18} />
                </span>
              </Link>
              <Link href={detail.hero.secondaryCta.href} className="group relative inline-flex w-full items-center justify-center gap-4 overflow-hidden border border-foreground/20 bg-transparent px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background sm:w-auto">
                <span>{detail.hero.secondaryCta.label}</span>
              </Link>
            </div>
          </div>

          {detail.hero.image && (
            <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
              <div className="relative w-full max-w-sm lg:max-w-md">
                <img
                  src={detail.hero.image}
                  alt={service.title}
                  className="relative h-auto w-full object-contain mix-blend-screen transition duration-700 hover:scale-105"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA banner ──
function ServiceCta({ detail }) {
  return (
    <section className="pb-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="bg-primary p-8 sm:p-12 lg:p-16 border border-foreground/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background via-transparent to-transparent"></div>
          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-background/80 mb-4">Get Started</p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tighter text-foreground leading-tight">
                {detail.cta.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-background/90 font-medium sm:text-xl">
                {detail.cta.description}
              </p>
            </div>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Link href={detail.cta.primaryCta.href} className="group relative inline-flex items-center justify-center gap-4 overflow-hidden bg-background px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-foreground transition-transform duration-300 hover:scale-105 active:scale-95">
                <span className="relative z-10">{detail.cta.primaryCta.label}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GenericServicePage({ service, latestBlogs }) {
  const { detail } = service;

  return (
    <div className="bg-background">
      <ServiceHero service={service} />

      <section className={`${sectionClass} pt-16`}>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className={headingClass}>{detail.overview.title}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {detail.overview.items.map((item, index) => (
              <article key={item} className={cardClass}>
                <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                  0{index + 1}. Insight
                </p>
                <p className="text-base font-medium leading-relaxed text-foreground/80">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className={headingClass}>{detail.process.title}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {detail.process.steps.map((step, index) => (
              <article key={step} className={cardClass}>
                <span className="font-heading text-3xl font-bold uppercase tracking-tighter text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-6 text-base font-medium leading-relaxed text-foreground/80 border-t border-foreground/10 pt-6">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center max-w-5xl mx-auto mb-16">
            <p className={eyebrowClass}>Got Questions?</p>
            <h2 className={`mt-3 ${headingClass}`}>{detail.faq.title}</h2>
          </div>
          <div className="space-y-6">
            {detail.faq.items.map((item) => (
              <details 
                key={item.question} 
                className="group border-b border-foreground/10 pb-6 last:border-0 last:pb-0 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-xl font-bold uppercase tracking-tight text-foreground hover:text-primary transition-colors list-none outline-none select-none">
                  <h3 className="text-left">
                    {item.question}
                  </h3>
                  <span className="text-primary group-open:rotate-45 transition-transform duration-300 shrink-0">+</span>
                </summary>
                <p className="mt-6 text-lg leading-relaxed text-foreground/70 font-medium pl-4 border-l-2 border-primary/30 text-left">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SpecializedSolutions parentSlug={service.slug} />
      <RelatedInsights blogs={latestBlogs} />
      <ServiceCta detail={detail} />
    </div>
  );
}

function WebsiteDesignDevelopmentPage({ service, latestBlogs }) {
  const { detail } = service;

  return (
    <div className="bg-background">
      <ServiceHero service={service} />

      <section className={`${sectionClass} pt-16`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2 lg:px-12">
          <article className={cardClass}>
            <p className={eyebrowClass}>Problem</p>
            <h2 className={`mt-3 ${headingClass}`}>{detail.problemSolution.title}</h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-foreground/70 border-t border-foreground/10 pt-6">{detail.problemSolution.problem}</p>
          </article>

          <article className="flex flex-col border border-foreground/10 bg-primary p-8 transition-colors">
            <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-background/80 mb-4">Solution</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tighter text-foreground leading-tight">
              A WEBSITE BUILT TO <br /> SOLVE THOSE PROBLEMS.
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-background/90 border-t border-background/20 pt-6">{detail.problemSolution.solution}</p>
          </article>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className={headingClass}>{detail.whatYouGet.title}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {detail.whatYouGet.items.map((item, index) => (
              <article key={item.title} className={cardClass}>
                <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                  0{index + 1}. Deliverable
                </p>
                <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-6 text-base font-medium leading-relaxed text-foreground/70 border-t border-foreground/10 pt-6">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className={headingClass}>{detail.websiteTypes.title}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {detail.websiteTypes.items.map((item) => (
              <article key={item} className="border border-foreground/10 bg-foreground/5 p-6 hover:border-primary transition-colors flex items-center gap-4">
                 <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                 <p className="text-base font-medium leading-relaxed text-foreground">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className={headingClass}>{detail.process.title}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {detail.process.steps.map((step) => (
              <article key={step.number} className={cardClass}>
                <span className="font-heading text-3xl font-bold uppercase tracking-tighter text-primary">
                  {step.number}
                </span>
                <h3 className="mt-6 font-heading text-2xl font-bold uppercase tracking-tight text-foreground border-t border-foreground/10 pt-6">{step.title}</h3>
                <p className="mt-4 text-sm font-medium leading-relaxed text-foreground/70">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SpecializedSolutions parentSlug={service.slug} />

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className={headingClass}>{detail.portfolio.title}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {detail.portfolio.items.map((item, index) => (
              <article key={item.title} className={cardClass}>
                <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                  0{index + 1}. Case Study
                </p>
                <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-6 text-sm font-medium leading-relaxed text-foreground/70 border-t border-foreground/10 pt-6">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center max-w-5xl mx-auto mb-16">
            <p className={eyebrowClass}>Got Questions?</p>
            <h2 className={`mt-3 ${headingClass}`}>{detail.faq.title}</h2>
          </div>
          <div className="space-y-6">
            {detail.faq.items.map((item) => (
              <details 
                key={item.question} 
                className="group border-b border-foreground/10 pb-6 last:border-0 last:pb-0 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-xl font-bold uppercase tracking-tight text-foreground hover:text-primary transition-colors list-none outline-none select-none">
                  <h3 className="text-left">
                    {item.question}
                  </h3>
                  <span className="text-primary group-open:rotate-45 transition-transform duration-300 shrink-0">+</span>
                </summary>
                <p className="mt-6 text-lg leading-relaxed text-foreground/70 font-medium pl-4 border-l-2 border-primary/30 text-left">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedInsights blogs={latestBlogs} />
      <ServiceCta detail={detail} />
    </div>
  );
}

function RelatedInsights({ blogs }) {
  if (!blogs || blogs.length === 0) return null;
  return (
    <section className="pb-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-5xl mb-12">
          <p className={eyebrowClass}>Insights</p>
          <h2 className={`mt-3 ${headingClass}`}>RELATED <br /> <span className="text-primary">ARTICLES</span></h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group flex flex-col border border-foreground/10 bg-foreground/5 p-6 transition-colors hover:border-primary duration-300">
              <div className="relative aspect-[16/10] overflow-hidden bg-foreground/10 mb-6">
                <img src={blog.image_url} alt={blog.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary block text-left mb-4">{blog.category || 'Insights'}</span>
              <h3 className="text-xl font-heading font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition duration-300 line-clamp-2 text-left">{blog.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const fullSlug = Array.isArray(slug) ? slug.join("/") : slug;
  const service = getServiceBySlug(fullSlug);

  if (!service) notFound();

  let faqJsonLd = null;
  if (service.detail?.faq?.items) {
    faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": service.detail.faq.items.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  }
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${fullSlug}#service`,
    "name": service.title,
    "description": service.description,
    "url": `${SITE_URL}/services/${fullSlug}`,
    "provider": {
      "@type": "ProfessionalService",
      "name": "Geetanjali Softwares",
      "url": SITE_URL,
      "telephone": BUSINESS_PHONE,
      "founder": {
        "@type": "Person",
        "name": founder.name,
        "url": founder.url
      }
    },
    "areaServed": ["Faridabad", "Delhi NCR", "India"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Geetanjali Softwares service packages",
      "url": `${SITE_URL}/pricing`
    }
  };

  const { data: latestBlogs } = await supabaseAdmin
    .from('blogs')
    .select('id, title, slug, image_url, created_at, category')
    .order('created_at', { ascending: false })
    .limit(3);

  const pageContent = service.slug === "website-design-development" 
    ? <WebsiteDesignDevelopmentPage service={service} latestBlogs={latestBlogs || []} />
    : <GenericServicePage service={service} latestBlogs={latestBlogs || []} />;

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {pageContent}
    </>
  );
}
