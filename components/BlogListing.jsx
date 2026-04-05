'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';

function readingTime(content) {
  const words = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogListing({ blogs }) {
  const [visibleCount, setVisibleCount] = useState(15);

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex h-80 flex-col items-center justify-center rounded-2xl border border-black/5 bg-[#fcfcfc] text-black/30 space-y-3">
        <Tag size={40} strokeWidth={1} />
        <p className="font-bold text-lg">No articles discovered yet.</p>
        <p className="text-sm opacity-60">Our writers are working on something special.</p>
      </div>
    );
  }

  // Split blogs for the new layout
  const heroBlogs = blogs.slice(0, 5);
  const featuredMain = heroBlogs[0];
  const featuredSide = heroBlogs.slice(1, 5);
  
  const trendingBlogs = blogs.slice(5, 9);
  const recentBlogs = blogs.slice(9, visibleCount);
  const hasMore = visibleCount < blogs.length;

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      
      {/* ── SECTION 1: HERO GRID ── */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Large Card (Left) */}
          {featuredMain && (
            <div className="lg:col-span-2">
              <Link
                href={`/blogs/${featuredMain.slug}`}
                className="group relative flex h-[400px] sm:h-[500px] lg:h-[600px] w-full flex-col overflow-hidden rounded-lg bg-stone-900 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                {featuredMain.image_url ? (
                  <img
                    src={featuredMain.image_url}
                    alt={featuredMain.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-1000 group-hover:scale-105 group-hover:opacity-60"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/5 opacity-50">
                    <Tag size={120} strokeWidth={0.5} />
                  </div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Content */}
                <div className="relative mt-auto p-6 sm:p-10 lg:p-12 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-orange-500 px-4 py-1.5 text-[8px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20">
                      Top Choice
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-white/60">
                      {new Date(featuredMain.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-white transition duration-300 group-hover:translate-x-1">
                    {featuredMain.title}
                  </h1>
                  
                  <div className="flex items-center gap-2 pt-2 text-xs font-black uppercase tracking-widest text-white/50 group-hover:text-white transition">
                    Explore Article <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Side Grid (Right - 2x2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {featuredSide.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group relative flex h-[180px] sm:h-[190px] lg:h-[139px] w-full flex-col overflow-hidden rounded-[24px] bg-stone-900"
              >
                {blog.image_url && (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-40"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative mt-auto p-5 space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-400">
                        {blog.category || 'Insights'}
                    </span>
                  <h3 className="text-sm sm:text-base font-bold leading-tight text-white line-clamp-2 group-hover:text-orange-100 transition">
                    {blog.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TRENDING (4 Column Overlay Grid) ── */}
      {trendingBlogs.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-black/5 pb-6">
            <div className="flex items-center gap-4">
                <div className="h-2 w-12 bg-orange-500 rounded-full" />
                <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight uppercase">Trending</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-[28px] bg-stone-100 transition-all duration-300 hover:-translate-y-1"
              >
                {blog.image_url ? (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-black/5">
                        <Tag size={64} strokeWidth={0.5} />
                    </div>
                )}
                
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="mb-2 text-[9px] font-black uppercase tracking-widest text-orange-400">
                    {blog.category || 'Analysis'}
                  </span>
                  <h3 className="text-lg font-bold leading-[1.2] text-white group-hover:text-orange-100 transition">
                    {blog.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-white/50">
                    <Calendar size={11} /> 
                    {new Date(blog.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── SECTION 3: RECENT (Standard Cards) ── */}
      {recentBlogs.length > 0 && (
        <section className="space-y-10">
          <div className="flex items-center justify-between border-b border-black/5 pb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-black/40 tracking-widest uppercase">Latest Updates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {recentBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group flex flex-col space-y-5"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-black/5 bg-stone-50">
                  {blog.image_url ? (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-black/5">
                      <Tag size={48} strokeWidth={1} />
                    </div>
                  )}
                  {/* Category */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-lg bg-white/90 backdrop-blur-md px-3 py-1 text-[9px] font-black uppercase tracking-widest text-black shadow-sm">
                      {blog.category || 'Insights'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-3 px-1">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-black/30 uppercase tracking-widest">
                    <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="h-1 w-1 rounded-full bg-black/20" />
                    <span className="flex items-center gap-1"><Clock size={11} /> {readingTime(blog.content)} MIN</span>
                  </div>

                  <h3 className="text-xl font-bold leading-tight text-black group-hover:text-orange-600 transition duration-300">
                    {blog.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-black/60 line-clamp-2 font-medium">
                    {blog.excerpt || blog.content?.substring(0, 140).replace(/<[^>]*>/g, '') + '…'}
                  </p>
                  
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-black text-orange-600">
                            {blog.author?.charAt(0) || 'G'}
                        </div>
                        <span className="text-xs font-bold text-black/80">{blog.author || 'Geetanjali Team'}</span>
                    </div>
                    <ChevronRight size={18} className="text-black/20 transition-transform group-hover:translate-x-1 group-hover:text-orange-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── LOAD MORE ── */}
      {hasMore && (
        <div className="flex justify-center pt-10">
          <button
            onClick={() => setVisibleCount(prev => prev + 9)}
            className="flex items-center gap-3 rounded-full border-2 border-black/5 bg-white px-10 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white hover:scale-105 active:scale-95 shadow-xl shadow-black/5"
          >
            Show More Stories
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
