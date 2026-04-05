import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug.split("/"),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const fullSlug = Array.isArray(slug) ? slug.join("/") : slug;
  const service = getServiceBySlug(fullSlug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Geetanjali Softwares`,
    description: service.description,
  };
}

function SpecializedSolutions({ parentSlug }) {
  const subServices = services.filter((s) => s.slug.startsWith(`${parentSlug}/`));

  if (subServices.length === 0) return null;

  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
            More Services
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Our Specialized Solutions
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {subServices.map((sub) => (
            <Link
              key={sub.slug}
              href={`/services/${sub.slug}`}
              className="group relative flex flex-col justify-between rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_70px_-36px_rgba(0,0,0,0.35)] sm:p-6"
            >
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-black transition group-hover:text-orange-600">
                  {sub.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-black/70 line-clamp-3">
                  {sub.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-600">
                Explore Now
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M5 10H15M15 10L11 6M15 10L11 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function GenericServicePage({ service }) {
  const { detail } = service;

  return (
    <>
      <section className="pb-16 pt-4 sm:pb-20 sm:pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className={`flex flex-col items-start text-left lg:items-start lg:text-left ${!service.detail.hero.image ? "lg:col-span-2" : ""}`}>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
                {detail.hero.eyebrow}
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl">
                {detail.hero.title}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-black/70 sm:text-base">
                {detail.hero.description}
              </p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link
                  href={detail.hero.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:px-8 sm:text-base"
                >
                  {detail.hero.primaryCta.label}
                </Link>
                <Link
                  href={detail.hero.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-black/5 sm:px-8 sm:text-base"
                >
                  {detail.hero.secondaryCta.label}
                </Link>
              </div>
            </div>

            {service.detail.hero.image && (
              <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
                <div className="relative w-full max-w-sm lg:max-w-md">
                  <div className="absolute inset-0 bg-orange-500/5 blur-[100px]" />
                  <img
                    src={service.detail.hero.image}
                    alt={service.title}
                    className="relative h-auto w-full object-contain remove-background transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              {detail.overview.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {detail.overview.items.map((item) => (
              <article
                key={item}
                className="rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
              >
                <p className="text-sm leading-7 text-black/75">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              {detail.process.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {detail.process.steps.map((step, index) => (
              <article
                key={step}
                className="rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
              >
                <span className="inline-flex rounded-full border border-black/10 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-black/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-sm leading-7 text-black/75">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              {detail.faq.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {detail.faq.items.map((item) => (
              <article
                key={item.question}
                className="rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-black">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/70">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SpecializedSolutions parentSlug={service.slug} />

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-[#111111] p-6 text-white shadow-[0_30px_80px_-42px_rgba(0,0,0,0.5)] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                  Final CTA
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  {detail.cta.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
                  {detail.cta.description}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href={detail.cta.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-orange-100 sm:px-8 sm:text-base"
                >
                  {detail.cta.primaryCta.label}
                </Link>
                <Link
                  href={detail.cta.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/12 sm:px-8 sm:text-base"
                >
                  {detail.cta.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function WebsiteDesignDevelopmentPage({ service }) {
  const { detail } = service;

  return (
    <>
      <section className="pb-16 pt-4 sm:pb-20 sm:pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className={`flex flex-col items-start text-left lg:items-start lg:text-left ${!service.detail.hero.image ? "lg:col-span-2" : ""}`}>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
                {detail.hero.eyebrow}
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl">
                {detail.hero.title}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-black/70 sm:text-base">
                {detail.hero.description}
              </p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link
                  href={detail.hero.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:px-8 sm:text-base"
                >
                  {detail.hero.primaryCta.label}
                </Link>
                <Link
                  href={detail.hero.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-black/5 sm:px-8 sm:text-base"
                >
                  {detail.hero.secondaryCta.label}
                </Link>
              </div>
            </div>

            {service.detail.hero.image && (
              <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
                <div className="relative w-full max-w-sm lg:max-w-md">
                  <div className="absolute inset-0 bg-orange-500/5 blur-[100px]" />
                  <img
                    src={service.detail.hero.image}
                    alt={service.title}
                    className="relative h-auto w-full object-contain remove-background transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
              Problem
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              {detail.problemSolution.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-black/70 sm:text-base">
              {detail.problemSolution.problem}
            </p>
          </article>

          <article className="rounded-[28px] border border-black/10 bg-[#111111] p-5 text-white shadow-[0_24px_60px_-42px_rgba(0,0,0,0.45)] sm:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
              Solution
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              A website built to solve those problems clearly.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
              {detail.problemSolution.solution}
            </p>
          </article>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              {detail.whatYouGet.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {detail.whatYouGet.items.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-black">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              {detail.websiteTypes.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {detail.websiteTypes.items.map((item) => (
              <article
                key={item}
                className="rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
              >
                <p className="text-sm font-medium leading-7 text-black/75">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              {detail.process.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {detail.process.steps.map((step) => (
              <article
                key={step.number}
                className="rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
              >
                <span className="inline-flex rounded-full border border-black/10 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-black/55">
                  {step.number}
                </span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-black">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/70">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SpecializedSolutions parentSlug={service.slug} />

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              {detail.portfolio.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {detail.portfolio.items.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-black">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              {detail.whyChooseUs.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {detail.whyChooseUs.items.map((item) => (
              <article
                key={item}
                className="rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
              >
                <p className="text-sm font-medium leading-7 text-black/75">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              {detail.faq.title}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {detail.faq.items.map((item) => (
              <article
                key={item.question}
                className="rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-black">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/70">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-[#111111] p-6 text-white shadow-[0_30px_80px_-42px_rgba(0,0,0,0.5)] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                  Final CTA
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  {detail.cta.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
                  {detail.cta.description}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href={detail.cta.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-orange-100 sm:px-8 sm:text-base"
                >
                  {detail.cta.primaryCta.label}
                </Link>
                <Link
                  href={detail.cta.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/12 sm:px-8 sm:text-base"
                >
                  {detail.cta.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const fullSlug = Array.isArray(slug) ? slug.join("/") : slug;
  const service = getServiceBySlug(fullSlug);

  if (!service) {
    notFound();
  }

  if (service.slug === "website-design-development") {
    return <WebsiteDesignDevelopmentPage service={service} />;
  }

  return <GenericServicePage service={service} />;
}
