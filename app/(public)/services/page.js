import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Services | Geetanjali Softwares",
  description:
    "Explore web development, SEO, digital marketing, and branding services by Geetanjali Softwares.",
  alternates: {
    canonical: "https://www.geetanjalisoftwares.in/services",
  },
  openGraph: {
    title: "Services | Geetanjali Softwares",
    description:
      "Explore web development, SEO, digital marketing, and branding services by Geetanjali Softwares.",
    url: "https://www.geetanjalisoftwares.in/services",
    siteName: "Geetanjali Softwares",
    images: [{ url: "https://www.geetanjalisoftwares.in/icon.png", width: 512, height: 512 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Geetanjali Softwares",
    description:
      "Explore web development, SEO, digital marketing, and branding services by Geetanjali Softwares.",
    images: ["https://www.geetanjalisoftwares.in/icon.png"],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
