import AboutClient from "./AboutClient";

export const metadata = {
  title: "About | Geetanjali Softwares",
  description:
    "Learn about Geetanjali Softwares—our approach to web development, SEO, and building modern digital experiences for businesses.",
  alternates: {
    canonical: "https://www.geetanjalisoftwares.in/about",
  },
  openGraph: {
    title: "About | Geetanjali Softwares",
    description:
      "Learn about Geetanjali Softwares—our approach to web development, SEO, and building modern digital experiences for businesses.",
    url: "https://www.geetanjalisoftwares.in/about",
    siteName: "Geetanjali Softwares",
    images: [{ url: "https://www.geetanjalisoftwares.in/icon.png", width: 512, height: 512 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Geetanjali Softwares",
    description:
      "Learn about Geetanjali Softwares—our approach to web development, SEO, and building modern digital experiences for businesses.",
    images: ["https://www.geetanjalisoftwares.in/icon.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
