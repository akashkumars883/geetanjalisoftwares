import ProjectEstimator from "@/components/ProjectEstimator";
import SEOSimulator from "@/components/SEOSimulator";
import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Free Website & SEO Tools | Geetanjali Softwares",
  description:
    "Use free website tools from Geetanjali Softwares including an SEO audit preview and project cost estimator for website development and digital marketing.",
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
  openGraph: {
    title: "Free Website & SEO Tools | Geetanjali Softwares",
    description:
      "Estimate your website development cost and run a quick SEO audit preview with Geetanjali Softwares.",
    url: `${SITE_URL}/tools`,
    siteName: "Geetanjali Softwares",
    images: [{ url: `${SITE_URL}/icon.png`, width: 512, height: 512 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website & SEO Tools | Geetanjali Softwares",
    description:
      "Estimate website project cost and preview SEO checks with free tools from Geetanjali Softwares.",
    images: [`${SITE_URL}/icon.png`],
  },
};

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/tools#tools`,
    name: "Geetanjali Softwares Free Website and SEO Tools",
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        position: 1,
        name: "SEO Audit Preview Tool",
        applicationCategory: "SEOApplication",
        operatingSystem: "Web",
        url: `${SITE_URL}/tools#seo-scanner`,
      },
      {
        "@type": "SoftwareApplication",
        position: 2,
        name: "Website Project Cost Estimator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: `${SITE_URL}/tools#estimator`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="pb-8 pt-8 sm:pb-12 sm:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 sm:text-sm">
            Free Tools
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-normal leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Smart tools for <span className="text-slate-500">smarter digital decisions.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Estimate your project budget, preview your SEO performance, and make data-driven decisions before you invest. Built for business owners who want clarity before commitment.
          </p>
        </div>
      </section>
      <SEOSimulator />
      <ProjectEstimator />
    </>
  );
}
