import Link from "next/link";
import { services } from "@/lib/services";

export default function ServicesPage() {
  return (
    <section className="relative pb-20 pt-24 sm:pt-28 lg:pt-32">
      <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
            Services
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl">
            Services built around how modern businesses grow online.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-black/70 sm:text-base">
            Explore our specialized services and choose the one that matches your next business goal.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {services
            .filter((service) => !service.slug.includes("/"))
            .map((service) => (
            <article
              key={service.slug}
              className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-white/80 p-5 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_70px_-36px_rgba(0,0,0,0.35)] sm:p-6"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-300/15 blur-2xl" />
              <div className="relative">
                <span className="inline-flex rounded-full border border-black/10 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-black/55">
                  {service.number}
                </span>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-black">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-black/70">
                  {service.description}
                </p>

                <div className="mt-5 space-y-2">
                  {service.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl bg-stone-100/90 px-3 py-3 text-sm text-black/75"
                    >
                      {point}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
                >
                  Explore Service
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
