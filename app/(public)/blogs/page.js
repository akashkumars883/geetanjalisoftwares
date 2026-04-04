import React from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Blog | Geetanjali Softwares',
  description: 'Insights, guides, and updates from the team at Geetanjali Softwares.',
};

export default async function BlogsPage() {
  const { data: blogs, error } = await supabaseAdmin
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
  }

  const featuredBlog = blogs?.[0];
  const recentBlogs = blogs?.slice(1, 10) || [];

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 space-y-4 text-center sm:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-7xl">
          Insights & <span className="text-orange-500 italic">Updates</span>
        </h1>
        <p className="max-w-2xl text-lg text-black/50">
          Expert advice, industry trends, and strategic insights from the Geetanjali Softwares team.
        </p>
      </div>

      {!blogs || blogs.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-[40px] border border-black/5 bg-[#fcfcfc] text-black/30">
          <p className="font-medium">No articles published yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-20">
          {/* Featured Article */}
          {featuredBlog && (
            <Link 
              href={`/blogs/${featuredBlog.slug}`}
              className="group relative block w-full overflow-hidden rounded-[40px] border border-black/5 bg-white shadow-2xl shadow-black/5 ring-1 ring-black/5 transition-all duration-500 hover:shadow-orange-500/10"
            >
              <div className="relative aspect-[21/9] w-full bg-black/5 overflow-hidden">
                {featuredBlog.image_url ? (
                  <img 
                    src={featuredBlog.image_url} 
                    alt={featuredBlog.title} 
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-stone-50 text-black/5">
                    <Tag size={120} />
                  </div>
                )}
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-16">
                  <div className="max-w-3xl space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                        Featured Article
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                        <Calendar size={12} /> {new Date(featuredBlog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1] group-hover:text-orange-400 transition">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-lg text-white/70 line-clamp-2 max-w-2xl hidden sm:block">
                      {featuredBlog.excerpt || featuredBlog.content?.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}
                    </p>
                    <div className="pt-4 flex items-center gap-2 text-sm font-bold text-white group-hover:gap-4 transition-all">
                      Read Full Story <ArrowRight size={18} className="text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Recent Articles Grid */}
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-black/5 pb-6">
              <h2 className="text-2xl font-bold text-black tracking-tight flex items-center gap-3">
                Recent <span className="text-orange-500">Articles</span>
              </h2>
            </div>
            
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {recentBlogs.map((blog) => (
                <Link 
                  key={blog.id} 
                  href={`/blogs/${blog.slug}`}
                  className="group flex flex-col gap-6"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] border border-black/5 bg-black/5 shadow-sm transition duration-500 group-hover:shadow-xl group-hover:shadow-black/5">
                    {blog.image_url ? (
                      <img 
                        src={blog.image_url} 
                        alt={blog.title} 
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-black/10">
                        <Tag size={48} />
                      </div>
                    )}
                    <div className="absolute left-6 top-6">
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-lg">
                        {blog.category || 'General'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-1">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-black/30 mb-4">
                       <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                       <span className="h-1 w-1 rounded-full bg-black/10"></span>
                       <span>{Math.ceil(blog.content?.length / 1000) || 5} min read</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-black transition group-hover:text-orange-600">
                      {blog.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-black/50">
                      {blog.excerpt || blog.content?.substring(0, 160).replace(/<[^>]*>/g, '') + '...'}
                    </p>
                    
                    <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-bold text-black group-hover:text-orange-500 transition-all">
                      Continue Reading <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Show More Button */}
          <div className="flex justify-center pt-10">
            <button className="rounded-full border border-black/10 bg-white px-10 py-4 text-sm font-bold text-black shadow-sm transition hover:bg-black hover:text-white active:scale-95">
              Explore All Articles
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
