import "./globals.css";
import Script from "next/script";

import { supabase } from "@/lib/supabase";
import { Toaster } from "sonner";
import { Outfit } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import {
  BUSINESS_NAME,
  BUSINESS_PHONE,
  SITE_URL,
  SOCIAL_LINKS,
  founder,
  localBusinessSchema,
  organizationSchema,
} from "@/lib/seo";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export async function generateMetadata() {
  const metadataBase = new URL(SITE_URL);
  const owner = {
    name: founder.name,
    url: founder.url,
  };
  try {
    const { data } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (data && data.site_title) {
      return {
        metadataBase,
        title: {
          default: data.site_title.slice(0, 60),
          template: "%s",
        },
        description: (data.site_description || "").slice(0, 160),
        authors: [owner],
        creator: owner.name,
        publisher: BUSINESS_NAME,
        icons: {
          icon: "/favicon.ico",
        },
      };
    }
  } catch (error) {
    console.error('Metadata fetch error:', error);
  }

  // Fallback for Bihar-focused SEO
  return {
    metadataBase,
    title: {
      default: "Website Development & SEO Company in Faridabad",
      template: "%s | Geetanjali Softwares",
    },
    description: "Scale your brand with a leading digital agency. High-performance web development, SEO, and custom software.",
    authors: [owner],
    creator: owner.name,
    publisher: BUSINESS_NAME,
    openGraph: {
      title: "Website Development & SEO Company in Faridabad",
      description: "Scale your brand with a leading digital agency. High-performance web development, SEO, and custom software.",
      url: SITE_URL,
      siteName: BUSINESS_NAME,
      images: [{ url: `${SITE_URL}/images/logo.jpg`, width: 1200, height: 630 }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Website Development & SEO Company in Faridabad",
      description: "Expert Website Development & SEO Services.",
      images: [`${SITE_URL}/images/logo.jpg`],
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                ...organizationSchema(),
                "description": "Geetanjali Softwares is a website development, SEO, and digital marketing studio based in Faridabad, Haryana."
              },
              {
                "@context": "https://schema.org",
                ...localBusinessSchema()
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": BUSINESS_NAME,
                "url": SITE_URL,
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": `${SITE_URL}/blogs?search={search_term_string}`,
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "SiteNavigationElement",
                    "position": 1,
                    "name": "AI Studio Website Builder",
                    "url": `${SITE_URL}/studio`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 2,
                    "name": "Website Development",
                    "url": `${SITE_URL}/services/website-design-development`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 3,
                    "name": "Digital Marketing",
                    "url": `${SITE_URL}/services/digital-marketing`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 4,
                    "name": "Portfolio",
                    "url": `${SITE_URL}/portfolio`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 5,
                    "name": "Tools",
                    "url": `${SITE_URL}/tools`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 6,
                    "name": "Blogs",
                    "url": `${SITE_URL}/blogs`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 7,
                    "name": "Contact",
                    "url": `${SITE_URL}/contact`
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "ContactPoint",
                "telephone": BUSINESS_PHONE,
                "contactType": "sales",
                "areaServed": "IN",
                "availableLanguage": ["en", "hi"],
                "url": SOCIAL_LINKS.googleBusiness
              }
            ])
          }}
        />
      </head>
      <body
        className={`${outfit.className} antialiased`}
      >
        <Toaster richColors position="top-right" />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VYQ9HPXHVZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VYQ9HPXHVZ');
          `}
        </Script>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
