import { Zap, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const whyChooseUs = [
  {
    icon: <Zap className="h-6 w-6 text-orange-600" />,
    title: '10x Faster Deployment',
    benefit: 'Get your business live in days, not months.',
    proof: 'Trusted by 50+ businesses for rapid scaling.',
    ctaLabel: 'Start Scaling',
  },
  {
    icon: <Target className="h-6 w-6 text-orange-600" />,
    title: 'Data-Driven Marketing',
    benefit: 'Every click is tracked, every lead verified.',
    proof: 'Average 45% increase in conversion rates.',
    ctaLabel: 'See Strategy',
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
    title: 'ROI-Focused Growth',
    benefit: 'Systems that generate revenue automatically.',
    proof: '100% Client satisfaction with long-term ROAS.',
    ctaLabel: 'Build My Funnel',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="scroll-mt-28 pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
              Why Choose Us
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
              Strategies That Scale Your Business to New Heights
            </h2>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-orange-500/5 blur-[80px]" />
            <img
              src="/images/why_choose_us_new.png"
              alt="Premium 3D Success Illustration"
              className="relative mx-auto h-auto w-[360px] object-contain remove-background"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-lg border border-black/10 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md backdrop-blur-xl sm:p-6"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
                {item.title}
              </h3>

              <div className="mt-4 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-700/80">Benefit</p>
                  <p className="mt-1 text-sm leading-6 text-black/70">
                    {item.benefit}
                  </p>
                </div>

                <div className="rounded-lg bg-stone-100/80 p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                    <p className="text-xs font-bold uppercase tracking-wider text-black/40">Proof</p>
                  </div>
                  <p className="mt-1 text-xs font-medium text-black/80">
                    {item.proof}
                  </p>
                </div>
              </div>

              <Link
                href="/services"
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-black/15 bg-white/80 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-black/5"
              >
                {item.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
