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
    // Temporarily removing strict filter to ensure user sees their content
    // .eq('is_published', true) 
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="mb-16 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
          Insights & <span className="text-orange-500">Updates</span>
        </h1>
        <p className="max-w-2xl text-lg text-black/50">
          Explore our latest articles, tutorials, and business insights to help you grow your digital presence.
        </p>
      </div>

      {!blogs || blogs.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-[32px] border border-black/5 bg-[#fcfcfc] text-black/30">
          <p className="font-medium">No articles published yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link 
              key={blog.id} 
              href={`/blogs/${blog.slug}`}
              className="group flex flex-col gap-5 rounded-[32px] border border-black/5 bg-white p-4 transition-all duration-300 hover:border-orange-500/20 hover:shadow-2xl hover:shadow-black/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-black/5">
                {blog.image_url ? (
                  <img 
                    src={blog.image_url} 
                    alt={blog.title} 
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-black/5">
                    <Tag size={48} />
                  </div>
                )}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
                    {blog.category || 'Insights'}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-2 pb-2">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-black/30 mb-3">
                   <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                   <span className="h-1 w-1 rounded-full bg-black/10"></span>
                   <span>5 min read</span>
                </div>
                <h3 className="text-xl font-bold leading-tight text-black transition group-hover:text-orange-500">
                  {blog.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-black/50">
                  {blog.excerpt || blog.content.substring(0, 150) + '...'}
                </p>
                
                <div className="mt-auto pt-6 flex items-center gap-2 text-sm font-bold text-black group-hover:text-orange-500 transition-all">
                  Read Article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
