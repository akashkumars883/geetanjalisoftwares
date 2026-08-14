import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "LAUNCH",
      desc: "For new brands that need a sharp, fast website.",
      features: [
        "Up to 6 pages",
        "Responsive build",
        "Basic SEO setup",
        "1 month support",
      ],
      featured: false,
    },
    {
      name: "GROWTH",
      desc: "For teams scaling traffic, content and conversions.",
      features: [
        "Custom design system",
        "CMS integration",
        "SEO & analytics",
        "3 months support",
      ],
      featured: true,
    },
    {
      name: "PARTNER",
      desc: "Ongoing design, development and marketing retainer.",
      features: [
        "Dedicated team",
        "Monthly roadmap",
        "Performance tuning",
        "Priority support",
      ],
      featured: false,
    },
  ];

  return (
    <section className="py-10 bg-stone-50 border-b border-stone-100 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="max-w-3xl text-left mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Pricing Plans
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-stone-900 leading-tight">
            Flexible engagement models <br />
            <span className="text-orange-600">tailored to your goals.</span>
          </h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <article
              key={index}
              className={`rounded-md p-8 flex flex-col justify-between border transition-all duration-300 ${plan.featured
                ? "bg-[#09090b] border-black text-white"
                : "bg-white border-stone-200/80 text-stone-900 hover:border-stone-300 hover:shadow-lg"
                }`}
            >
              <div className="space-y-6">
                {/* Title & Description */}
                <div className="space-y-2 text-left">
                  <h3 className="text-lg font-semibold tracking-wider uppercase font-sans">
                    {plan.name}
                  </h3>
                  <p
                    className={`text-xs font-light leading-relaxed ${plan.featured ? "text-zinc-400" : "text-stone-600"
                      }`}
                  >
                    {plan.desc}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 pt-4 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-medium">
                      <Check
                        className={`h-4 w-4 shrink-0 ${plan.featured ? "text-orange-500" : "text-orange-600"
                          }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <Link
                  href="/contact"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-200 ${plan.featured
                    ? "bg-orange-600 text-white hover:bg-orange-700 shadow-md"
                    : "bg-white text-stone-900 border border-stone-200 hover:bg-stone-50 hover:border-stone-300"
                    }`}
                >
                  Request a quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
