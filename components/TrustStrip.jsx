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
    <section className="py-12 mb-20 bg-stone-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-10">
          Trusted by Businesses for Modern Solutions
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale transition-all hover:grayscale-0 sm:gap-20">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-lg bg-${logo.hue}-500/20`} />
              <span className="text-lg font-bold tracking-tight text-black/70">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
