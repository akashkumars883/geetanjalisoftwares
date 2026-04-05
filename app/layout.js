import { Outfit, Vollkorn } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
const vollkorn = Vollkorn({
  subsets: ["latin"],
  variable: "--font-vollkorn",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})      

import { supabase } from "@/lib/supabase";
import { Toaster } from "sonner";

export async function generateMetadata() {
  try {
    const { data } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (data && data.site_title) {
      return {
        title: data.site_title.slice(0, 60),
        description: data.site_description.slice(0, 130),
        keywords: data.keywords,
        alternates: {
          canonical: 'https://geetanjalisoftwares.in',
        },
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
    title: "Geetanjali Softwares - Leading Digital Agency in Bihar",
    description: "Premium website design, development, digital marketing, and branding services. Scaling businesses in Bihar and across India.",
    keywords: "digital marketing, website design, development, branding, bihar digital agency, seo services",
    alternates: {
      canonical: 'https://geetanjalisoftwares.in',
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Geetanjali Softwares",
              "url": "https://geetanjalisoftwares.in",
              "logo": "https://geetanjalisoftwares.in/icon.png",
              "sameAs": [
                "https://www.instagram.com/geetanjalisoftwares/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-7508657479",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${vollkorn.variable} antialiased`}
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
      </body>
    </html>
  );
}
