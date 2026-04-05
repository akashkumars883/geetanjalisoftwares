import Link from 'next/link';

export default function FinalCtaSection() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl rounded-lg bg-[#111111] p-6 text-white shadow-xl sm:p-8 lg:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Copy */}
          <div className="max-w-2xl">
            <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-white/8">
              <div className="absolute inset-0 rounded-lg bg-orange-500/20 blur-xl" />
              <img
                src="/images/cta_final.png"
                alt="Final CTA Visual"
                className="relative h-10 w-10 object-contain remove-background"
              />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/50">
              Get Started
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">
              Ready to improve your website, digital marketing, or branding?
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
              Let&apos;s build a stronger digital presence with the right mix of strategy, design, and execution.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-lg bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-orange-50 sm:w-auto sm:px-8"
            >
              Start Your Project
            </Link>
            <Link
              href="/about"
              className="inline-flex w-full items-center justify-center rounded-lg border border-white/15 bg-white/8 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/15 sm:w-auto sm:px-8"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
