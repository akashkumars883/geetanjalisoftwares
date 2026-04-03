import Link from 'next/link';

export default function FinalCtaSection() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl rounded-[36px] bg-[#111111] p-6 text-white shadow-[0_30px_80px_-42px_rgba(0,0,0,0.5)] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/5">
              <div className="absolute inset-0 bg-orange-500/20 blur-2xl" />
              <img
                src="/images/cta_final.png"
                alt="Final CTA Visual"
                className="relative h-16 w-16 object-contain remove-background transition duration-700 hover:scale-110"
              />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
              Final CTA
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to improve your website, digital marketing, or branding?
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
              Let&apos;s build a stronger digital presence with the right mix of strategy, design, and execution.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-orange-100 sm:px-8 sm:text-base"
            >
              Start Your Project
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/12 sm:px-8 sm:text-base"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
