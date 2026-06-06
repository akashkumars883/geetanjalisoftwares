import Link from "next/link";
import { founder, SITE_URL, SOCIAL_LINKS } from "@/lib/seo";

export const metadata = {
  title: "Akash - Founder & Digital Strategist | Geetanjali Softwares",
  description:
    "Author profile for Akash, founder of Geetanjali Softwares, covering web development, SEO, branding, and digital growth for Faridabad and Delhi NCR businesses.",
  alternates: { canonical: `${SITE_URL}/authors/akash` },
};

export default function AkashAuthorPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.role,
    url: founder.url,
    worksFor: {
      "@type": "Organization",
      name: "Geetanjali Softwares",
      url: SITE_URL,
    },
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.instagram],
    knowsAbout: [
      "Website Development",
      "Search Engine Optimization",
      "Digital Marketing",
      "Brand Strategy",
      "Local SEO",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="pb-24 pt-12 sm:pt-20">
        <section className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
          <aside className="rounded-2xl border border-black/5 bg-slate-50 p-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-orange-500/10 text-3xl font-semibold text-orange-600">
              A
            </div>
            <h1 className="mt-6 text-3xl font-normal tracking-tight text-slate-900">Akash</h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-orange-600">
              Founder & Digital Strategist
            </p>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-4"
            >
              LinkedIn Profile
            </a>
          </aside>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 sm:text-sm">
              Author Profile
            </p>
            <h2 className="mt-4 text-4xl font-normal tracking-tight text-slate-900 sm:text-6xl">
              Practical web, SEO, and digital growth guidance for Indian businesses.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600">
              <p>
                Akash leads Geetanjali Softwares as a hands-on digital strategist focused on fast websites, local SEO, conversion-focused page structure, and clear brand presentation.
              </p>
              <p>
                His articles cover real implementation decisions for service businesses, founders, and local brands in Faridabad, Delhi NCR, and across India.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/blogs" className="inline-flex items-center justify-center rounded-2xl bg-orange-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-700">
                Read Articles
              </Link>
              <Link href="/#contact-form" className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                Work With Akash
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
