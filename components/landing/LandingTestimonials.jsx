'use client';

import React from 'react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    business: 'Sahaj Hospital, Faridabad',
    rating: 5,
    text: 'Geetanjali Softwares built our hospital website in just 5 days! The design is clean, professional, and our patients love the online booking feature. Highly recommended for any Faridabad business.',
    initial: 'RK',
    color: 'from-blue-100 to-purple-100',
    textColor: 'text-blue-700',
  },
  {
    name: 'Priya Sharma',
    business: 'Sharma Enterprises, Noida',
    rating: 5,
    text: 'We were struggling with our old website for years. Geetanjali team created a modern, fast, and SEO-friendly site. Our organic leads increased by 300% in just 2 months!',
    initial: 'PS',
    color: 'from-emerald-100 to-teal-100',
    textColor: 'text-emerald-700',
  },
  {
    name: 'Amit Verma',
    business: 'Verma Constructions, Delhi',
    rating: 5,
    text: 'Best decision we made. Professional team, clear communication, and on-time delivery. The pricing is very affordable compared to other agencies in Delhi NCR. Thank you for the amazing work!',
    initial: 'AV',
    color: 'from-amber-100 to-orange-100',
    textColor: 'text-amber-700',
  },
];

export default function LandingTestimonials() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            What Our{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Don't take our word for it — hear from our happy clients across Faridabad & Delhi NCR.
          </p>
        </div>

        {/* Google Rating Badge */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-3 shadow-sm">
            <div className="text-2xl">⭐</div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-slate-400">4.9 average from 50+ reviews</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.color} ${testimonial.textColor} text-sm font-bold`}>
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500">{testimonial.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}