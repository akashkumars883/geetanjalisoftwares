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
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
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
              className="relative mx-auto h-auto w-[400px] max-w-sm sm:max-w-md object-contain remove-background"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {whyChooseUs.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-[28px] border border-black/10 bg-white/78 p-6 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_70px_-36px_rgba(0,0,0,0.35)]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 shadow-inner group-hover:bg-orange-500/20">
                {item.icon}
              </div>
              
              <h3 className="text-2xl font-semibold tracking-tight text-black">
                {item.title}
              </h3>
              
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-700/80">Benefit</p>
                  <p className="mt-1 text-sm leading-6 text-black/70">
                    {item.benefit}
                  </p>
                </div>

                <div className="rounded-2xl bg-stone-100/80 p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-black/40">Proof</p>
                  </div>
                  <p className="mt-1 text-xs font-medium text-black/80">
                    {item.proof}
                  </p>
                </div>
              </div>

              <Link
            href="/services"
            className="inline-flex w-full mt-4 items-center justify-center rounded-full border border-black/15 bg-white/80 px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/5 sm:w-auto"
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
