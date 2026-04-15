import "./globals.css";
import Script from "next/script";

import { supabase } from "@/lib/supabase";
import { Toaster } from "sonner";
import AIConsultant from "@/components/AIConsultant";

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
          canonical: 'https://www.geetanjalisoftwares.in',
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
    alternates: {
      canonical: 'https://www.geetanjalisoftwares.in',
    },
    openGraph: {
      title: "Geetanjali Softwares - Website Development & SEO Company",
      description: "Scale your brand with a leading digital agency. High-performance web development, SEO, and custom software.",
      url: 'https://www.geetanjalisoftwares.in',
      siteName: 'Geetanjali Softwares',
      images: [{ url: 'https://www.geetanjalisoftwares.in/icon.png', width: 512, height: 512 }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Geetanjali Softwares",
      description: "Expert Website Development & SEO Services.",
      images: ['https://www.geetanjalisoftwares.in/icon.png'],
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
              "url": "https://www.geetanjalisoftwares.in",
              "logo": "https://www.geetanjalisoftwares.in/icon.png",
              "description": "Geetanjali Softwares is a leading website development and digital marketing agency.",
              "sameAs": [
                "https://www.instagram.com/geetanjalisoftwares/",
                "https://www.facebook.com/geetanjalisoftwares/"
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
        className="antialiased"
      >
        <Toaster richColors position="top-right" />
        <AIConsultant />

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
