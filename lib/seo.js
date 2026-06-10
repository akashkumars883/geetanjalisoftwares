export const SITE_URL = "https://www.geetanjalisoftwares.in";
export const BUSINESS_NAME = "Geetanjali Softwares";
export const BUSINESS_EMAIL = "geetanjalisoftwares@gmail.com";
export const BUSINESS_PHONE = "+917508657479";
export const BUSINESS_PHONE_DISPLAY = "+91 7508657479";
export const BUSINESS_ADDRESS = {
  locality: "Faridabad",
  region: "Haryana",
  country: "IN",
};

export const OG_IMAGE = `${SITE_URL}/images/logo.jpg`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const GOOGLE_BUSINESS_URL =
  "https://www.google.com/search?q=Geetanjali+Softwares+Faridabad";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/geetanjalisoftwares/",
  facebook: "https://www.facebook.com/geetanjalisoftwares",
  linkedin: "https://www.linkedin.com/company/geetanjalisoftwares",
  twitter: "https://x.com/geetanjalisoft",
  pinterest: "https://in.pinterest.com/geetanjalisoftwares/",
  googleBusiness: GOOGLE_BUSINESS_URL,
};

export const founder = {
  name: "Akash",
  role: "Founder & Digital Strategist",
  url: `${SITE_URL}/authors/akash`,
  profileUrl: `${SITE_URL}/about`,
};

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    founder: {
      "@type": "Person",
      name: founder.name,
      url: founder.url,
      jobTitle: founder.role,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS_PHONE,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

export function localBusinessSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#local-business`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/images/logo.jpg`,
    logo: `${SITE_URL}/icon.png`,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    priceRange: "Rs 15,000+",
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS_ADDRESS.locality,
      addressRegion: BUSINESS_ADDRESS.region,
      addressCountry: BUSINESS_ADDRESS.country,
    },
    areaServed: [
      "Faridabad",
      "Delhi NCR",
      "Delhi",
      "Noida",
      "Gurgaon",
      "India",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    founder: {
      "@type": "Person",
      name: founder.name,
      url: founder.url,
    },
    sameAs: Object.values(SOCIAL_LINKS),
  };
}