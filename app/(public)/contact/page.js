import ContactFormSection from "@/components/ContactFormSection";

export const metadata = {
  title: "Contact | Geetanjali Softwares",
  description:
    "Contact Geetanjali Softwares for web development, SEO, branding, and digital marketing. Get a quick consultation and project estimate.",
  alternates: {
    canonical: "https://www.geetanjalisoftwares.in/contact",
  },
  openGraph: {
    title: "Contact | Geetanjali Softwares",
    description:
      "Contact Geetanjali Softwares for web development, SEO, branding, and digital marketing. Get a quick consultation and project estimate.",
    url: "https://www.geetanjalisoftwares.in/contact",
    siteName: "Geetanjali Softwares",
    images: [{ url: "https://www.geetanjalisoftwares.in/icon.png", width: 512, height: 512 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Geetanjali Softwares",
    description:
      "Contact Geetanjali Softwares for web development, SEO, branding, and digital marketing. Get a quick consultation and project estimate.",
    images: ["https://www.geetanjalisoftwares.in/icon.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="pt-4">
      <ContactFormSection />
    </div>
  );
}
