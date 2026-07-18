import Link from "next/link";

export const metadata = {
  title: "Locations | Geetanjali Softwares",
  description:
    "Explore our web development, SEO, and digital marketing services across major Indian cities.",
  alternates: {
    canonical: "https://www.geetanjalisoftwares.in/locations",
  },
  openGraph: {
    title: "Locations | Geetanjali Softwares",
    description:
      "Explore our web development, SEO, and digital marketing services across major Indian cities.",
    url: "https://www.geetanjalisoftwares.in/locations",
    siteName: "Geetanjali Softwares",
    images: [{ url: "https://www.geetanjalisoftwares.in/icon.png", width: 512, height: 512 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locations | Geetanjali Softwares",
    description:
      "Explore our web development, SEO, and digital marketing services across major Indian cities.",
    images: ["https://www.geetanjalisoftwares.in/icon.png"],
  },
};

const cities = [
  "faridabad",
  "delhi-ncr",
  "patna",
  "delhi",
  "mumbai",
  "bangalore",
  "lucknow",
  "jaipur",
  "pune",
  "noida",
  "gurgaon",
  "kolkata",
  "chennai",
  "hyderabad",
  "ahmedabad",
  "chandigarh",
  "ranchi",
  "bhopal",
  "indore",
  "kanpur",
  "surat",
  "guwahati",
];

function toCityName(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function LocationsIndexPage() {
  return (
    <section className="pb-20 pt-0 sm:pt-4 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-5xl border-b border-foreground/10 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-primary"></span>
            <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
              Locations
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground leading-tight">
            Digital services <br /> <span className="text-primary">across India.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70 font-medium">
            We provide enterprise-quality web development, SEO, and digital marketing solutions to businesses nationwide. Select your city to explore localized support and expertise.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city}
              href={`/locations/${city}`}
              className="group flex flex-col border border-foreground/10 bg-foreground/5 p-8 transition-colors hover:border-primary"
            >
              <div className="mb-4">
                <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">
                  Region
                </span>
              </div>
              <h2 className="mt-2 font-heading text-2xl font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
                {toCityName(city)}
              </h2>
              <div className="mt-4 pt-6 border-t border-foreground/10 text-xs font-semibold uppercase tracking-wider text-foreground/60">
                Web Development • SEO
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
