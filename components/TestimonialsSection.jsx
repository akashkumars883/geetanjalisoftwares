'use client';

import { motion } from 'framer-motion';

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
  {
    quote:
      'Working with Geetanjali Softwares was a game-changer for our online presence. Highly recommended!',
    name: 'Sonal Singh',
    role: 'E-commerce Manager',
  },
];

export default function TestimonialsSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <section id="testimonials" className="scroll-mt-28 pb-16 sm:pb-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-[0.3em] text-orange-700 sm:text-sm">
            Testimonials
          </motion.p>
          <motion.h2 variants={fadeInUp} className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl leading-[1.1]">
            What clients value <span className="text-black/40">most in the work.</span>
          </motion.h2>
        </motion.div>

        {/* Scrollable Container */}
        <div className="relative mt-12">
          <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {testimonials.map((item, idx) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex min-w-[300px] flex-col rounded-[32px] border border-black/[0.03] bg-white p-8 shadow-xl shadow-black/[0.02] backdrop-blur-xl sm:min-w-[400px] lg:min-w-[450px] snap-center hover:shadow-2xl transition-all duration-500"
              >
                <div className="mb-6 text-orange-500 text-3xl select-none opacity-20 group-hover:opacity-100 transition-opacity">&ldquo;</div>
                <p className="flex-1 text-base italic leading-relaxed text-black/70">
                  {item.quote}
                </p>
                <div className="mt-8 flex items-center gap-4 border-t border-black/5 pt-8">
                  <div className="h-10 w-10 flex-shrink-0 rounded-2xl bg-orange-500/10 flex items-center justify-center text-xs font-black text-orange-600 uppercase">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-black">{item.name}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">{item.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          {/* Subtle Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="h-1 w-8 rounded-full bg-orange-500/20" />
            <div className="h-1 w-2 rounded-full bg-orange-500/10" />
            <div className="h-1 w-2 rounded-full bg-orange-500/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
