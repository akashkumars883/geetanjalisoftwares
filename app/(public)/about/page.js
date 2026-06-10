import AboutClient from "./AboutClient";

export const metadata = {
  title: "About | Geetanjali Softwares",
  description:
    "Learn about Geetanjali Softwares—our approach to web development, SEO, and building modern digital experiences for businesses.",
  alternates: {
    canonical: "https://www.geetanjalisoftwares.in/about",
  },
  openGraph: {
    title: "About",
    description:
      "Learn about Geetanjali Softwares—our approach to web development, SEO, and building modern digital experiences for businesses.",
    url: "https://www.geetanjalisoftwares.in/about",
    siteName: "Geetanjali Softwares",
    images: [{ url: "https://www.geetanjalisoftwares.in/images/logo.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About",
    description:
      "Learn about Geetanjali Softwares—our approach to web development, SEO, and building modern digital experiences for businesses.",
    images: ["https://www.geetanjalisoftwares.in/images/logo.jpg"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
