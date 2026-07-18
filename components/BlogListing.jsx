'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import BlogImage from '@/components/BlogImage';

function readingTime(content) {
  const words = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogListing({ blogs }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);

  const categories = useMemo(() => {
    const list = new Set(['All']);
    blogs.forEach((blog) => {
      if (blog.category) {
        list.add(blog.category.charAt(0).toUpperCase() + blog.category.slice(1).toLowerCase());
      }
    });
    return Array.from(list);
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    return blogs.filter((blog) => {
      const titleMatch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = titleMatch || blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) || blog.content?.toLowerCase().includes(searchQuery.toLowerCase());
      if (activeCategory === 'All') return matchesSearch;
      return matchesSearch && blog.category?.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [blogs, searchQuery, activeCategory]);

  const featuredBlog = useMemo(() => {
    if (searchQuery !== '' || activeCategory !== 'All') return null;
    return filteredBlogs[0];
  }, [filteredBlogs, searchQuery, activeCategory]);

  const gridBlogs = useMemo(() => {
    if (featuredBlog) return filteredBlogs.slice(1, visibleCount + 1);
    return filteredBlogs.slice(0, visibleCount);
  }, [filteredBlogs, featuredBlog, visibleCount]);

  const hasMore = filteredBlogs.length > (featuredBlog ? gridBlogs.length + 1 : gridBlogs.length);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 pt-32 sm:pt-40 bg-background min-h-screen text-foreground">
      {/* ── HEADER INTRO ── */}
      <motion.header 
        initial="initial" animate="animate" variants={stagger}
        className="max-w-7xl text-left relative px-6 mx-auto w-full"
      >
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-12 bg-primary" />
          <span className="font-heading text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/60">Insights</span>
        </motion.div>
        <motion.h1 variants={fadeInUp} className="font-heading text-5xl sm:text-7xl lg:text-[7rem] font-bold uppercase tracking-tighter text-foreground leading-[0.85]">
          KNOWLEDGE <br />
          <span className="text-primary">& INSIGHTS</span>
        </motion.h1>
        <motion.p variants={fadeInUp} className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl font-medium">
          Expert perspectives on web development, SEO strategy, and digital growth — designed to help you make informed business decisions and stay ahead in a competitive landscape.
        </motion.p>
      </motion.header>

      {/* ── FILTER & SEARCH ROW ── */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="flex flex-col gap-6 border-y border-foreground/10 py-8 lg:flex-row lg:items-center lg:justify-between overflow-hidden px-6 mx-auto w-full max-w-7xl"
      >
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide flex-nowrap" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />
            {categories.map((category) => (
              <button key={category} onClick={() => { setActiveCategory(category); setVisibleCount(9); }}
                className={`flex-none px-6 py-3 font-heading text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory.toLowerCase() === category.toLowerCase() ? 'bg-primary text-white' : 'border border-foreground/20 bg-transparent text-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="relative w-full lg:max-w-sm shrink-0">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input type="text" placeholder="Search insights..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(9); }}
            className="w-full border border-foreground/20 bg-transparent py-4 pl-12 pr-6 text-sm text-foreground outline-none focus:border-primary transition-colors"
          />
        </div>
      </motion.section>

      {/* ── FEATURED BLOG CARD ── */}
      {featuredBlog && (
        <div className="px-6 mx-auto w-full max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-primary" />
              <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">Featured</span>
            </div>
            <Link href={`/blogs/${featuredBlog.slug}`} className="group flex flex-col lg:flex-row border border-foreground/10 hover:border-primary transition-colors overflow-hidden">
              {/* Image — full height on desktop */}
              <div className="relative w-full lg:w-[55%] shrink-0 aspect-[4/3] lg:aspect-auto lg:min-h-[420px] bg-foreground/10 overflow-hidden">
                <BlogImage
                  src={featuredBlog.image_url}
                  alt={featuredBlog.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  priority={true}
                />
                {/* Category badge */}
                <div className="absolute left-5 top-5">
                  <span className="bg-background/80 backdrop-blur-sm px-4 py-2 font-heading text-[9px] font-bold uppercase tracking-[0.2em] text-primary border border-foreground/10">
                    {featuredBlog.category || 'Featured'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12 flex-1 bg-foreground/5">
                {/* Author row */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-9 w-9 shrink-0 bg-primary/10 border border-primary/20 flex items-center justify-center font-heading text-sm font-bold text-primary uppercase">
                    {featuredBlog.author?.charAt(0) || 'G'}
                  </div>
                  <div>
                    <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-foreground/80 block">
                      {featuredBlog.author || 'Team Geetanjali'}
                    </span>
                    <span className="font-heading text-[9px] font-bold uppercase tracking-widest text-foreground/40">Author</span>
                  </div>
                </div>

                {/* Title */}
                <div className="flex-1">
                  <h2 className="font-heading text-3xl sm:text-4xl xl:text-5xl font-bold uppercase tracking-tighter leading-[1] text-foreground group-hover:text-primary transition-colors mb-6">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-base font-medium text-foreground/60 leading-relaxed line-clamp-3">
                    {featuredBlog.excerpt || featuredBlog.content?.substring(0, 200).replace(/<[^>]*>/g, '') + '…'}
                  </p>
                </div>

                {/* Footer meta + CTA */}
                <div className="mt-10 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 font-heading text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    <span suppressHydrationWarning={true}>
                      {new Date(featuredBlog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="h-1 w-1 bg-foreground/20 rounded-full" />
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} /> {readingTime(featuredBlog.content)} MIN READ
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 font-heading text-[10px] font-bold uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      )}

      {/* ── ALL POSTS GRID ── */}
      <div className="px-6 mx-auto w-full max-w-7xl">
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {gridBlogs.map((blog, index) => (
            <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}>
              <Link href={`/blogs/${blog.slug}`} className="group flex h-full flex-col border border-foreground/10 bg-foreground/5 p-6 transition-colors hover:border-primary">
                <div className="relative aspect-[16/10] overflow-hidden bg-foreground/10 mb-6">
                  <BlogImage src={blog.image_url} alt={blog.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
                  <div className="absolute left-4 top-4">
                    <span className="bg-background/80 backdrop-blur-xl px-3 py-1.5 font-heading text-[8px] font-bold uppercase tracking-widest text-primary border border-foreground/10">{blog.category || 'Insights'}</span>
                  </div>
                </div>
                <div className="space-y-4 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-6 w-6 bg-primary/10 flex items-center justify-center font-heading text-[10px] font-bold text-primary">{blog.author?.charAt(0) || 'G'}</div>
                    <span className="font-heading text-[9px] font-bold text-foreground/70 uppercase tracking-widest">{blog.author || 'Team Geetanjali'}</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold tracking-tight leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 uppercase">{blog.title}</h3>
                  <p className="text-sm text-foreground/60 line-clamp-2 font-medium flex-1">{blog.excerpt || blog.content?.substring(0, 100).replace(/<[^>]*>/g, '') + '…'}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
                    <div className="flex items-center gap-3 font-heading text-[9px] font-bold uppercase tracking-widest text-foreground/40">
                      <span suppressHydrationWarning={true}>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="h-1 w-1 bg-foreground/20" />
                      <span className="flex items-center gap-1"><Clock size={10} /> {readingTime(blog.content)} MIN</span>
                    </div>
                    <ArrowRight size={16} className="text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>
      </div>

      {/* ── LOAD MORE ── */}
      {hasMore && (
        <div className="flex justify-center pt-12">
          <button onClick={() => setVisibleCount((prev) => prev + 6)}
            className="group flex items-center gap-4 bg-primary px-10 py-5 font-heading text-[12px] font-bold uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95"
          >
            Load More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  );
}
