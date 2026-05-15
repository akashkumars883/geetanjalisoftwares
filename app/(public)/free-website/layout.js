export const metadata = {
  title: "Free AI Website Builder in 60 Seconds | Geetanjali Softwares",
  description: "Build a professional, mobile-responsive, and SEO-optimized business website for free in under a minute with Geetanjali Softwares AI. No coding required, instant deployment.",
  keywords: ["free website builder", "AI website maker", "business website India", "professional website for free", "no-code website builder", "Geetanjali Softwares"],
  openGraph: {
    title: "Free AI Website Builder - Launch Your Business Online Fast",
    description: "Answer 4 questions and get a premium business website in 60 seconds. Hosted for free with SSL security.",
    url: "https://www.geetanjalisoftwares.in/free-website",
    siteName: "Geetanjali Softwares",
    images: [
      {
        url: "https://www.geetanjalisoftwares.in/icon.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.geetanjalisoftwares.in/free-website",
  },
};

export default function FreeWebsiteLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Geetanjali Softwares AI Website Builder",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "ratingCount": "150"
            },
            "description": "An automated AI-powered SaaS engine that creates professional business websites in under 60 seconds."
          })
        }}
      />
      {children}
    </>
  );
}
