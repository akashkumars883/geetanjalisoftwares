'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Clock, ArrowRight, BookOpen } from 'lucide-react';
import BlogImage from '@/components/BlogImage';

function readingTime(content) {
  const words = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogListing({ blogs }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);

  // Dynamically extract unique categories from actual blog data
  const categories = useMemo(() => {
    const list = new Set(['All']);
    blogs.forEach((blog) => {
      if (blog.category) {
        list.add(blog.category.charAt(0).toUpperCase() + blog.category.slice(1).toLowerCase());
      }
    });
    return Array.from(list);
  }, [blogs]);

  // Filter blogs based on search query and category
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    return blogs.filter((blog) => {
      const titleMatch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const excerptMatch = blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      const contentMatch = blog.content?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSearch = titleMatch || excerptMatch || contentMatch;

      if (activeCategory === 'All') {
        return matchesSearch;
      }
      return matchesSearch && blog.category?.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [blogs, searchQuery, activeCategory]);

  const featuredBlog = useMemo(() => {
    if (searchQuery !== '' || activeCategory !== 'All') return null;
    return filteredBlogs[0];
  }, [filteredBlogs, searchQuery, activeCategory]);

  const gridBlogs = useMemo(() => {
    if (featuredBlog) {
      return filteredBlogs.slice(1, visibleCount + 1);
    }
    return filteredBlogs.slice(0, visibleCount);
  }, [filteredBlogs, featuredBlog, visibleCount]);

  const hasMore = filteredBlogs.length > (featuredBlog ? gridBlogs.length + 1 : gridBlogs.length);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-4">
      {/* ── HEADER INTRO ── */}
      <header className="max-w-3xl text-left relative pt-8 sm:pt-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">
          Knowledge Base
        </span>
        <h1 className="mt-4 text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl lg:text-7xl leading-[1.15]">
          Ideas & Guides to <br className="hidden sm:block" /> 
          <span className="text-slate-500 font-normal">grow your business.</span>
        </h1>
        <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
          Master custom website design, modern software engineering, conversion SEO, and ROI-driven marketing with our latest insights.
        </p>
      </header>

      {/* ── FILTER & SEARCH ROW ── */}
      <section className="flex flex-col gap-6 border-b border-black/5 pb-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2" aria-label="Filter by category">
          {categories.map((category) => {
            const isActive = activeCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(9);
                }}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-black/10'
                    : 'border border-black/5 bg-slate-50 text-slate-600 hover:border-black/15 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(9);
            }}
            className="w-full rounded-full border border-black/5 bg-slate-50 py-3.5 pl-11 pr-5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:border-orange-500 focus:bg-white"
          />
        </div>
      </section>

      {/* ── FEATURED BLOG CARD ── */}
      {featuredBlog && (
        <section className="animate-fade-in">
          <Link
            href={`/blogs/${featuredBlog.slug}`}
            className="group grid grid-cols-1 gap-8 rounded-[32px] border border-black/5 bg-slate-50 p-6 sm:p-8 transition-all duration-500 hover:border-black/10 lg:grid-cols-12 lg:gap-12 lg:p-12"
          >
            {/* Image Box */}
            <div className="relative overflow-hidden rounded-[24px] border border-black/5 bg-white lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-[400px]">
              {featuredBlog.image_url ? (
                <BlogImage
                  src={featuredBlog.image_url}
                  alt={featuredBlog.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-[1.03]"
                  priority={true}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-200">
                  <BookOpen size={96} strokeWidth={0.5} />
                </div>
              )}
              {/* Category tag */}
              <div className="absolute left-5 top-5">
                <span className="rounded-xl bg-white/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-900 shadow-sm">
                  {featuredBlog.category || 'Featured'}
                </span>
              </div>
            </div>

            {/* Content Box */}
            <div className="flex flex-col justify-center lg:col-span-5 py-4 space-y-4 lg:space-y-5">
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                <span suppressHydrationWarning={true}>
                  {new Date(featuredBlog.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-200" />
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {readingTime(featuredBlog.content)} MIN READ
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors duration-300 leading-[1.15]">
                {featuredBlog.title}
              </h2>

              <p className="text-sm leading-relaxed text-slate-600 font-normal">
                {featuredBlog.excerpt ||
                  featuredBlog.content?.substring(0, 150).replace(/<[^>]*>/g, '') + '…'}
              </p>

              <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-orange-500/10 flex items-center justify-center text-xs font-semibold text-orange-600 border border-orange-500/10">
                    {featuredBlog.author?.charAt(0) || 'G'}
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-900">{featuredBlog.author || 'Geetanjali Team'}</span>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Author</span>
                  </div>
                </div>

                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 border border-black/5 group-hover:bg-orange-600 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── ALL POSTS GRID ── */}
      <section className="space-y-12">
        {filteredBlogs.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-[32px] border border-black/5 bg-slate-50 p-8 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-slate-400">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="font-semibold text-lg text-slate-900">No articles found</p>
              <p className="text-sm text-slate-500 mt-1">We couldn&apos;t find any articles matching your search query.</p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="rounded-full bg-white border border-black/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-900 transition hover:bg-slate-50"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gridBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group flex flex-col rounded-[32px] border border-black/5 bg-slate-50 p-6 transition-all duration-500 hover:border-black/10 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-black/5 bg-white mb-5">
                  {blog.image_url ? (
                    <BlogImage
                      src={blog.image_url}
                      alt={blog.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-200">
                      <BookOpen size={48} strokeWidth={0.75} />
                    </div>
                  )}
                  {/* Category Pill */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-lg bg-white/95 backdrop-blur-md px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-900 shadow-sm">
                      {blog.category || 'Insights'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      <span suppressHydrationWarning={true}>
                        {new Date(blog.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-200" />
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {readingTime(blog.content)} MIN READ
                      </span>
                    </div>

                    <h3 className="text-lg font-normal tracking-tight leading-[1.25] text-slate-900 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-xs leading-relaxed text-slate-600 line-clamp-2 font-normal">
                      {blog.excerpt ||
                        blog.content?.substring(0, 110).replace(/<[^>]*>/g, '') + '…'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-orange-500/10 flex items-center justify-center text-[10px] font-semibold text-orange-600 border border-orange-500/10">
                        {blog.author?.charAt(0) || 'G'}
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{blog.author || 'Geetanjali Team'}</span>
                    </div>

                    <div className="h-8 w-8 rounded-full bg-white border border-black/5 flex items-center justify-center text-slate-900 group-hover:bg-orange-600 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── LOAD MORE ── */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="flex items-center gap-2.5 rounded-full border border-black/5 bg-slate-50 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-900 transition-all hover:border-black/10 hover:scale-105 active:scale-95 shadow-sm"
          >
            Show More Stories
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
