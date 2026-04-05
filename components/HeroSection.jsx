import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative mb-24 overflow-hidden pb-14 pt-2">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col items-start text-left lg:items-start lg:text-left">
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl xl:text-7xl">
              Empowering Brands with scalable <span className="inline font-serif text-orange-500 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"> digital marketing </span> solutions
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/70 sm:text-base lg:text-lg">
              From modern websites to digital marketing and branding, We design fast, SEO-friendly websites that help you attract more customers and increase your revenue.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#contact-form"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:px-8 sm:text-base"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/#portfolio"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-black/5 sm:px-8 sm:text-base"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <div className="absolute inset-0 bg-orange-500/5 blur-[80px]" />
              <Image
                src="/images/hero_main.png"
                alt="Digital Marketing and Web Development Illustration"
                width={500}
                height={500}
                priority
                className="relative h-auto w-full object-contain remove-background transition duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-orange-500 sm:bottom-1">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 13 6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
