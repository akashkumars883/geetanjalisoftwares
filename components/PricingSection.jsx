const pricingPlans = [
  {
    name: 'Website Starter',
    price: 'Starting at Rs. 4,999',
    description: 'For businesses that need a clean and professional website presence.',
    points: ['1 - 5 Pages Website', 'Mobile Responsive Design', 'WhatsApp Button','Basic SEO','Google Map Integration'],
  },
  {
    name: 'Growth Package',
    price: 'Starting at Rs. 9,999',
    description: 'For businesses that want website, branding, and marketing aligned together.',
    points: ['Everything in Starter', 'Landing Page (High-converting)', 'SEO Setup(On-page)','Speed Optimization',],
  },
  {
    name: 'Custom Solution',
    price: 'Tailored pricing',
    description: 'For brands that need a complete digital presence built around their goals.',
    points: ['Custom Website Design', 'Advanced UI/UX', 'Full SEO Setup','Google Ads Setup','Social Media Setup','Lead Funnel System','Analytics Setup'],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-28 pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
            Simple Pricing to Grow Your Business
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className="group rounded-[32px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 sm:p-6"
            >
              <div className="relative mb-6 h-32 w-full overflow-hidden rounded-2xl bg-stone-50">
                <div className="absolute inset-0 bg-orange-500/5 blur-2xl" />
                <img
                  src={`/images/pricing_${plan.name === "Website Starter" ? "free" : "pro"}.png`}
                  alt={plan.name}
                  className="h-full w-full object-contain remove-background transition duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-black">
                {plan.name}
              </h3>
              <p className="mt-3 text-lg font-semibold text-black">{plan.price}</p>
              <p className="mt-3 text-sm leading-7 text-black/70">
                {plan.description}
              </p>

              <div className="mt-5 space-y-2">
                {plan.points.map((point) => (
                  <div key={point} className="rounded-2xl bg-stone-100/90 px-3 py-3 text-sm text-black/75">
                    {point}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
