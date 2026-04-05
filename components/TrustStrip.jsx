import React from 'react';

const logos = [
  { name: 'ModernWeb', hue: 'orange' },
  { name: 'CloudScale', hue: 'stone' },
  { name: 'GrowthEngine', hue: 'orange' },
  { name: 'DataFlow', hue: 'stone' },
  { name: 'BuildFast', hue: 'orange' },
];

export default function TrustStrip() {
  return (
    <section className="py-10 mb-16 sm:mb-20 bg-stone-50/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-black/35 mb-8">
          Trusted by Businesses for Modern Solutions
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center gap-2 shrink-0">
              <div className={`h-7 w-7 rounded-lg bg-${logo.hue}-500/20`} />
              <span className="text-base font-bold tracking-tight text-black/70">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
