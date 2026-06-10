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
    <section className="pb-20 pt-6 sm:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 sm:text-sm">
            Locations
          </p>
          <h1 className="mt-4 text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl">
            Digital services <span className="text-slate-500">delivered across India.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            We provide enterprise-quality web development, SEO, and digital marketing solutions to businesses nationwide. Select your city to explore localized support and expertise.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city}
              href={`/locations/${city}`}
              className="rounded-3xl border border-black/5 bg-slate-50 px-6 py-5 text-slate-900 transition hover:-translate-y-0.5 hover:border-orange-500/30 hover:bg-white"
            >
              <div className="text-lg font-semibold">{toCityName(city)}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Web Development • SEO
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
