import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://geetanjalisoftwares.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Digital Marketing Agency & Website Development Company in India | Geetanjali Softwares",
    template: "%s | Geetanjali Softwares",
  },

  description:
    "Geetanjali Softwares is a premier digital marketing agency and website development company in India & USA. We deliver SEO services, local SEO, ecommerce SEO, performance marketing, social media marketing, and white label SEO reseller programs.",

  keywords: [
    "digital marketing agency",
    "digital marketing company",
    "digital marketing agency in India",
    "digital marketing company in India",
    "best digital marketing agency in India",
    "digital marketing company in Delhi NCR",
    "digital marketing agency in Noida",
    "SEO company",
    "SEO agency",
    "SEO company in India",
    "SEO agency in India",
    "best SEO company in India",
    "SEO services",
    "SEO services in India",
    "SEO company in Delhi NCR",
    "SEO agency in Noida",
    "local SEO agency",
    "local SEO company",
    "local SEO services",
    "local SEO agency in India",
    "best local SEO agency in India",
    "ecommerce SEO agency",
    "ecommerce SEO services",
    "ecommerce SEO company",
    "ecommerce SEO agency in India",
    "best ecommerce SEO agency",
    "SEO reseller services",
    "SEO reseller company",
    "SEO reseller program",
    "SEO reseller services in India",
    "white label SEO services",
    "white label SEO company",
    "performance marketing agency",
    "performance marketing company",
    "performance marketing agency in India",
    "performance marketing company in Delhi NCR",
    "social media marketing agency",
    "social media marketing company",
    "social media marketing services",
    "social media marketing agency in India",
    "website design company",
    "website development company",
    "website design company in India",
    "website development company in India",
    "web design services",
    "web development services",
    "ecommerce development company",
    "ecommerce development services",
    "ecommerce development company in India",
    "website development company in USA",
  ],

  authors: [{ name: "Geetanjali Softwares", url: BASE_URL }],
  creator: "Geetanjali Softwares",
  publisher: "Geetanjali Softwares",

  // Canonical URL
  alternates: {
    canonical: BASE_URL,
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp previews)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Geetanjali Softwares",
    title: "Digital Marketing Agency & Website Development Company in India | Geetanjali Softwares",
    description:
      "Leading digital marketing agency & website development company in India & USA offering SEO services, local SEO, performance marketing, social media marketing, and white label SEO reseller programs.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Geetanjali Softwares – Best Digital Marketing Agency & Website Development Company in India",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@geetanjalisw",
    creator: "@geetanjalisw",
    title: "Digital Marketing Agency & Website Development Company in India | Geetanjali Softwares",
    description:
      "Custom website development, SEO services, local SEO, ecommerce SEO, performance marketing, and white label SEO reseller programs.",
    images: [`${BASE_URL}/og-image.jpg`],
  },

  // Robots directive
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification tags
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Web manifest
  manifest: "/site.webmanifest",

  // Category
  category: "technology",
};

// Global Organization JSON-LD Schema
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Geetanjali Softwares",
  "url": BASE_URL,
  "logo": `${BASE_URL}/logo.png`,
  "image": `${BASE_URL}/og-image.jpg`,
  "description":
    "Geetanjali Softwares is a premier digital marketing agency and website development company in India and USA providing SEO services, local SEO, ecommerce SEO, performance marketing, social media marketing, and white label SEO reseller services.",
  "telephone": "+91-6201231875",
  "email": "geetanjalisoftwares@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Delhi NCR",
  },
  "areaServed": [
    "India",
    "Delhi NCR",
    "Noida",
    "United States",
    "Global"
  ],
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": [
    "https://www.facebook.com/geetanjalisoftwares/",
    "https://www.instagram.com/geetanjalisoftwares/",
    "https://www.pinterest.com/geetanjalisoftwares/",
    "https://www.linkedin.com/company/geetanjalisoftwares/",
    "https://x.com/geetanjalisoftwares",
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Marketing & Software Development Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing Services in India" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Agency Services in India & Delhi NCR" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO Agency Services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-Commerce SEO Services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "White Label SEO Reseller Program" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Performance Marketing Agency Services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Marketing Services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development Company in India & USA" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-Commerce Development Services" } },
    ],
  },
};

// Website Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Geetanjali Softwares",
  "url": BASE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased bg-white`}
    >
      <head>
        {/* Google Analytics GA4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-stone-900">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
