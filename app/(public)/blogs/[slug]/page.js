import React from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Calendar, ArrowLeft, Tag, Clock } from 'lucide-react';
import BlogImage from '@/components/BlogImage';
import SidebarLeadForm from '@/components/SidebarLeadForm';
import Image from 'next/image';
import { cache } from 'react';
import { SITE_URL, founder } from '@/lib/seo';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const getBlog = cache(async (slug) => {
  return await supabaseAdmin
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();
});

export const revalidate = 3600;

function shouldSkipNextImageOptimization(src) {
  if (!src) return true;
  if (src.startsWith("/")) return true;
  return (
    src.includes("supabase.co") ||
    src.includes("unsplash.com") ||
    src.includes("pixabay.com")
  );
}
 
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
      authors: [founder.name],
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center bg-background text-foreground">
        <h1 className="font-heading text-5xl font-bold uppercase tracking-tighter">Article Not Found</h1>
        <p className="text-foreground/70 font-medium">The article you&apos;re looking for might have been removed.</p>
        <Link href="/blogs" className="group relative inline-flex items-center justify-center gap-4 overflow-hidden bg-primary px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white transition-transform duration-300 hover:scale-105 active:scale-95">
          <span className="relative z-10">Back to Insights</span>
        </Link>
      </div>
    );
  }

  const tags = blog.tags || [];
  const wordCount = blog.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const updatedAt = blog.updated_at || blog.created_at;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt || undefined,
    image: blog.image_url ? [blog.image_url] : undefined,
    datePublished: blog.created_at,
    dateModified: updatedAt,
    wordCount,
    author: {
      "@type": "Person",
      name: founder.name,
      url: founder.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Geetanjali Softwares",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blogs/${slug}`,
  };

  let mainContent = blog.content || '';
  const faqItems = [];
  const faqHeadingIndex = mainContent.search(/<h2[^>]*>(?:Frequently Asked Questions|FAQ)<\/h2>/i);
  if (faqHeadingIndex !== -1) {
    mainContent = blog.content.substring(0, faqHeadingIndex);
    const faqHtml = blog.content.substring(faqHeadingIndex);
    const faqRegex = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
    let match;
    while ((match = faqRegex.exec(faqHtml)) !== null) {
      faqItems.push({
        question: match[1].replace(/<[^>]*>/g, '').trim(),
        answer: match[2].trim()
      });
    }
  }

  return (
    <div className="bg-background min-h-screen text-foreground pb-24 pt-32 sm:pt-40">
      <div className="max-w-7xl mx-auto px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        
        {/* ── BACK NAVIGATION ── */}
        <nav className="mb-12" aria-label="Breadcrumbs">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-3 border border-foreground/20 bg-transparent px-5 py-3 font-heading text-[10px] font-bold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary active:scale-95"
          >
            <ArrowLeft size={14} />
            Back to Articles
          </Link>
        </nav>

        {/* ── PAGE GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] xl:grid-cols-[1fr_380px] gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* ────── LEFT: MAIN ARTICLE ────── */}
          <article className="min-w-0 space-y-12 sm:space-y-16">

            {/* Header */}
            <header className="space-y-8 border-b border-foreground/10 pb-8">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-tight text-foreground">
                {blog.title}
              </h1>

              {/* Smaller details */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-foreground/10">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 flex-shrink-0 bg-primary/10 flex items-center justify-center font-heading text-sm font-bold text-primary uppercase">
                    {founder.name.charAt(0)}
                  </div>
                  <div>
                    <Link href="/authors/akash" className="font-heading text-[12px] font-bold text-foreground leading-none hover:text-primary transition-colors uppercase tracking-widest">
                      {founder.name}
                    </Link>
                    <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mt-1.5">Founder</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  <span className="bg-primary/10 px-3 py-1.5 text-primary border border-primary/20">
                    {blog.category || 'Insights'}
                  </span>
                  <span suppressHydrationWarning={true} className="flex items-center gap-2">
                    <Calendar size={12} />
                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="h-1 w-1 bg-foreground/20" />
                  <span className="flex items-center gap-2">
                    <Clock size={12} />
                    {readTime} MIN READ
                  </span>
                </div>
              </div>

              {blog.excerpt && (
                <p className="text-lg text-foreground/80 leading-relaxed border-l-[3px] border-primary pl-6 font-medium">
                  {blog.excerpt}
                </p>
              )}
            </header>

            {/* Cover image */}
            {blog.image_url && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-foreground/5 border border-foreground/10">
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
                prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-headings:text-foreground prose-headings:tracking-tight
                prose-headings:mt-12 prose-headings:mb-6
                prose-p:text-foreground/80 prose-p:font-medium prose-p:leading-relaxed prose-p:mt-4 prose-p:mb-6
                prose-a:text-primary prose-a:font-bold prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-white
                prose-strong:text-foreground prose-strong:font-bold
                prose-blockquote:border-l-[3px] prose-blockquote:border-primary prose-blockquote:bg-foreground/5 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:not-italic prose-blockquote:text-foreground/90
                prose-img:border prose-img:border-foreground/10 prose-img:bg-foreground/5
                prose-code:text-primary prose-code:bg-foreground/5 prose-code:rounded-none prose-code:px-2 prose-code:py-1
                prose-pre:rounded-none prose-pre:bg-foreground/5 prose-pre:text-foreground prose-pre:border prose-pre:border-foreground/10
                prose-ul:text-foreground/80 prose-ol:text-foreground/80 prose-li:my-2 prose-li:font-medium
                prose-hr:border-foreground/10"
              dangerouslySetInnerHTML={{ __html: mainContent }}
            />

            {/* Dynamic Interactive FAQ Accordion */}
            {faqItems.length > 0 && (
              <div className="mt-16 pt-12 border-t border-foreground/10">
                <div className="max-w-2xl mb-10">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary mb-4">Got Questions?</p>
                  <h2 className="font-heading text-3xl font-bold uppercase tracking-tighter text-foreground sm:text-4xl">
                    Frequently Asked Questions
                  </h2>
                </div>
                
                <div className="border border-foreground/10 bg-foreground/5 p-8 space-y-6">
                  {faqItems.map((item, index) => (
                    <details 
                      key={index} 
                      className="group border-b border-foreground/10 pb-6 last:border-0 last:pb-0 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 text-foreground list-none outline-none select-none hover:text-primary transition-colors">
                        <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-left">
                          {item.question}
                        </h3>
                        <span className="text-primary group-open:rotate-45 transition-transform duration-300 shrink-0">+</span>
                      </summary>
                      <div 
                        className="mt-6 text-base font-medium leading-relaxed text-foreground/70 text-left pl-4 border-l-2 border-primary/30 prose-p:my-2"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-16 pt-10 border-t border-foreground/10">
                <div className="flex flex-wrap items-center gap-3">
                  <Tag size={16} className="text-foreground/40 shrink-0" />
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-foreground/20 bg-transparent px-4 py-2 font-heading text-[10px] font-bold uppercase tracking-widest text-foreground/60 hover:text-primary hover:border-primary transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ────── RIGHT: SIDEBAR ────── */}
          <aside className="lg:sticky lg:top-32 space-y-12 border-t border-foreground/10 pt-12 lg:border-t-0 lg:pt-0 lg:pl-10">

            {/* 1. Recommended Posts List */}
            <div className="space-y-6">
              <div className="pb-4 border-b border-foreground/10">
                <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Read Next</p>
                <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">Recommended</h2>
              </div>

              <div className="space-y-6">
                {(recentBlogs || []).length === 0 ? (
                  <p className="text-sm text-foreground/40 font-medium">No recommended articles found.</p>
                ) : (
                  (recentBlogs || []).map((item) => (
                    <Link
                      key={item.id}
                      href={`/blogs/${item.slug}`}
                      className="group flex gap-4 transition items-center"
                    >
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 h-[70px] w-[70px] overflow-hidden border border-foreground/10 bg-foreground/5">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            width={70}
                            height={70}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            unoptimized={shouldSkipNextImageOptimization(item.image_url)}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-foreground/20">
                            <Tag size={18} strokeWidth={1.5} />
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex flex-col justify-center gap-1.5 min-w-0">
                        <span className="font-heading text-[9px] font-bold uppercase tracking-widest text-primary">
                          {item.category || 'Insights'}
                        </span>
                        <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p suppressHydrationWarning={true} className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest mt-0.5">
                          {new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* 2. Embedded Dynamic Strategy Lead Form */}
            <div className="pt-4">
              <SidebarLeadForm />
            </div>

            {/* 3. Related Services Widget */}
            <div className="space-y-6 pt-10 border-t border-foreground/10">
              <div>
                <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Need Support?</p>
                <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">Our Services</h2>
              </div>
              
              <div className="flex flex-col gap-4">
                <Link 
                  href="/services/website-design-development" 
                  className="group flex items-center justify-between p-5 border border-foreground/10 bg-foreground/5 hover:border-primary transition-colors"
                >
                  <div className="text-left">
                    <span className="block font-heading text-sm font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">Web Development</span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mt-1.5">Custom applications</span>
                  </div>
                  <ArrowLeft size={16} className="rotate-180 text-foreground/40 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </Link>

                <Link 
                  href="/services/digital-marketing/seo" 
                  className="group flex items-center justify-between p-5 border border-foreground/10 bg-foreground/5 hover:border-primary transition-colors"
                >
                  <div className="text-left">
                    <span className="block font-heading text-sm font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">SEO & Search Growth</span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mt-1.5">Rank #1 on Google</span>
                  </div>
                  <ArrowLeft size={16} className="rotate-180 text-foreground/40 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </Link>

                <Link 
                  href="/services/website-design-development/website-redesign" 
                  className="group flex items-center justify-between p-5 border border-foreground/10 bg-foreground/5 hover:border-primary transition-colors"
                >
                  <div className="text-left">
                    <span className="block font-heading text-sm font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">UI/UX Redesign</span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mt-1.5">Modern layout refresh</span>
                  </div>
                  <ArrowLeft size={16} className="rotate-180 text-foreground/40 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* All articles button */}
            <div className="pt-8 border-t border-foreground/10">
              <Link
                href="/blogs"
                className="group inline-flex items-center gap-3 font-heading text-[10px] font-bold uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors"
              >
                All Articles 
                <ArrowLeft size={14} className="rotate-180 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
