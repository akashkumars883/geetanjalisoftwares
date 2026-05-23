import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/services";
import { createClient } from '@supabase/supabase-js';

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
  const url = `https://www.geetanjalisoftwares.in/services/${fullSlug}`;
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
const cardClass = "rounded-[28px] border border-black/5 bg-slate-50 p-5 sm:p-6";
const sectionClass = "pb-12 sm:pb-16";
const headingClass = "text-3xl font-normal tracking-tight text-slate-900 sm:text-4xl";
const eyebrowClass = "text-xs font-semibold uppercase tracking-wider text-orange-600 sm:text-sm";

function SpecializedSolutions({ parentSlug }) {
  const subServices = services.filter((s) => s.slug.startsWith(`${parentSlug}/`));
  if (subServices.length === 0) return null;

  return (
    <section className={sectionClass}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className={eyebrowClass}>More Services</p>
          <h2 className={`mt-3 ${headingClass}`}>Our Specialized Solutions</h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {subServices.map((sub) => (
            <Link
              key={sub.slug}
              href={`/services/${sub.slug}`}
              className="group relative flex flex-col justify-between rounded-[28px] border border-black/5 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 sm:p-6"
            >
              <div>
                <h3 className="text-2xl font-normal tracking-tight text-slate-900 transition group-hover:text-orange-600">
                  {sub.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {sub.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-600">
                Explore Now
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                  <path d="M5 10H15M15 10L11 6M15 10L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
    <section className="pb-12 pt-4 sm:pb-16 sm:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-12 lg:grid-cols-2 lg:items-center`}>
          <div className={`flex flex-col items-start text-left ${!detail.hero.image ? "lg:col-span-2" : ""}`}>
            <p className={eyebrowClass}>{detail.hero.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
              {detail.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {detail.hero.description}
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link href={detail.hero.primaryCta.href} className="inline-flex items-center justify-center rounded-2xl bg-orange-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-700 active:scale-95">
                {detail.hero.primaryCta.label}
              </Link>
              <Link href={detail.hero.secondaryCta.href} className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-slate-50 px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-white active:scale-95">
                {detail.hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          {detail.hero.image && (
            <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
              <div className="relative w-full max-w-sm lg:max-w-md">
                <img
                  src={detail.hero.image}
                  alt={service.title}
                  className="relative h-auto w-full object-contain remove-background transition duration-700 hover:scale-105"
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
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] bg-slate-900 p-6 text-white sm:p-8 lg:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Get Started</p>
              <h2 className="mt-3 text-3xl font-normal tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
                {detail.cta.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                {detail.cta.description}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link href={detail.cta.primaryCta.href} className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-orange-50 active:scale-95">
                {detail.cta.primaryCta.label}
              </Link>
              <Link href={detail.cta.secondaryCta.href} className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95">
                {detail.cta.secondaryCta.label}
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
    <>
      <ServiceHero service={service} />

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={headingClass}>{detail.overview.title}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {detail.overview.items.map((item) => (
              <article key={item} className={cardClass}>
                <p className="text-sm leading-relaxed text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={headingClass}>{detail.process.title}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {detail.process.steps.map((step, index) => (
              <article key={step} className={cardClass}>
                <span className="inline-flex rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-semibold tracking-wider text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-sm leading-relaxed text-slate-700">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className={eyebrowClass}>Got Questions?</p>
            <h2 className={`mt-3 ${headingClass}`}>{detail.faq.title}</h2>
          </div>
          <div className="rounded-[32px] border border-black/5 bg-slate-50 p-6 sm:p-10 space-y-6">
            {detail.faq.items.map((item) => (
              <details 
                key={item.question} 
                className="group border-b border-black/5 pb-6 last:border-0 last:pb-0 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-slate-950 list-none outline-none select-none">
                  <h3 className="text-lg font-medium text-slate-900 group-open:text-orange-600 transition duration-300 text-left">
                    {item.question}
                  </h3>
                  <span className="relative h-6 w-6 shrink-0 bg-white rounded-full border border-black/5 flex items-center justify-center text-slate-500 group-open:bg-orange-600 group-open:text-white transition duration-300">
                    <svg
                      className="h-3 w-3 transition duration-300 group-open:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 text-left pl-1">
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
    </>
  );
}

function WebsiteDesignDevelopmentPage({ service, latestBlogs }) {
  const { detail } = service;

  return (
    <>
      <ServiceHero service={service} />

      <section className={sectionClass}>
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className={cardClass}>
            <p className={eyebrowClass}>Problem</p>
            <h2 className={`mt-3 ${headingClass}`}>{detail.problemSolution.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{detail.problemSolution.problem}</p>
          </article>

          <article className="rounded-[28px] bg-slate-900 p-5 text-white sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Solution</p>
            <h2 className="mt-3 text-3xl font-normal tracking-tight sm:text-4xl leading-[1.15]">
              A website built to solve those problems clearly.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">{detail.problemSolution.solution}</p>
          </article>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={headingClass}>{detail.whatYouGet.title}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {detail.whatYouGet.items.map((item) => (
              <article key={item.title} className={cardClass}>
                <h3 className="text-xl font-normal tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={headingClass}>{detail.websiteTypes.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {detail.websiteTypes.items.map((item) => (
              <article key={item} className={cardClass}>
                <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={headingClass}>{detail.process.title}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {detail.process.steps.map((step) => (
              <article key={step.number} className={cardClass}>
                <span className="inline-flex rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-semibold tracking-wider text-slate-500">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-normal tracking-tight text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SpecializedSolutions parentSlug={service.slug} />

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={headingClass}>{detail.portfolio.title}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {detail.portfolio.items.map((item) => (
              <article key={item.title} className={cardClass}>
                <h3 className="text-xl font-normal tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={headingClass}>{detail.whyChooseUs.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {detail.whyChooseUs.items.map((item) => (
              <article key={item} className={cardClass}>
                <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className={eyebrowClass}>Got Questions?</p>
            <h2 className={`mt-3 ${headingClass}`}>{detail.faq.title}</h2>
          </div>
          <div className="rounded-[32px] border border-black/5 bg-slate-50 p-6 sm:p-10 space-y-6">
            {detail.faq.items.map((item) => (
              <details 
                key={item.question} 
                className="group border-b border-black/5 pb-6 last:border-0 last:pb-0 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-slate-950 list-none outline-none select-none">
                  <h3 className="text-lg font-medium text-slate-900 group-open:text-orange-600 transition duration-300 text-left">
                    {item.question}
                  </h3>
                  <span className="relative h-6 w-6 shrink-0 bg-white rounded-full border border-black/5 flex items-center justify-center text-slate-500 group-open:bg-orange-600 group-open:text-white transition duration-300">
                    <svg
                      className="h-3 w-3 transition duration-300 group-open:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 text-left pl-1">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedInsights blogs={latestBlogs} />
      <ServiceCta detail={detail} />
    </>
  );
}

function RelatedInsights({ blogs }) {
  if (!blogs || blogs.length === 0) return null;
  return (
    <section className="pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 sm:text-sm">Insights</p>
          <h2 className="mt-3 text-3xl font-normal tracking-tight text-slate-900 sm:text-4xl text-left">Related Articles & Insights</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group flex flex-col rounded-3xl border border-black/5 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md hover:shadow-orange-500/5 duration-300">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white mb-4 shadow-sm">
                <img src={blog.image_url} alt={blog.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-600 block text-left">{blog.category || 'Insights'}</span>
              <h3 className="mt-2 text-base font-semibold leading-snug text-slate-900 group-hover:text-orange-600 transition duration-300 line-clamp-2 text-left">{blog.title}</h3>
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

  // Dynamic FAQ Page Schema Injection
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

  // Fetch latest blogs for interlinking
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
      {pageContent}
    </>
  );
}
