const testimonials = [
  {
    quote:
      'The website looked far more polished after the redesign, and the messaging finally felt aligned with our business.',
    name: 'Amit Verma',
    role: 'Service Business Owner',
  },
  {
    quote:
      'Their digital marketing direction gave us a much clearer structure for campaigns and helped us present our offer better.',
    name: 'Ritika Sharma',
    role: 'Marketing Lead',
  },
  {
    quote:
      'The branding work made our business look more professional and consistent across every customer touchpoint.',
    name: 'Karan Mehta',
    role: 'Founder',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-28 pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange-700 sm:text-sm">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
            What clients value most in the work.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-lg border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur-xl sm:p-6"
            >
              <p className="flex-1 text-sm leading-7 text-black/72">
                &quot;{item.quote}&quot;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-black/5 pt-5">
                <div className="h-9 w-9 flex-shrink-0 rounded-full bg-orange-500/10 flex items-center justify-center text-xs font-black text-orange-600 uppercase">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-black">{item.name}</h3>
                  <p className="text-xs text-black/45">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
