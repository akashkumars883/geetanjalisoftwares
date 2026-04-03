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

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[28px] border border-black/10 bg-white/78 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
            >
              <p className="text-sm leading-7 text-black/72">
                &quot;{item.quote}&quot;
              </p>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
                <p className="text-sm text-black/55">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
