import Link from "next/link";
import React from "react";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-28 pb-16 sm:pb-20">
      <div className="absolute left-1/2 top-20 h-56 w-56 -translate-x-1/2 rounded-full bg-orange-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
              We Build, Market &amp; Scale Your Business Online
            </h2>
            <p className="mt-4 text-sm leading-7 text-black/70 sm:text-base">
              From building your website to generating leads, we handle
              everything so you can focus on your business.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex w-full items-center justify-center rounded-lg border border-black/15 bg-white/80 px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/5 sm:w-auto"
          >
            View All Services
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services
            .filter((service) => !service.slug.includes("/"))
            .map((service) => (
            <article
              id={service.slug}
              key={service.slug}
              className="group relative scroll-mt-28 overflow-hidden rounded-lg border border-black/10 bg-white/80 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md backdrop-blur-xl sm:p-6"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-300/15 blur-2xl transition duration-300 group-hover:bg-orange-300/25" />
              <div className="relative">
                <div className="relative mb-5 h-28 w-full overflow-hidden rounded-lg bg-stone-50">
                  <div className="absolute inset-0 bg-orange-500/5 blur-2xl" />
                  <img
                    src={`/images/${service.slug.split("/").pop().replace("website-design-development", "web").replace("digital-marketing", "marketing")}_icon.png`}
                    alt={service.title}
                    className="h-full w-full object-contain remove-background transition duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="inline-flex rounded-lg border border-black/10 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-black/55">
                  {service.number}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-black sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/70">
                  {service.description}
                </p>

                <div className="mt-4 space-y-2">
                  {service.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-lg bg-stone-100/90 px-3 py-2.5 text-sm text-black/75"
                    >
                      {point}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/5 sm:w-auto"
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
