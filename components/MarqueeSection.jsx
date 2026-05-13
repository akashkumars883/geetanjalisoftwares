'use client';


export default function MarqueeSection() {
  const items = [
    "Website Development",
    "SEO Optimization",
    "UI/UX Design",
    "Digital Marketing",
    "Brand Strategy",
    "E-Commerce Solutions",
    "Custom Software"
  ];

  // Duplicate items heavily to ensure a seamless infinite scroll on ultra-wide monitors
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section className="relative w-full bg-transparent py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center">
            {marqueeItems.map((item, index) => (
              <div key={index} className="flex shrink-0 items-center px-4 sm:px-8">
                <span className="text-xl font-semibold uppercase tracking-wider text-slate-900/60 transition-colors hover:text-orange-600 sm:text-2xl">
                  {item}
                </span>
                <span className="ml-8 text-xl text-orange-500/30 sm:ml-16 sm:text-2xl">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
