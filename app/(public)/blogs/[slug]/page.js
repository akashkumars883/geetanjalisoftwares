import React from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Calendar, ArrowLeft, Tag, Clock } from 'lucide-react';
import BlogImage from '@/components/BlogImage';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

import { cache } from 'react';

// Memoize the blog fetch to share between metadata and page
const getBlog = cache(async (slug) => {
  return await supabaseAdmin
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();
});

export const revalidate = 3600; // Revalidate every hour
 
 export async function generateStaticParams() {
   const { data: blogs } = await supabaseAdmin
     .from('blogs')
     .select('slug');
 
   return blogs?.map((blog) => ({
     slug: blog.slug,
   })) || [];
 }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: blog } = await getBlog(slug);

  if (!blog) return { title: 'Blog Not Found' };

  const url = `https://www.geetanjalisoftwares.in/blogs/${slug}`;
  const title = (blog.title || '').slice(0, 60);
  const description = (blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Read the latest insights from Geetanjali Softwares.').slice(0, 160);

  return {
    title: `${title} | Geetanjali Softwares`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: title,
      description,
      url,
      siteName: 'Geetanjali Softwares',
      images: blog.image_url ? [{ url: blog.image_url, width: 1200, height: 630 }] : [],
      locale: 'en_US',
      type: 'article',
      publishedTime: blog.created_at,
      authors: ['Geetanjali Softwares'],
      tags: blog.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description,
      images: blog.image_url ? [blog.image_url] : [],
    },
    keywords: blog.tags?.join(', ') || 'software development, web design, digital marketing',
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  // Fetch data in parallel
  const [blogRes, recentBlogsRes] = await Promise.all([
    getBlog(slug),
    supabaseAdmin
      .from('blogs')
      .select('id, title, slug, image_url, created_at, category, excerpt')
      .neq('slug', slug)
      .order('created_at', { ascending: false })
      .limit(5)
  ]);

  const { data: blog, error } = blogRes;
  const { data: recentBlogs } = recentBlogsRes;

  if (error || !blog) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl font-bold text-black">Article Not Found</h1>
        <p className="text-black/40">The article you&apos;re looking for might have been removed.</p>
        <Link href="/blogs" className="rounded-lg bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-black/80">
          Back to Insights
        </Link>
      </div>
    );
  }

  const tags = blog.tags || [];
  const wordCount = blog.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12">

      {/* ── PAGE GRID: article left, sidebar right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-10 xl:gap-14 items-start">

        {/* ────── LEFT: ARTICLE ────── */}
        <article className="min-w-0">

          {/* Header */}
          <header className="mb-6 sm:mb-10 space-y-4 sm:space-y-6">

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="rounded-lg border border-black/8 bg-black/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-black/55 shadow-sm">
                {blog.category || 'Insights'}
              </span>
              <span suppressHydrationWarning={true} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/30">
                <Calendar size={12} strokeWidth={2} />
                {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/30">
                <Clock size={12} strokeWidth={2} />
                {readTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-5xl xl:text-6xl">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-lg text-black/50 leading-relaxed border-l-[3px] border-orange-500/20 pl-6 sm:text-xl font-medium italic">
                {blog.excerpt}
              </p>
            )}

            {/* Author */}
            <div className="flex items-center gap-4 pt-2">
              <div className="h-11 w-11 flex-shrink-0 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-sm font-black text-orange-600 uppercase shadow-sm">
                {blog.author?.charAt(0) || 'A'}
              </div>
              <div>
                <p className="text-base font-bold text-black leading-tight">{blog.author || 'Admin'}</p>
                <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mt-0.5">Geetanjali Softwares Team</p>
              </div>
            </div>
          </header>

          {/* Cover image */}
          {blog.image_url && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] border border-black/5 bg-stone-50 mb-10 lg:mb-14 shadow-xl shadow-black/5">
              <BlogImage
                src={blog.image_url}
                alt={blog.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          )}

          {/* Body content */}
          <div
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none 
              prose-headings:font-bold prose-headings:text-black prose-headings:tracking-tight
              prose-headings:mt-6 prose-headings:mb-2
              prose-p:text-black/70 prose-p:leading-relaxed prose-p:mt-2 prose-p:mb-2
              prose-a:text-black prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-black/60
              prose-strong:text-black prose-strong:font-bold
              prose-blockquote:border-l-2 prose-blockquote:border-black/15 prose-blockquote:bg-black/[0.02] prose-blockquote:rounded-lg prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic
              prose-img:rounded-[24px] prose-img:border prose-img:border-black/5 prose-img:shadow-lg prose-img:shadow-black/5
              prose-code:text-black prose-code:bg-black/5 prose-code:rounded prose-code:px-1
              prose-pre:rounded-lg prose-pre:bg-black/5 prose-pre:border prose-pre:border-black/8
              prose-ul:text-black/70 prose-ol:text-black/70 prose-li:my-0.5
              prose-hr:border-black/8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-10 pt-7 border-t border-black/5">
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={12} className="text-black/25" />
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-black/8 bg-black/[0.03] px-3 py-1 text-xs font-bold text-black/45"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* ────── RIGHT: SIDEBAR ────── */}
        <aside className="lg:sticky lg:top-24 space-y-5">

          {/* Sidebar header */}
          <div className="pb-4 border-b border-black/6">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/30 mb-0.5">
              Recent Articles
            </p>
            <h2 className="text-base font-bold text-black">More to read</h2>
          </div>

          {/* Article list */}
          <div className="divide-y divide-black/5">
            {(recentBlogs || []).length === 0 ? (
              <p className="py-4 text-sm text-black/30">No other articles yet.</p>
            ) : (
              (recentBlogs || []).map((item) => (
                <Link
                  key={item.id}
                  href={`/blogs/${item.slug}`}
                  className="group flex gap-3 py-4 transition"
                >
                  {/* Thumbnail */}
                  <div className="flex-shrink-0 h-[60px] w-[60px] sm:h-16 sm:w-16 rounded-lg overflow-hidden border border-black/5 bg-stone-50">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-black/10">
                        <Tag size={18} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center gap-0.5 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/25">
                      {item.category || 'Insights'}
                    </p>
                    <h3 className="text-sm font-bold text-black leading-snug line-clamp-2 group-hover:text-orange-600 transition">
                      {item.title}
                    </h3>
                    <p suppressHydrationWarning={true} className="text-[10px] text-black/30">
                      {new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* View all */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-black/35 hover:text-orange-600 transition"
          >
            View all articles →
          </Link>
        </aside>
      </div>
    </div>
  );
}
