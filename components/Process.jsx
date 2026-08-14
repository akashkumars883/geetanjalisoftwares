export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Discover & Plan",
      description: "We analyze your business operations, scope requirements, and align on structured technical blueprints.",
    },
    {
      num: "02",
      title: "Architecture & Design",
      description: "Formulating database schemas, high-fidelity layouts, UI mockups, and micro-interaction diagrams.",
    },
    {
      num: "03",
      title: "Agile Development",
      description: "Engineering scalable components, writing robust backend logic, and providing continuous builds.",
    },
    {
      num: "04",
      title: "Optimize & Launch",
      description: "Executing deep speed audits, security validation tests, local SEO optimization, and live deployment.",
    },
  ];

  return (
    <section className="py-10 bg-[#09090b] text-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="max-w-3xl text-left mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-wider text-orange-500">
            Our Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
            How we work: From vision <br />
            <span className="text-zinc-500">to production deployment.</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-[#121214] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-all duration-300 flex flex-col justify-between h-[250px] text-left"
            >
              {/* Number and Hover Indicator */}
              <div className="flex items-center justify-between">
                <span className="text-4xl font-extrabold text-white/10 group-hover:text-orange-500 transition-colors duration-300">
                  {step.num}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/10 group-hover:bg-orange-500 transition-colors duration-300" />
              </div>

              {/* Title & Desc */}
              <div className="space-y-2 mt-auto">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
