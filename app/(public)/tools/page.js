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
      <section className="pb-16 pt-0 sm:pb-24 sm:pt-4 bg-background text-foreground border-b border-foreground/10">
        <div className="mx-auto max-w-7xl px-6 text-left">
          <div className="flex items-center justify-start gap-3 mb-6">
            <span className="h-[1px] w-12 bg-primary"></span>
            <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">
              Free Tools
            </span>
          </div>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-bold uppercase tracking-tighter text-foreground sm:text-6xl lg:text-[5rem] leading-[0.9]">
            SMART TOOLS FOR <br /> <span className="text-primary">SMARTER DECISIONS.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70 font-medium">
            Estimate your project budget, preview your SEO performance, and make data-driven decisions before you invest. Built for business owners who want clarity before commitment.
          </p>
        </div>
      </section>
      <SEOSimulator />
      <ProjectEstimator />
    </>
  );
}
