import React from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Calendar, ArrowLeft, Tag, Clock } from 'lucide-react';
import BlogImage from '@/components/BlogImage';
import SidebarLeadForm from '@/components/SidebarLeadForm';
import Image from 'next/image';
import { cache } from 'react';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
      .limit(3)
  ]);

  const { data: blog, error } = blogRes;
  const { data: recentBlogs } = recentBlogsRes;

  if (error || !blog) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Article Not Found</h1>
        <p className="text-slate-500">The article you&apos;re looking for might have been removed.</p>
        <Link href="/blogs" className="rounded-full bg-slate-900 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-slate-800">
          Back to Insights
        </Link>
      </div>
    );
  }

  const tags = blog.tags || [];
  const wordCount = blog.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24">
      
      {/* ── BACK NAVIGATION BREADCRUMB ── */}
      <nav className="mb-10 sm:mb-12" aria-label="Breadcrumbs">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2.5 rounded-full border border-black/5 bg-slate-50 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600 transition hover:bg-slate-900 hover:text-white hover:scale-105 active:scale-95 shadow-sm"
        >
          <ArrowLeft size={12} />
          Back to Articles
        </Link>
      </nav>

      {/* ── PAGE GRID: article left, sidebar right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] xl:grid-cols-[1fr_380px] gap-12 lg:gap-16 xl:gap-20 items-start">

        {/* ────── LEFT: MAIN ARTICLE ────── */}
        <article className="min-w-0 space-y-12 sm:space-y-16">

          {/* Header */}
          <header className="space-y-6 sm:space-y-8">
            <h1 className="text-3xl font-normal tracking-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.15]">
              {blog.title}
            </h1>

            {/* Smaller details */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-black/5">
              {/* Author details */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 flex-shrink-0 rounded-full bg-orange-500/10 border border-orange-500/10 flex items-center justify-center text-xs font-semibold text-orange-600 uppercase shadow-sm">
                  {blog.author?.charAt(0) || 'G'}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 leading-none">{blog.author || 'Geetanjali Team'}</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">Author</p>
                </div>
              </div>

              {/* Meta metrics */}
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <span className="rounded-lg bg-orange-500/10 border border-orange-500/10 px-2.5 py-1 text-orange-600 font-semibold tracking-wider">
                  {blog.category || 'Insights'}
                </span>
                <span suppressHydrationWarning={true} className="flex items-center gap-1">
                  <Calendar size={11} />
                  {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-200" />
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {readTime} MIN READ
                </span>
              </div>
            </div>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-base text-slate-600 leading-relaxed border-l-[3px] border-orange-500 pl-6 sm:text-lg font-normal">
                {blog.excerpt}
              </p>
            )}
          </header>

          {/* Cover image */}
          {blog.image_url && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[36px] border border-black/5 bg-slate-50 shadow-sm">
              <BlogImage
                src={blog.image_url}
                alt={blog.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
              />
            </div>
          )}

          {/* Body content */}
          <div
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none 
              prose-headings:font-normal prose-headings:text-slate-900 prose-headings:tracking-tight
              prose-headings:mt-10 prose-headings:mb-4
              prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mt-3 prose-p:mb-5
              prose-a:text-orange-600 prose-a:font-semibold prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-orange-700
              prose-strong:text-slate-900 prose-strong:font-semibold
              prose-blockquote:border-l-[3px] prose-blockquote:border-orange-500 prose-blockquote:bg-orange-500/5 prose-blockquote:rounded-r-2xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
              prose-img:rounded-[28px] prose-img:border prose-img:border-black/5 prose-img:shadow-sm
              prose-code:text-slate-900 prose-code:bg-slate-100 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
              prose-pre:rounded-2xl prose-pre:bg-slate-900 prose-pre:text-white prose-pre:border prose-pre:border-black/10
              prose-ul:text-slate-600 prose-ol:text-slate-600 prose-li:my-1.5
              prose-hr:border-black/5"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-black/5">
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={13} className="text-slate-400 shrink-0" />
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-xl border border-black/5 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:border-black/10 transition-colors duration-200 cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* ────── RIGHT: SIDEBAR ────── */}
        <aside className="lg:sticky lg:top-24 space-y-8 border-t border-black/5 pt-10 lg:border-t-0 lg:pt-0 lg:pl-6 pb-4">

          {/* 1. Recommended Posts List */}
          <div className="space-y-5">
            <div className="pb-4 border-b border-black/5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Read Next
              </p>
              <h2 className="text-lg font-semibold text-slate-900">Recommended</h2>
            </div>

            <div className="space-y-4">
              {(recentBlogs || []).length === 0 ? (
                <p className="text-xs text-slate-400">No recommended articles found.</p>
              ) : (
                (recentBlogs || []).map((item) => (
                  <Link
                    key={item.id}
                    href={`/blogs/${item.slug}`}
                    className="group flex gap-3 transition items-center"
                  >
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 h-[60px] w-[60px] rounded-2xl overflow-hidden border border-black/5 bg-slate-50">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                          <Tag size={16} strokeWidth={1.5} />
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex flex-col justify-center gap-0.5 min-w-0">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-600">
                        {item.category || 'Insights'}
                      </span>
                      <h3 className="text-xs font-medium text-slate-900 leading-snug line-clamp-2 group-hover:text-orange-600 transition duration-300">
                        {item.title}
                      </h3>
                      <p suppressHydrationWarning={true} className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                        {new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* 2. Embedded Dynamic Strategy Lead Form */}
          <div className="pt-2">
            <SidebarLeadForm />
          </div>

          {/* All articles button */}
          <div className="pt-4 border-t border-black/5">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-orange-600 transition"
            >
              All Articles 
              <ArrowLeft size={13} className="rotate-180 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
