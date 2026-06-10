'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
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
    <div className="space-y-12 sm:space-y-20 pb-20 pt-4 sm:pt-8">
      {/* ── HEADER INTRO ── */}
      <motion.header 
        initial="initial" animate="animate" variants={stagger}
        className="max-w-4xl text-left relative pt-4 sm:pt-12"
      >
        <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
          <div className="h-1 w-10 bg-orange-600 rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Insights</span>
        </motion.div>
        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-900 leading-[1.15]">
          Knowledge-driven insights for <br className="hidden sm:block" /><span className="text-slate-500">digital decision-makers.</span>
        </motion.h1>
        <motion.p variants={fadeInUp} className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Expert perspectives on web development, SEO strategy, and digital growth — designed to help you make informed business decisions and stay ahead in a competitive landscape.
        </motion.p>
      </motion.header>

      {/* ── FILTER & SEARCH ROW ── */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="flex flex-col gap-6 border-b border-black/5 pb-8 lg:flex-row lg:items-center lg:justify-between overflow-hidden"
      >
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide flex-nowrap" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />
            {categories.map((category) => (
              <button key={category} onClick={() => { setActiveCategory(category); setVisibleCount(9); }}
                className={`flex-none rounded-xl px-5 py-2 text-[10px] font-bold uppercase tracking-wider transition-all active:scale-95 whitespace-nowrap ${
                  activeCategory.toLowerCase() === category.toLowerCase() ? 'bg-orange-600 text-white' : 'border border-black/5 bg-white text-slate-500 hover:text-orange-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="relative w-full lg:max-w-xs shrink-0">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(9); }}
            className="w-full rounded-xl border border-black/5 bg-white py-3 pl-11 pr-5 text-sm text-slate-900 outline-none focus:border-orange-600/30"
          />
        </div>
      </motion.section>

      {/* ── FEATURED BLOG CARD ── */}
      {featuredBlog && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Link href={`/blogs/${featuredBlog.slug}`} className="group grid grid-cols-1 gap-6 sm:gap-8 rounded-[32px] border border-black/5 bg-white p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
            <div className="relative overflow-hidden rounded-[24px] bg-slate-50 lg:col-span-6 aspect-[16/9] lg:h-[300px]">
              <BlogImage src={featuredBlog.image_url} alt={featuredBlog.title} className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-[1.03]" priority={true} />
              <div className="absolute left-4 top-4">
                <span className="rounded-lg bg-white/90 backdrop-blur-md px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-slate-900">{featuredBlog.category || 'Featured'}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-600/5 flex items-center justify-center text-[10px] font-bold text-orange-600">{featuredBlog.author?.charAt(0) || 'G'}</div>
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">{featuredBlog.author || 'Team Geetanjali'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors leading-[1.2]">{featuredBlog.title}</h2>
              <p className="text-sm text-slate-500 line-clamp-2">{featuredBlog.excerpt || featuredBlog.content?.substring(0, 150).replace(/<[^>]*>/g, '') + '…'}</p>
              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                <span suppressHydrationWarning={true}>{new Date(featuredBlog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="h-1 w-1 rounded-full bg-slate-200" />
                <span className="flex items-center gap-1"><Clock size={11} /> {readingTime(featuredBlog.content)} MIN READ</span>
              </div>
            </div>
          </Link>
        </motion.section>
      )}

      {/* ── ALL POSTS GRID ── */}
      <section className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {gridBlogs.map((blog, index) => (
          <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}>
            <Link href={`/blogs/${blog.slug}`} className="group flex h-full flex-col rounded-[24px] border border-black/5 bg-white p-5 transition-all hover:border-orange-600/20 hover:-translate-y-1">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-slate-50 mb-5">
                <BlogImage src={blog.image_url} alt={blog.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
                <div className="absolute left-3 top-3">
                  <span className="rounded-lg bg-white/95 backdrop-blur-md px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-slate-900">{blog.category || 'Insights'}</span>
                </div>
              </div>
              <div className="space-y-4 flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-orange-600/5 flex items-center justify-center text-[8px] font-bold text-orange-600">{blog.author?.charAt(0) || 'G'}</div>
                  <span className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">{blog.author || 'Team Geetanjali'}</span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight leading-[1.3] text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">{blog.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 font-normal flex-1">{blog.excerpt || blog.content?.substring(0, 100).replace(/<[^>]*>/g, '') + '…'}</p>
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    <span suppressHydrationWarning={true}>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-200" />
                    <span className="flex items-center gap-1"><Clock size={9} /> {readingTime(blog.content)} MIN</span>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ── LOAD MORE ── */}
      {hasMore && (
        <div className="flex justify-center pt-6 sm:pt-10">
          <button onClick={() => setVisibleCount((prev) => prev + 6)}
            className="group flex items-center gap-3 rounded-xl bg-slate-900 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-orange-600 hover:-translate-y-1"
          >
            Load More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  );
}
