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

export async function generateMetadata() {
  try {
    const { data } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (data && data.site_title) {
      return {
        title: data.site_title,
        description: data.site_description,
        keywords: data.keywords,
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
    title: "Geetanjali Softwares - Leading Digital Agency in Bihar & Patna",
    description: "Geetanjali Softwares offers world-class web development, marketing, and SEO services from Faridabad, specializing in scaling Bihar-based businesses.",
    keywords: "digital agency bihar, website development patna, seo services bihar, digital marketing patna",
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${vollkorn.variable} antialiased`}
      >
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
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
