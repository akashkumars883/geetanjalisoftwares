const portfolioItems = [
  {
    title: 'E-commerce Revenue Optimization',
    category: 'Website Development',
    description:
      'A high-performance online store built to convert visitors into customers through strategic UI and fast loading.',
  },
  {
    title: 'Real Estate Lead Generation',
    category: 'Digital Marketing',
    description:
      'A targeted marketing system designed to capture high-quality enquiries for premium property listings.',
  },
  {
    title: 'Corporate Identity Design',
    category: 'Branding',
    description:
      'A complete visual refresh for a modern consulting firm, focusing on consistency and professional trust.',
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="scroll-mt-28 pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
              Portfolio
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
              Work shaped around real business needs.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/70 sm:text-base">
            Each project is built to improve how a business looks, communicates, and performs online.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-lg border border-black/10 bg-white/80 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md backdrop-blur-xl sm:p-6"
            >
              <div className="relative mb-5 h-44 w-full overflow-hidden rounded-lg bg-stone-50">
                <div className="absolute inset-0 bg-orange-500/5 blur-3xl opacity-50" />
                <img
                  src={`/images/portfolio_${item.category.toLowerCase().includes("website") ? "web" : item.category.toLowerCase().includes("marketing") ? "marketing" : "branding"}.png`}
                  alt={item.title}
                  className="h-full w-full object-contain remove-background transition duration-700 group-hover:scale-105"
                />
              </div>
              <span className="inline-flex rounded-lg border border-black/10 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-black/55">
                {item.category}
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-black sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-black/70">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
