import React from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Calendar, ArrowLeft, Share2, Globe, MessageCircle } from 'lucide-react';

export const dynamic = "force-dynamic";

// Use a privileged client since this is a server component
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: blog } = await supabaseAdmin
    .from('blogs')
    .select('title, excerpt, image_url, tags, created_at')
    .eq('slug', slug)
    .single();

  if (!blog) return { title: 'Blog Not Found' };

  const url = `https://www.geetanjalisoftwares.in/blogs/${slug}`;
  const description = blog.excerpt || 'Read the latest insights from Geetanjali Softwares.';

  return {
    title: `${blog.title} | Geetanjali Softwares`,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description: description,
      url: url,
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
      description: description,
      images: blog.image_url ? [blog.image_url] : [],
    },
    keywords: blog.tags?.join(', ') || 'software development, web design, digital marketing',
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const { data: blog, error } = await supabaseAdmin
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  // Fetch latest articles for the "Read More" section
  const { data: latestBlogs } = await supabaseAdmin
    .from('blogs')
    .select('id, title, slug, image_url, created_at, category')
    .neq('slug', slug) // Exclude current blog
    .order('created_at', { ascending: false })
    .limit(3);

  if (error || !blog) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold text-black">Article Not Found</h1>
        <p className="text-black/40 text-lg">The article you're looking for might have been removed or moved.</p>
        <Link 
          href="/blogs" 
          className="rounded-xl bg-orange-500 px-8 py-3 font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600"
        >
          Back to Insights
        </Link>
      </div>
    );
  }

  const tags = blog.tags || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <article className="py-12 sm:py-20 max-w-4xl mx-auto">
        <Link 
          href="/blogs" 
          className="inline-flex items-center gap-2 text-sm font-bold text-black/40 transition hover:text-black mb-12 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Insights
        </Link>

        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-600">
              {blog.category || 'Insights'}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-black/30 flex items-center gap-1.5">
              <Calendar size={12} /> {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl leading-[1.1]">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-3 pt-4 border-t border-black/5">
             <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
               {blog.author?.charAt(0) || 'A'}
             </div>
             <div>
                <p className="text-sm font-bold text-black leading-none">{blog.author || 'Admin'}</p>
                <p className="text-[10px] font-bold text-black/30 uppercase tracking-wider mt-1">Written by Geetanjali Expert</p>
             </div>
          </div>
        </div>

        {blog.image_url && (
          <div className="relative aspect-video overflow-hidden rounded-[40px] border border-black/5 mb-16 shadow-2xl shadow-black/5 bg-stone-50">
            <img 
              src={blog.image_url} 
              alt={blog.title} 
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                e.target.parentElement.innerHTML = '<div class="text-black/5"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>';
              }}
            />
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_80px] gap-12">
          <div 
            className="prose prose-orange prose-lg max-w-none text-black/80 prose-headings:font-bold prose-a:text-orange-500 hover:prose-a:text-orange-600 prose-img:rounded-3xl prose-img:shadow-xl prose-li:marker:text-orange-500"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="hidden lg:flex flex-col gap-6 sticky top-32 h-fit">
             <div className="text-[10px] font-bold uppercase tracking-wider text-black/30 mb-2">Share</div>
             <button className="h-12 w-12 rounded-2xl border border-black/5 bg-white flex items-center justify-center text-black/40 transition hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/30">
                <MessageCircle size={20} />
             </button>
             <button className="h-12 w-12 rounded-2xl border border-black/5 bg-white flex items-center justify-center text-black/40 transition hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/30">
                <Globe size={20} />
             </button>
             <button className="h-12 w-12 rounded-2xl border border-black/5 bg-white flex items-center justify-center text-black/40 transition hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/30">
                <Share2 size={20} />
             </button>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-black/5">
             <div className="flex flex-wrap gap-2">
                <span className="text-sm font-bold text-black/30 mr-2 self-center">Tags:</span>
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-stone-100 px-4 py-1.5 text-xs font-bold text-black/50 transition hover:bg-orange-500/10 hover:text-orange-600">
                    #{tag}
                  </span>
                ))}
             </div>
          </div>
        )}
      </article>

      {/* Latest Articles Section */}
      {latestBlogs && latestBlogs.length > 0 && (
        <section className="py-20 border-t border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-black">Read <span className="text-orange-500">Latest Articles</span></h2>
              <Link href="/blogs" className="text-sm font-bold text-black/40 hover:text-orange-500 transition">View All Insights</Link>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {latestBlogs.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/blogs/${item.slug}`}
                  className="group flex flex-col gap-4"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] border border-black/5 bg-black/5">
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-black/10">
                        <Tag size={32} />
                      </div>
                    )}
                  </div>
                  <div className="px-1 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600">{item.category || 'Insights'}</p>
                    <h3 className="text-lg font-bold text-black leading-tight group-hover:text-orange-500 transition line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
